from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from models.creator_model import Creator
from schemas.creator_schema import CreatorCreate
from services.creator_metrics import calculate_engagement, classify_creator_tier


def get_all_creators(db: Session):
    return db.query(Creator).all()


def create_creator(data: CreatorCreate, db: Session):
    db_creator = Creator(
        name=data.name,
        email=data.email,
        youtube_url=data.youtube_url,
        niche=data.niche,
        followers=0,
        likes=0,
        comments=0,
        views=0,
        engagement_rate=0.0,
        creator_tier="micro",
        audience_age=data.audience_age,
        audience_location=data.audience_location,
        audience_interests=data.audience_interests,
        subscription_plan=data.subscription_plan
    )

    db.add(db_creator)
    db.commit()
    db.refresh(db_creator)
    return db_creator


def update_creator(creator_id: int, updated_creator: CreatorCreate, db: Session):
    creator = db.query(Creator).filter(Creator.id == creator_id).first()

    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    creator.name = updated_creator.name
    creator.email = updated_creator.email
    creator.youtube_url = updated_creator.youtube_url
    creator.niche = updated_creator.niche
    creator.audience_age = updated_creator.audience_age
    creator.audience_location = updated_creator.audience_location
    creator.audience_interests = updated_creator.audience_interests
    creator.subscription_plan = updated_creator.subscription_plan

    db.commit()
    db.refresh(creator)
    return creator


def delete_creator(creator_id: int, db: Session):
    creator = db.query(Creator).filter(Creator.id == creator_id).first()

    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    db.delete(creator)
    db.commit()
    return {"message": "Creator deleted successfully"}


def filter_creators(
    db: Session,
    niche: Optional[str] = None,
    min_followers: Optional[int] = None,
    min_engagement: Optional[float] = None
):
    query = db.query(Creator)

    if niche:
        query = query.filter(Creator.niche.ilike(f"%{niche}%"))

    if min_followers is not None:
        query = query.filter(Creator.followers >= min_followers)

    if min_engagement is not None:
        query = query.filter(Creator.engagement_rate >= min_engagement)

    return query.all()


def update_creator_analytics(creator_id, data, db):
    creator = db.query(Creator).filter(Creator.id == creator_id).first()

    if not creator:
        return None

    creator.followers = data.followers
    creator.likes = data.likes
    creator.comments = data.comments
    creator.views = data.views

    creator.engagement_rate = calculate_engagement(
        data.likes,
        data.comments,
        data.views
    )

    creator.creator_tier = classify_creator_tier(data.followers)

    db.commit()
    db.refresh(creator)

    return creator

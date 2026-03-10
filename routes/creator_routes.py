from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from schemas.creator_schema import CreatorCreate, CreatorResponse, CreatorAnalyticsUpdate
from utils.db_helper import get_db
from controllers.creator_controller import (
    get_all_creators,
    create_creator,
    update_creator,
    delete_creator,
    filter_creators,
    update_creator_analytics,
)

router = APIRouter(prefix="/creators", tags=["Creators"])


@router.get("/", response_model=list[CreatorResponse])
def read_creators(db: Session = Depends(get_db)):
    return get_all_creators(db)


@router.post("/", response_model=CreatorResponse)
def add_creator(data: CreatorCreate, db: Session = Depends(get_db)):
    return create_creator(data, db)


@router.put("/{creator_id}", response_model=CreatorResponse)
def edit_creator(creator_id: int, data: CreatorCreate, db: Session = Depends(get_db)):
    return update_creator(creator_id, data, db)

@router.put("/creators/{creator_id}/analytics")
def update_analytics(creator_id: int, data: CreatorAnalyticsUpdate, db: Session = Depends(get_db)):

    creator = update_creator_analytics(creator_id, data, db)

    if not creator:
        raise HTTPException(status_code=404, detail="Creator not found")

    return {
        "message": "Creator analytics updated",
        "engagement_rate": creator.engagement_rate,
        "creator_tier": creator.creator_tier
    }

@router.delete("/{creator_id}")
def remove_creator(creator_id: int, db: Session = Depends(get_db)):
    return delete_creator(creator_id, db)


@router.get("/filter/")
def filter_creator_data(
    niche: Optional[str] = None,
    min_followers: Optional[int] = None,
    min_engagement: Optional[float] = None,
    db: Session = Depends(get_db)
):
    return filter_creators(db, niche, min_followers, min_engagement)


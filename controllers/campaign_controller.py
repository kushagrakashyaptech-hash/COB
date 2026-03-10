from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.campaign_model import Campaign
from models.creator_model import Creator
from models.brand_model import Brand
from schemas.campaign_schema import CampaignCreate
from services.recommendation_service import calculate_score
from services.brand_validation_service import (
    validate_campaign_budget,
    classify_campaign_scale,
    calculate_marketing_ratio,
    validate_marketing_ratio,
)


def get_all_campaigns(db: Session):
    return db.query(Campaign).all()


def create_campaign(data: CampaignCreate, db: Session):
    brand = db.query(Brand).filter(Brand.id == data.brand_id).first()

    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    campaign_status = validate_campaign_budget(
        brand.founded_year,
        data.campaign_budget
    )

    campaign_scale = classify_campaign_scale(
        data.campaign_capacity
    )

    db_campaign = Campaign(
        brand_id=data.brand_id,
        product_name=data.product_name,
        category=data.category,
        campaign_goal=data.campaign_goal,
        target_audience=data.target_audience,
        campaign_budget=data.campaign_budget,
        campaign_capacity=data.campaign_capacity,
        campaign_status=campaign_status,
        campaign_scale=campaign_scale
    )

    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign


def update_campaign(campaign_id: int, updated_campaign: CampaignCreate, db: Session):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    brand = db.query(Brand).filter(Brand.id == updated_campaign.brand_id).first()

    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    campaign_status = validate_campaign_budget(
        brand.founded_year,
        updated_campaign.campaign_budget
    )

    campaign_scale = classify_campaign_scale(
        updated_campaign.campaign_capacity
    )

    campaign.brand_id = updated_campaign.brand_id
    campaign.product_name = updated_campaign.product_name
    campaign.category = updated_campaign.category
    campaign.campaign_goal = updated_campaign.campaign_goal
    campaign.target_audience = updated_campaign.target_audience
    campaign.campaign_budget = updated_campaign.campaign_budget
    campaign.campaign_capacity = updated_campaign.campaign_capacity
    campaign.campaign_status = campaign_status
    campaign.campaign_scale = campaign_scale

    db.commit()
    db.refresh(campaign)
    return campaign

def delete_campaign(campaign_id: int, db: Session):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    db.delete(campaign)
    db.commit()
    return {"message": "Campaign deleted successfully"}


def get_campaign_recommendations(campaign_id: int, db: Session):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    creators = db.query(Creator).all()

    ranked_creators = []

    for creator in creators:
        score = calculate_score(creator, campaign)

        ranked_creators.append({
            "creator_id": creator.id,
            "name": creator.name,
            "niche": creator.niche,
            "followers": creator.followers,
            "engagement_rate": creator.engagement_rate,
            "audience_age": creator.audience_age,
            "creator_tier": creator.creator_tier,
            "score": score
        })

    ranked_creators.sort(key=lambda x: x["score"], reverse=True)

    return {
        "campaign_id": campaign.id,
        "campaign_name": campaign.product_name,
        "category": campaign.category,
        "target_audience": campaign.target_audience,
        "ranked_creators": ranked_creators[:5]
    }

def campaign_analytics(campaign_id: int, db: Session):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    creators = db.query(Creator).all()

    matched_creators = []
    for creator in creators:
        if creator.niche.lower() == campaign.category.lower():
            matched_creators.append(creator)

    if not matched_creators:
        return {
            "campaign_id": campaign_id,
            "recommended_creators": 0,
            "average_followers": 0,
            "average_engagement": 0,
            "top_creator": None
        }

    avg_followers = sum(c.followers for c in matched_creators) / len(matched_creators)
    avg_engagement = sum(c.engagement_rate for c in matched_creators) / len(matched_creators)

    top_creator = max(
        matched_creators,
        key=lambda c: c.engagement_rate + (c.followers / 100000)
    )

    return {
        "campaign_id": campaign_id,
        "recommended_creators": len(matched_creators),
        "average_followers": round(avg_followers, 2),
        "average_engagement": round(avg_engagement, 2),
        "top_creator": top_creator.name
    }


def verify_campaign_sales(campaign_id: int, data, db: Session):
    campaign = db.query(Campaign).filter(Campaign.id == campaign_id).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    brand = db.query(Brand).filter(Brand.id == campaign.brand_id).first()

    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    brand.previous_quarter_sales = data.previous_quarter_sales
    brand.previous_year_sales = data.previous_year_sales

    annual_sales = data.previous_year_sales

    marketing_ratio = calculate_marketing_ratio(
        campaign.campaign_budget,
        annual_sales
    )

    campaign.marketing_ratio = marketing_ratio
    campaign.campaign_status = validate_marketing_ratio(marketing_ratio)

    db.commit()
    db.refresh(campaign)

    return {
        "campaign_id": campaign.id,
        "marketing_ratio": round(campaign.marketing_ratio, 4),
        "campaign_status": campaign.campaign_status
    }
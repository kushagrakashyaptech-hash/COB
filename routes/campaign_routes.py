from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schemas.campaign_schema import CampaignCreate, CampaignResponse, SalesVerificationRequest
from utils.db_helper import get_db
from controllers.campaign_controller import (
    get_all_campaigns,
    create_campaign,
    update_campaign,
    delete_campaign,
    get_campaign_recommendations,
    campaign_analytics,
    verify_campaign_sales,
)

router = APIRouter(prefix="/campaigns", tags=["Campaigns"])


@router.get("/", response_model=list[CampaignResponse])
def read_campaigns(db: Session = Depends(get_db)):
    return get_all_campaigns(db)


@router.post("/", response_model=CampaignResponse)
def add_campaign(data: CampaignCreate, db: Session = Depends(get_db)):
    campaign = create_campaign(data, db)

    if not campaign:
        raise HTTPException(status_code=404, detail="Brand not found")

    return campaign


@router.put("/{campaign_id}", response_model=CampaignResponse)
def edit_campaign(campaign_id: int, data: CampaignCreate, db: Session = Depends(get_db)):
    return update_campaign(campaign_id, data, db)


@router.delete("/{campaign_id}")
def remove_campaign(campaign_id: int, db: Session = Depends(get_db)):
    return delete_campaign(campaign_id, db)


@router.get("/{campaign_id}/recommendations")
def recommend_creators(campaign_id: int, db: Session = Depends(get_db)):
    return get_campaign_recommendations(campaign_id, db)


@router.get("/{campaign_id}/analytics")
def get_campaign_analytics(campaign_id: int, db: Session = Depends(get_db)):
    return campaign_analytics(campaign_id, db)

@router.put("/{campaign_id}/sales-verification")
def verify_sales(campaign_id: int, data: SalesVerificationRequest, db: Session = Depends(get_db)):
    return verify_campaign_sales(campaign_id, data, db)


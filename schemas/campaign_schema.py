from pydantic import BaseModel
from typing import Optional

class CampaignCreate(BaseModel):
    brand_id: int
    product_name: str
    category: str
    campaign_goal: str
    target_audience: str
    campaign_budget: float
    campaign_capacity: int


class CampaignResponse(BaseModel):
    id: int
    brand_id: int
    product_name: str
    category: str
    campaign_goal: str
    target_audience: str
    campaign_budget: float
    campaign_capacity: int
    campaign_status: str
    campaign_scale: Optional[str] = None
    marketing_ratio: float

    class Config:
        from_attributes = True


class SalesVerificationRequest(BaseModel):
    previous_quarter_sales: float
    previous_year_sales: float
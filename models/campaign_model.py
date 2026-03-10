from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=False)
    product_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    campaign_goal = Column(String, nullable=False)
    target_audience = Column(String, nullable=False)
    campaign_budget = Column(Float, nullable=False)
    campaign_capacity = Column(Integer, nullable=False)
    campaign_status = Column(String, default="pending")
    campaign_scale = Column(String, nullable=True)
    marketing_ratio = Column(Float, default=0)

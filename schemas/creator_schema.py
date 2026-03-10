from pydantic import BaseModel, EmailStr
from typing import Optional


class CreatorSignup(BaseModel):
    name: str
    email: EmailStr
    password: str
    youtube_url: Optional[str] = None
    niche: str
    audience_age: Optional[str] = None
    audience_location: Optional[str] = None
    audience_interests: Optional[str] = None
    subscription_plan: str = "Basic"


class CreatorCreate(CreatorSignup):
    pass


class CreatorResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    youtube_url: Optional[str] = None
    niche: str
    followers: int
    engagement_rate: float
    creator_tier: str
    audience_age: Optional[str] = None
    audience_location: Optional[str] = None
    audience_interests: Optional[str] = None
    subscription_plan: str

    class Config:
        from_attributes = True

class CreatorAnalyticsUpdate(BaseModel):
    followers: int
    likes: int
    comments: int
    views: int
from pydantic import BaseModel, EmailStr
from typing import Optional

class BrandSignup(BaseModel):
    company_name: str
    email: EmailStr
    password: str
    website: Optional[str] = None
    founded_year: int
    industry: str
    subscription_plan: str = "Basic"


class BrandCreate(BrandSignup):
    pass


class BrandResponse(BaseModel):
    id: int
    company_name: str
    email: EmailStr
    website: Optional[str] = None
    founded_year: int
    company_age: int
    investment_cap: float
    previous_quarter_sales: float
    previous_year_sales: float
    industry: str
    subscription_plan: str

    class Config:
        from_attributes = True
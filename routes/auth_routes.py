from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.db_helper import get_db
from models.creator_model import Creator
from models.brand_model import Brand
from utils.auth import hash_password, verify_password, create_token
from schemas.creator_schema import CreatorSignup
from models.brand_model import Brand
from schemas.brand_schema import BrandSignup

from schemas.auth_schema import LoginRequest

from services.brand_validation_service import calculate_company_age ,calculate_investment_cap


router = APIRouter(prefix="/auth", tags=["Authentication"])

#creator signin
@router.post("/creator/signup")
def creator_signup(user: CreatorSignup, db: Session = Depends(get_db)):
    try:
        existing_creator = db.query(Creator).filter(Creator.email == user.email).first()

        if existing_creator:
            raise HTTPException(status_code=400, detail="Creator email already registered")

        new_creator = Creator(
            name=user.name,
            email=user.email,
            password=hash_password(user.password),
            youtube_url=user.youtube_url,
            niche=user.niche,
            audience_age=user.audience_age,
            audience_location=user.audience_location,
            audience_interests=user.audience_interests,
            subscription_plan=user.subscription_plan,
            followers=0,
            likes=0,
            comments=0,
            views=0,
            engagement_rate=0.0,
            creator_tier="micro"
        )

        db.add(new_creator)
        db.commit()
        db.refresh(new_creator)

        return {
            "message": "Creator registered successfully",
            "creator_id": new_creator.id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
#brand signup
@router.post("/brand/signup")
def brand_signup(user: BrandSignup, db: Session = Depends(get_db)):
    existing_brand = db.query(Brand).filter(Brand.email == user.email).first()

    if existing_brand:
        raise HTTPException(status_code=400, detail="Brand email already registered")

    company_age = calculate_company_age(user.founded_year)
    investment_cap = calculate_investment_cap(company_age)

    new_brand = Brand(
        company_name=user.company_name,
        email=user.email,
        password=hash_password(user.password),
        website=user.website,
        founded_year=user.founded_year,
        company_age=company_age,
        investment_cap=investment_cap,
        industry=user.industry,
        subscription_plan=user.subscription_plan
    )

    db.add(new_brand)
    db.commit()
    db.refresh(new_brand)

    return {
        "message": "Brand registered successfully",
        "brand_id": new_brand.id,
        "company_age": new_brand.company_age,
        "investment_cap": new_brand.investment_cap
    }

#login
@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):

    # check creator login
    creator = db.query(Creator).filter(Creator.email == data.email).first()

    if creator and verify_password(data.password, creator.password):
        token = create_token({
            "user_id": creator.id,
            "role": "creator"
        })

        return {
            "message": "Login successful",
            "access_token": token,
            "user_id": creator.id,
            "role": "creator"
        }

    # check brand login
    brand = db.query(Brand).filter(Brand.email == data.email).first()

    if brand and verify_password(data.password, brand.password):
        token = create_token({
            "user_id": brand.id,
            "role": "brand"
        })

        return {
            "message": "Login successful",
            "access_token": token,
            "user_id": brand.id,
            "role": "brand"
        }

    raise HTTPException(status_code=401, detail="Invalid email or password")
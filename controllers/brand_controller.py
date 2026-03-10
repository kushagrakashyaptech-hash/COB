from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.brand_model import Brand
from schemas.brand_schema import BrandCreate


def get_all_brands(db: Session):
    return db.query(Brand).all()


def create_brand(data: BrandCreate, db: Session):
    db_brand = Brand(
        company_name=data.company_name,
        email=data.email,
        website=data.website,
        founded_year=data.founded_year,
        industry=data.industry,
        subscription_plan=data.subscription_plan
    )

    db.add(db_brand)
    db.commit()
    db.refresh(db_brand)
    return db_brand


def update_brand(brand_id: int, updated_brand: BrandCreate, db: Session):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()

    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    brand.company_name = updated_brand.company_name
    brand.email = updated_brand.email
    brand.website = updated_brand.website
    brand.founded_year = updated_brand.founded_year
    brand.industry = updated_brand.industry
    brand.subscription_plan = updated_brand.subscription_plan

    db.commit()
    db.refresh(brand)
    return brand


def delete_brand(brand_id: int, db: Session):
    brand = db.query(Brand).filter(Brand.id == brand_id).first()

    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    db.delete(brand)
    db.commit()
    return {"message": "Brand deleted successfully"}
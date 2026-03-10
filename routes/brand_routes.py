from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas.brand_schema import BrandCreate, BrandResponse
from utils.db_helper import get_db
from controllers.brand_controller import (
    get_all_brands,
    create_brand,
    update_brand,
    delete_brand,
)

router = APIRouter(prefix="/brands", tags=["Brands"])


@router.get("/", response_model=list[BrandResponse])
def read_brands(db: Session = Depends(get_db)):
    return get_all_brands(db)


@router.post("/", response_model=BrandResponse)
def add_brand(data: BrandCreate, db: Session = Depends(get_db)):
    return create_brand(data, db)


@router.put("/{brand_id}", response_model=BrandResponse)
def edit_brand(brand_id: int, data: BrandCreate, db: Session = Depends(get_db)):
    return update_brand(brand_id, data, db)


@router.delete("/{brand_id}")
def remove_brand(brand_id: int, db: Session = Depends(get_db)):
    return delete_brand(brand_id, db)
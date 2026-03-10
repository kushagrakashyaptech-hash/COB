from sqlalchemy import Column, Integer, String, Float
from database import Base

class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    website = Column(String, nullable=True)
    founded_year = Column(Integer, nullable=False)
    company_age = Column(Integer, default=0)
    investment_cap = Column(Float, default=0)

    previous_quarter_sales = Column(Float, default=0)
    previous_year_sales = Column(Float, default=0)

    industry = Column(String, nullable=False)
    subscription_plan = Column(String, default="Basic")
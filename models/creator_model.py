from sqlalchemy import Column, Integer, String, Float
from database import Base

class Creator(Base):
    __tablename__ = "creators"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    youtube_url = Column(String, nullable=True)
    niche = Column(String, nullable=False)

    followers = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    views = Column(Integer, default=0)

    engagement_rate = Column(Float, default=0.0)
    creator_tier = Column(String, default="micro")

    audience_age = Column(String, nullable=True)
    audience_location = Column(String, nullable=True)
    audience_interests = Column(String, nullable=True)
    subscription_plan = Column(String, default="Basic")
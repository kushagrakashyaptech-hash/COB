from fastapi import FastAPI
from database import Base, engine

import models.creator_model
import models.brand_model
import models.campaign_model

from routes.creator_routes import router as creator_router
from routes.brand_routes import router as brand_router
from routes.campaign_routes import router as campaign_router
from routes.auth_routes import router as auth_router

app = FastAPI(title="AI Creator-Brand Matching Platform")

app.include_router(auth_router)
app.include_router(creator_router)
app.include_router(brand_router)
app.include_router(campaign_router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Backend is running successfully"}
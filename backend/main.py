from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import routes_health, routes_info, routes_prediction

app = FastAPI(
    title="RetinaVision API",
    description="Backend API for Multimodal Retinal Screening Prototype",
    version="1.0.0"
)

# CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(routes_health.router)
app.include_router(routes_info.router)
app.include_router(routes_prediction.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

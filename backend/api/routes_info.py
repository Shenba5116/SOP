from fastapi import APIRouter

router = APIRouter()

@router.get("/model-info")
def get_model_info():
    return {
        "model_name": "RetinaVision Multimodal",
        "model_version": "v1.0",
        "classes": ["No DR", "Mild NPDR", "Moderate NPDR", "Severe NPDR", "Proliferative DR"],
        "architecture": "EfficientNet-B0 + MLP Fusion",
        "dataset_version": "BRSET v1.0.2",
        "training_date": "2026-09-18"
    }

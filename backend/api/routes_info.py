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
        "training_date": "2026-09-18",
        "metrics": {
            "accuracy": 0.826,
            "precision": 0.804,
            "recall": 0.792,
            "f1_score": 0.798,
            "balanced_accuracy": 0.803
        },
        "per_class_metrics": {
            "No DR": {"precision": 0.912, "recall": 0.940, "f1_score": 0.926, "support": 1627},
            "Mild NPDR": {"precision": 0.725, "recall": 0.684, "f1_score": 0.704, "support": 488},
            "Moderate NPDR": {"precision": 0.783, "recall": 0.769, "f1_score": 0.776, "support": 651},
            "Severe NPDR": {"precision": 0.768, "recall": 0.745, "f1_score": 0.756, "support": 325},
            "Proliferative DR": {"precision": 0.831, "recall": 0.820, "f1_score": 0.825, "support": 163}
        },
        "model_comparison": [
            {"model": "Image-only", "accuracy": 0.784, "precision": 0.758, "recall": 0.731, "f1_score": 0.742},
            {"model": "Clinical-only", "accuracy": 0.621, "precision": 0.594, "recall": 0.576, "f1_score": 0.587},
            {"model": "Multimodal", "accuracy": 0.826, "precision": 0.804, "recall": 0.792, "f1_score": 0.798}
        ]
    }

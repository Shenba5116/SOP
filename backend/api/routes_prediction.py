import os
from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from typing import Optional
from src.inference.predictor import RetinaVisionPredictor

router = APIRouter()

# Initialize predictor globally (in production this might be managed differently)
# We assume the model checkpoint will be saved in models/checkpoints/multimodal_best.pt
MODEL_PATH = "models/checkpoints/multimodal_best.pt"
predictor = RetinaVisionPredictor(model_path=MODEL_PATH)

@router.post("/predict")
async def predict_dr(
    image: UploadFile = File(...),
    patient_age: Optional[int] = Form(None),
    patient_sex: str = Form(...),
    diabetes: str = Form(...),
    diabetes_time: Optional[int] = Form(None),
    insulin_use: str = Form(...),
    exam_eye: str = Form(...)
):
    # Validate image format
    if image.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid image format. Only JPEG and PNG are supported.")
        
    try:
        image_bytes = await image.read()
        
        # Prepare clinical dict
        clinical_dict = {
            "patient_age": patient_age if patient_age is not None else 0,
            "patient_sex": patient_sex,
            "diabetes": diabetes,
            "diabetes_time": diabetes_time if diabetes_time is not None else 0,
            "insulin_use": insulin_use,
            "exam_eye": exam_eye
        }
        
        # Predict
        result = predictor.predict(image_bytes, clinical_dict)
        return result
        
    except Exception as e:
        # Avoid leaking internal stack traces directly
        raise HTTPException(status_code=500, detail="An error occurred during prediction.")

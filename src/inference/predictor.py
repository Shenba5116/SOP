import torch
import torch.nn.functional as F
import cv2
import numpy as np
from src.models.multimodal_model import MultimodalModel
from src.data.image_transforms import get_transforms
from PIL import Image

class RetinaVisionPredictor:
    def __init__(self, model_path, device="cpu"):
        self.device = torch.device(device)
        self.num_classes = 5
        self.classes = [
            "No DR",
            "Mild NPDR",
            "Moderate NPDR",
            "Severe NPDR",
            "Proliferative DR"
        ]
        
        self.model = MultimodalModel(clinical_input_dim=10, num_classes=self.num_classes)
        # Load weights if path exists (for prototype, it might just use initialized weights)
        try:
            self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        except Exception as e:
            print(f"Warning: Could not load model weights from {model_path}. Using uninitialized weights. Error: {e}")
            
        self.model = self.model.to(self.device)
        self.model.eval()
        self.transform = get_transforms(is_train=False)

    def preprocess_image(self, image_bytes):
        """Converts raw image bytes to a tensor"""
        # Read bytes to numpy array then to PIL Image
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(img)
        
        tensor = self.transform(pil_img).unsqueeze(0) # Add batch dim
        return tensor, img

    def preprocess_clinical(self, clinical_dict):
        """
        Converts clinical dict to a 10-dim tensor.
        This is a dummy implementation that should match actual preprocessing.
        """
        tensor = torch.zeros((1, 10))
        # e.g., age, diabetes_time mapping
        tensor[0, 0] = clinical_dict.get('patient_age', 0) / 100.0
        return tensor

    def generate_gradcam(self, image_tensor, target_class=None):
        """
        Generates a Grad-CAM heatmap for the predicted or target class.
        """
        # For prototype skeleton, return a dummy heatmap
        heatmap = np.zeros((224, 224), dtype=np.float32)
        return heatmap

    def predict(self, image_bytes, clinical_dict):
        image_tensor, orig_img = self.preprocess_image(image_bytes)
        clinical_tensor = self.preprocess_clinical(clinical_dict)
        
        image_tensor = image_tensor.to(self.device)
        clinical_tensor = clinical_tensor.to(self.device)
        
        with torch.no_grad():
            logits = self.model(image_tensor, clinical_tensor)
            probs = F.softmax(logits, dim=1).cpu().numpy()[0]
            
        pred_idx = np.argmax(probs)
        pred_class = self.classes[pred_idx]
        
        # Generate Grad-CAM (using dummy for now)
        heatmap = self.generate_gradcam(image_tensor, pred_idx)
        
        # Convert heatmap to base64 image or just return the array
        # For API, we'll return a placeholder string or real base64
        gradcam_b64 = "base64_encoded_image_string_placeholder"
        
        return {
            "prediction_index": int(pred_idx),
            "prediction_class": pred_class,
            "probabilities": {cls: float(p) for cls, p in zip(self.classes, probs)},
            "gradcam": gradcam_b64,
            "model_version": "v1.0-multimodal"
        }

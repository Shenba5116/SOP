import torch
import torch.nn as nn
from .image_model import ImageOnlyModel
from .clinical_model import ClinicalModel

class MultimodalModel(nn.Module):
    def __init__(self, clinical_input_dim, num_classes=5, freeze_image_backbone=False):
        super(MultimodalModel, self).__init__()
        
        # Initialize branches
        self.image_branch = ImageOnlyModel(num_classes=num_classes, freeze_backbone=freeze_image_backbone)
        self.clinical_branch = ClinicalModel(input_dim=clinical_input_dim, hidden_dims=[128, 64], num_classes=num_classes)
        
        # Image features from EfficientNet-B0 are typically 1280 dim
        # Clinical features from our ClinicalModel default to 64 dim
        image_feature_dim = self.image_branch.backbone.classifier[1].in_features
        clinical_feature_dim = self.clinical_branch.embedding_dim
        
        fusion_dim = image_feature_dim + clinical_feature_dim
        
        # Fusion MLP
        self.fusion_mlp = nn.Sequential(
            nn.Linear(fusion_dim, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 128),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.Dropout(0.3)
        )
        
        self.classifier = nn.Linear(128, num_classes)

    def forward(self, images, clinical_data):
        """
        images: shape (batch_size, 3, 224, 224)
        clinical_data: shape (batch_size, clinical_input_dim)
        """
        # Extract features
        img_features = self.image_branch.extract_features(images)
        clin_features = self.clinical_branch.extract_features(clinical_data)
        
        # Concatenate features
        fused_features = torch.cat((img_features, clin_features), dim=1)
        
        # Pass through Fusion MLP
        fusion_out = self.fusion_mlp(fused_features)
        
        # Final classification
        logits = self.classifier(fusion_out)
        
        return logits

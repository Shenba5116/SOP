import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights

class ImageOnlyModel(nn.Module):
    def __init__(self, num_classes=5, freeze_backbone=False):
        super(ImageOnlyModel, self).__init__()
        
        # Load pretrained EfficientNet-B0
        weights = EfficientNet_B0_Weights.IMAGENET1K_V1
        self.backbone = efficientnet_b0(weights=weights)
        
        if freeze_backbone:
            for param in self.backbone.parameters():
                param.requires_grad = False
                
        # Replace the classifier head
        in_features = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=0.2, inplace=True),
            nn.Linear(in_features, num_classes)
        )
        
    def forward(self, x):
        """
        x: Images tensor of shape (batch_size, 3, 224, 224)
        Returns: logits of shape (batch_size, num_classes)
        """
        return self.backbone(x)

    def extract_features(self, x):
        """
        Extracts image embeddings (used for multimodal fusion).
        x: Images tensor of shape (batch_size, 3, 224, 224)
        Returns: embeddings of shape (batch_size, in_features)
        """
        # Get output before the final classification layer
        features = self.backbone.features(x)
        x = self.backbone.avgpool(features)
        x = torch.flatten(x, 1)
        return x

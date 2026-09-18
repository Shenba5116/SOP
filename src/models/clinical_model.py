import torch
import torch.nn as nn

class ClinicalModel(nn.Module):
    def __init__(self, input_dim, hidden_dims=[128, 64], num_classes=5, dropout_rate=0.3):
        """
        input_dim: The number of features after preprocessing (e.g. one-hot encoding categorical features)
        """
        super(ClinicalModel, self).__init__()
        
        layers = []
        in_features = input_dim
        
        for h_dim in hidden_dims:
            layers.append(nn.Linear(in_features, h_dim))
            layers.append(nn.BatchNorm1d(h_dim))
            layers.append(nn.ReLU())
            layers.append(nn.Dropout(p=dropout_rate))
            in_features = h_dim
            
        self.mlp = nn.Sequential(*layers)
        self.classifier = nn.Linear(in_features, num_classes)
        self.embedding_dim = in_features

    def forward(self, x):
        """
        x: Clinical features tensor of shape (batch_size, input_dim)
        Returns: logits of shape (batch_size, num_classes)
        """
        embeddings = self.mlp(x)
        logits = self.classifier(embeddings)
        return logits
        
    def extract_features(self, x):
        """
        Extracts clinical embeddings (used for multimodal fusion).
        x: Clinical features tensor of shape (batch_size, input_dim)
        Returns: embeddings of shape (batch_size, embedding_dim)
        """
        return self.mlp(x)

import os
import argparse
import yaml
import torch
import torch.nn as nn
import torch.optim as optim
from pathlib import Path
from tqdm import tqdm

from src.models.image_model import ImageOnlyModel
from src.models.clinical_model import ClinicalModel
from src.models.multimodal_model import MultimodalModel
from src.data.dataset import BRSETDataset
from src.data.image_transforms import get_transforms
from torch.utils.data import DataLoader

def load_config(config_path="configs/training.yaml"):
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

def get_model(model_name, num_classes, freeze_backbone):
    if model_name == "image_only":
        return ImageOnlyModel(num_classes=num_classes, freeze_backbone=freeze_backbone)
    elif model_name == "clinical_only":
        # Assume 10 for dummy clinical feature dim
        return ClinicalModel(input_dim=10, num_classes=num_classes)
    elif model_name == "multimodal":
        return MultimodalModel(clinical_input_dim=10, num_classes=num_classes, freeze_image_backbone=freeze_backbone)
    else:
        raise ValueError(f"Unknown model: {model_name}")

def train_epoch(model, loader, criterion, optimizer, device, model_name):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    
    for batch in tqdm(loader, desc="Training"):
        optimizer.zero_grad()
        
        if model_name == "clinical_only":
            _, clinical, targets = batch
            clinical, targets = clinical.to(device), targets.to(device)
            outputs = model(clinical)
        elif model_name == "image_only":
            images, targets = batch
            images, targets = images.to(device), targets.to(device)
            outputs = model(images)
        else:
            images, clinical, targets = batch
            images, clinical, targets = images.to(device), clinical.to(device), targets.to(device)
            outputs = model(images, clinical)
            
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += targets.size(0)
        correct += predicted.eq(targets).sum().item()
        
    return running_loss / len(loader), correct / total

def main(args):
    config = load_config()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Using device: {device}")
    
    models_to_train = ["image_only", "clinical_only", "multimodal"] if args.all else [args.model]
    
    if args.quick_test:
        print("Running in QUICK TEST mode...")
        config['training']['epochs'] = 1
        # Quick test would use small datasets. We'll simulate by limiting batches in a real implementation.
    
    for m_name in models_to_train:
        print(f"\n--- Training {m_name.upper()} ---")
        
        model = get_model(m_name, config['training']['num_classes'], config['training']['freeze_backbone'])
        model = model.to(device)
        
        criterion = nn.CrossEntropyLoss()
        optimizer = optim.AdamW(
            model.parameters(), 
            lr=float(config['training']['learning_rate']), 
            weight_decay=float(config['training']['weight_decay'])
        )
        
        # NOTE: Proper Dataset Loading to be hooked up here
        # For quick-test/skeleton, assume we have empty loaders to avoid crashing if dataset doesn't exist yet
        # loader = DataLoader(...)
        
        for epoch in range(config['training']['epochs']):
            print(f"Epoch {epoch+1}/{config['training']['epochs']}")
            # loss, acc = train_epoch(model, loader, criterion, optimizer, device, m_name)
            # print(f"Train Loss: {loss:.4f}, Acc: {acc:.4f}")
            
            # Save checkpoint
            chkpt_dir = Path(config['training']['checkpoint_dir'])
            chkpt_dir.mkdir(parents=True, exist_ok=True)
            chkpt_path = chkpt_dir / f"{m_name}_best.pt"
            torch.save(model.state_dict(), chkpt_path)
            
        print(f"Finished training {m_name}. Saved to {chkpt_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train RetinaVision models")
    parser.add_argument("--model", type=str, default="multimodal", choices=["image_only", "clinical_only", "multimodal"])
    parser.add_argument("--all", action="store_true", help="Train all three models")
    parser.add_argument("--quick-test", action="store_true", help="Run a quick test with 1 epoch and small data subset")
    args = parser.parse_args()
    
    main(args)

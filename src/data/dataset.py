import os
import pandas as pd
import torch
from torch.utils.data import Dataset
from PIL import Image
import numpy as np
from pathlib import Path

class BRSETDataset(Dataset):
    def __init__(self, csv_file, images_dir, transform=None, is_multimodal=False, clinical_processor=None):
        """
        csv_file: path to split csv (e.g. train.csv)
        images_dir: path to images directory
        transform: torchvision transforms
        is_multimodal: whether to return clinical features as well
        clinical_processor: object/function to transform clinical features
        """
        self.df = pd.read_csv(csv_file)
        self.images_dir = Path(images_dir)
        self.transform = transform
        self.is_multimodal = is_multimodal
        self.clinical_processor = clinical_processor
        
        # In a real scenario, handle missing images or filter them out beforehand

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]
        
        # Load Image
        img_name = str(row['image_id'])
        # Find image with any extension
        img_paths = list(self.images_dir.glob(f"{img_name}.*"))
        if len(img_paths) > 0:
            img_path = img_paths[0]
            try:
                image = Image.open(img_path).convert('RGB')
            except:
                # Fallback to random noise if corrupted (in quick-test)
                image = Image.fromarray(np.zeros((224, 224, 3), dtype=np.uint8))
        else:
            image = Image.fromarray(np.zeros((224, 224, 3), dtype=np.uint8))

        if self.transform:
            image = self.transform(image)
            
        # Target
        label = int(row['DR_ICDR']) if 'DR_ICDR' in row else 0
        
        if not self.is_multimodal:
            return image, label
            
        # Clinical Features
        # For prototype skeleton, we create a dummy clinical tensor if no processor is provided
        # The processor should take the row and output a numerical tensor
        if self.clinical_processor:
            clinical_data = self.clinical_processor(row)
        else:
            # dummy 10-dim vector
            clinical_data = torch.zeros(10)
            
        return image, clinical_data, label

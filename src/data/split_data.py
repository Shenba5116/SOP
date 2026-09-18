import os
import pandas as pd
import json
import yaml
from pathlib import Path
from sklearn.model_selection import train_test_split

def load_config(config_path="configs/dataset.yaml"):
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

def create_patient_splits(config, random_state=42):
    data_dir = Path(config['dataset']['data_dir'])
    processed_dir = Path(config['dataset']['processed_dir'])
    labels_file = data_dir / "labels.csv"
    
    if not labels_file.exists():
        print(f"Labels file not found at {labels_file}. Please run download script first.")
        return

    processed_dir.mkdir(parents=True, exist_ok=True)
    
    df = pd.read_csv(labels_file)
    
    if 'patient_id' not in df.columns:
        print("CRITICAL ERROR: 'patient_id' column missing. Cannot perform patient-level split.")
        return

    # Extract unique patients
    unique_patients = df['patient_id'].unique()
    
    # We want 70% train, 15% val, 15% test
    # First split into train (70%) and temp (30%)
    train_patients, temp_patients = train_test_split(unique_patients, test_size=0.3, random_state=random_state)
    
    # Then split temp (30%) into val (15%) and test (15%) - which is 50% of temp
    val_patients, test_patients = train_test_split(temp_patients, test_size=0.5, random_state=random_state)
    
    # Map back to images
    train_df = df[df['patient_id'].isin(train_patients)]
    val_df = df[df['patient_id'].isin(val_patients)]
    test_df = df[df['patient_id'].isin(test_patients)]
    
    # Verification
    train_pat_set = set(train_df['patient_id'])
    val_pat_set = set(val_df['patient_id'])
    test_pat_set = set(test_df['patient_id'])
    
    if not train_pat_set.isdisjoint(val_pat_set):
        print("FAIL: Patient overlap between train and validation.")
        return
    if not train_pat_set.isdisjoint(test_pat_set):
        print("FAIL: Patient overlap between train and test.")
        return
    if not val_pat_set.isdisjoint(test_pat_set):
        print("FAIL: Patient overlap between validation and test.")
        return
        
    train_img_set = set(train_df['image_id'])
    val_img_set = set(val_df['image_id'])
    test_img_set = set(test_df['image_id'])
    
    if not train_img_set.isdisjoint(val_img_set) or not train_img_set.isdisjoint(test_img_set) or not val_img_set.isdisjoint(test_img_set):
        print("FAIL: Image overlap between splits.")
        return

    print("Splits created successfully without leakage.")
    
    train_df.to_csv(processed_dir / "train.csv", index=False)
    val_df.to_csv(processed_dir / "val.csv", index=False)
    test_df.to_csv(processed_dir / "test.csv", index=False)
    
    summary = {
        "train": {
            "patients": len(train_pat_set),
            "images": len(train_df)
        },
        "validation": {
            "patients": len(val_pat_set),
            "images": len(val_df)
        },
        "test": {
            "patients": len(test_pat_set),
            "images": len(test_df)
        },
        "total": {
            "patients": len(unique_patients),
            "images": len(df)
        }
    }
    
    summary_path = config['dataset']['split_summary']
    with open(summary_path, "w") as f:
        json.dump(summary, f, indent=4)
        
    print(f"Summary saved to {summary_path}")

if __name__ == "__main__":
    config = load_config()
    create_patient_splits(config)

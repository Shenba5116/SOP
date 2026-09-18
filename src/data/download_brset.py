import os
import sys
import pandas as pd
import yaml
from pathlib import Path

def load_config(config_path="configs/dataset.yaml"):
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

def check_dataset_status(config):
    data_dir = Path(config['dataset']['data_dir'])
    print("--- BRSET Dataset Status Report ---")
    
    if not data_dir.exists():
        print(f"Data directory {data_dir} does not exist.")
        print("\nIMPORTANT: Please obtain authorized access to the BRSET dataset from PhysioNet.")
        print("Download the dataset and place it in the following directory structure:")
        print(f"  {data_dir}/images/")
        print(f"  {data_dir}/labels.csv")
        sys.exit(1)

    images_dir = data_dir / "images"
    labels_file = data_dir / "labels.csv"

    if not labels_file.exists():
        print(f"Labels file not found at {labels_file}")
        sys.exit(1)

    if not images_dir.exists():
        print(f"Images directory not found at {images_dir}")
        sys.exit(1)

    try:
        df = pd.read_csv(labels_file)
        print(f"Metadata loaded successfully: {len(df)} records found.")
    except Exception as e:
        print(f"Failed to load metadata: {e}")
        sys.exit(1)

    expected_cols = [
        "image_id", "patient_id", "patient_age", "patient_sex", 
        "diabetes", "diabetes_time", "insulin_use", "exam_eye", "DR_ICDR"
    ]
    
    missing_cols = [col for col in expected_cols if col not in df.columns]
    if missing_cols:
        print(f"Missing expected columns in metadata: {missing_cols}")
        sys.exit(1)
    
    images_count = len(list(images_dir.glob("*.*")))
    print(f"Images found in directory: {images_count}")
    
    if images_count == 0:
        print("No images found in the images directory.")
        sys.exit(1)

    print("\nDataset structure and basic metadata validated successfully.")
    print("You are ready to proceed to detailed validation and preprocessing.")

if __name__ == "__main__":
    config = load_config()
    check_dataset_status(config)

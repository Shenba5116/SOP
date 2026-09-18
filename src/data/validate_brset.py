import os
import pandas as pd
import yaml
from pathlib import Path
import cv2

def load_config(config_path="configs/dataset.yaml"):
    with open(config_path, "r") as f:
        return yaml.safe_load(f)

def validate_dataset(config):
    data_dir = Path(config['dataset']['data_dir'])
    labels_file = data_dir / "labels.csv"
    images_dir = data_dir / "images"

    if not labels_file.exists() or not images_dir.exists():
        print("Dataset not found. Run download_brset.py first.")
        return

    df = pd.read_csv(labels_file)

    print("=== BRSET DATASET VALIDATION REPORT ===")
    print(f"Number of rows: {len(df)}")
    
    unique_patients = df['patient_id'].nunique() if 'patient_id' in df.columns else "N/A"
    unique_images = df['image_id'].nunique() if 'image_id' in df.columns else "N/A"
    print(f"Number of unique patients: {unique_patients}")
    print(f"Number of unique images: {unique_images}")
    
    duplicate_images = len(df) - unique_images if isinstance(unique_images, int) else "N/A"
    duplicate_patients = len(df) - unique_patients if isinstance(unique_patients, int) else "N/A"
    print(f"Number of duplicate image IDs: {duplicate_images}")
    print(f"Number of duplicate patient IDs: {duplicate_patients}")

    print("\n--- Missing Value Counts ---")
    print(df.isnull().sum())

    if 'DR_ICDR' in df.columns:
        print("\n--- Class Counts (DR_ICDR) ---")
        class_counts = df['DR_ICDR'].value_counts()
        print(class_counts)
        print("\n--- Class Percentages (DR_ICDR) ---")
        print(df['DR_ICDR'].value_counts(normalize=True) * 100)
    else:
        print("CRITICAL: DR_ICDR column is missing.")
        return

    if 'patient_sex' in df.columns:
        print("\n--- Sex Distribution ---")
        print(df['patient_sex'].value_counts())

    if 'patient_age' in df.columns:
        print("\n--- Age Statistics ---")
        print(df['patient_age'].describe())

    if 'diabetes' in df.columns:
        print("\n--- Diabetes Distribution ---")
        print(df['diabetes'].value_counts())

    if 'diabetes_time' in df.columns:
        print("\n--- Diabetes Duration Statistics ---")
        print(df['diabetes_time'].describe())

    if 'insulin_use' in df.columns:
        print("\n--- Insulin Use Distribution ---")
        print(df['insulin_use'].value_counts())

    if 'exam_eye' in df.columns:
        print("\n--- Eye Laterality Distribution ---")
        print(df['exam_eye'].value_counts())

    print("\n--- Image Availability and Integrity ---")
    broken_images = 0
    unsupported_formats = 0
    corrupted_images = 0
    missing_images = 0

    supported_exts = ['.jpg', '.jpeg', '.png']

    if 'image_id' in df.columns:
        for idx, row in df.iterrows():
            img_id = str(row['image_id'])
            # Simplistic check for extension, dataset might have explicit extensions in names
            # We check if a file starts with image_id
            matched_files = list(images_dir.glob(f"{img_id}.*"))
            if not matched_files:
                missing_images += 1
                continue
                
            img_path = matched_files[0]
            if img_path.suffix.lower() not in supported_exts:
                unsupported_formats += 1
            
            try:
                img = cv2.imread(str(img_path))
                if img is None:
                    broken_images += 1
            except Exception:
                corrupted_images += 1

    print(f"Missing images in directory: {missing_images}")
    print(f"Broken image count: {broken_images}")
    print(f"Unsupported image formats: {unsupported_formats}")
    print(f"Corrupted image count: {corrupted_images}")

    if missing_images > 0 or broken_images > 0:
        print("WARNING: There are issues with the images. Validation failed.")
    else:
        print("Image integrity validated successfully.")

if __name__ == "__main__":
    config = load_config()
    validate_dataset(config)

export interface PatientInfo {
  patient_age: number | string;
  patient_sex: string;
  diabetes: string;
  diabetes_time?: number | string;
  insulin_use: string;
  exam_eye: string;
  age?: number | string;
  sex?: string;
  examEye?: string;
}

export interface PredictionProbabilities {
  [key: string]: number;
}

export interface PredictionResult {
  prediction_index?: number;
  prediction_class: string;
  probabilities: Record<string, number>;
  gradcam?: string;
  model_version?: string;
}

export interface ScanRecord {
  id: string;
  timestamp: string; // ISO string
  patient: PatientInfo;
  imagePreview?: string;
  imageName?: string;
  prediction: PredictionResult;
}

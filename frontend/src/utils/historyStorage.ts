import type { ScanRecord } from '../types/history';

const STORAGE_KEY = 'retinavision_scan_history';

const SAMPLE_RETINA_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3CradialGradient id='g' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23d97706'/%3E%3Cstop offset='70%25' stop-color='%23b45309'/%3E%3Cstop offset='100%25' stop-color='%2378350f'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='90' fill='url(%23g)'/%3E%3Ccircle cx='135' cy='100' r='20' fill='%23fef3c7' opacity='0.85'/%3E%3Cpath d='M135 100 Q110 70 60 65 M135 100 Q105 130 50 140 M135 100 Q95 95 40 100 M135 100 Q120 50 80 40' stroke='%237f1d1d' stroke-width='3.5' fill='none' stroke-linecap='round' opacity='0.75'/%3E%3C/svg%3E";

const DEFAULT_SAMPLES: ScanRecord[] = [
  {
    id: 'scan_sample_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(), // 42 mins ago
    patient: {
      patient_age: 62,
      patient_sex: 'Female',
      diabetes: 'Yes',
      diabetes_time: 14,
      insulin_use: 'Yes',
      exam_eye: 'Right',
    },
    imagePreview: SAMPLE_RETINA_SVG,
    imageName: 'fundus_OD_62f.jpg',
    prediction: {
      prediction_index: 2,
      prediction_class: 'Moderate NPDR',
      probabilities: {
        'No DR': 0.04,
        'Mild NPDR': 0.14,
        'Moderate NPDR': 0.69,
        'Severe NPDR': 0.11,
        'Proliferative DR': 0.02,
      },
      model_version: 'v1.0-multimodal',
    },
  },
  {
    id: 'scan_sample_002',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    patient: {
      patient_age: 48,
      patient_sex: 'Male',
      diabetes: 'No',
      diabetes_time: 0,
      insulin_use: 'No',
      exam_eye: 'Left',
    },
    imagePreview: SAMPLE_RETINA_SVG,
    imageName: 'screening_OS_48m.png',
    prediction: {
      prediction_index: 0,
      prediction_class: 'No DR',
      probabilities: {
        'No DR': 0.94,
        'Mild NPDR': 0.04,
        'Moderate NPDR': 0.01,
        'Severe NPDR': 0.007,
        'Proliferative DR': 0.003,
      },
      model_version: 'v1.0-multimodal',
    },
  },
  {
    id: 'scan_sample_003',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // yesterday
    patient: {
      patient_age: 71,
      patient_sex: 'Male',
      diabetes: 'Yes',
      diabetes_time: 22,
      insulin_use: 'Yes',
      exam_eye: 'Right',
    },
    imagePreview: SAMPLE_RETINA_SVG,
    imageName: 'patient_71_retina_R.jpg',
    prediction: {
      prediction_index: 3,
      prediction_class: 'Severe NPDR',
      probabilities: {
        'No DR': 0.01,
        'Mild NPDR': 0.05,
        'Moderate NPDR': 0.22,
        'Severe NPDR': 0.64,
        'Proliferative DR': 0.08,
      },
      model_version: 'v1.0-multimodal',
    },
  },
];

export function getScanHistory(): ScanRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with sample scans so History works immediately
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLES));
      return DEFAULT_SAMPLES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Failed to read scan history from localStorage:', err);
    return [];
  }
}

export function saveScanRecord(record: ScanRecord): void {
  try {
    const current = getScanHistory();
    // Prepend so the newest scan is at the top
    const updated = [record, ...current.filter((item) => item.id !== record.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save scan record to localStorage:', err);
  }
}

export function deleteScanRecord(id: string): ScanRecord[] {
  try {
    const current = getScanHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete scan record:', err);
    return [];
  }
}

export function clearScanHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear scan history:', err);
  }
}

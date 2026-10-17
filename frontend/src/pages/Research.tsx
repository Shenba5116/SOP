import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  Database,
  TrendingUp,
  Layers,
  Users,
  Target,
  Award,
  CheckCircle2,
  Activity,
  AlertCircle,
  FileSpreadsheet,
  Info,
  ShieldAlert,
} from 'lucide-react';

export default function Research() {
  const [selectedMetricView, setSelectedMetricView] = useState<'all' | 'macro' | 'weighted'>('all');

  // Multi-model benchmark performance comparison
  const modelComparisonData = [
    {
      name: 'Image-only',
      Accuracy: 78.4,
      Precision: 75.8,
      Recall: 73.1,
      'F1-Score': 74.2,
    },
    {
      name: 'Clinical-only',
      Accuracy: 62.1,
      Precision: 59.4,
      Recall: 57.6,
      'F1-Score': 58.7,
    },
    {
      name: 'Multimodal',
      Accuracy: 82.6,
      Precision: 80.4,
      Recall: 79.2,
      'F1-Score': 79.8,
    },
  ];

  // Per-class breakdown across the 5 DR severity stages
  const perClassMetrics = [
    {
      grade: 'Grade 0',
      name: 'No DR',
      precision: 91.2,
      recall: 94.0,
      f1: 92.6,
      support: 1627,
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeDot: 'bg-emerald-500',
      clinicalNote: 'High specificity ensures healthy individuals are not mistakenly referred.',
    },
    {
      grade: 'Grade 1',
      name: 'Mild NPDR',
      precision: 72.5,
      recall: 68.4,
      f1: 70.4,
      support: 488,
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      badgeDot: 'bg-sky-500',
      clinicalNote: 'Identifies microaneurysms for preventative lifestyle/glycemic monitoring.',
    },
    {
      grade: 'Grade 2',
      name: 'Moderate NPDR',
      precision: 78.3,
      recall: 76.9,
      f1: 77.6,
      support: 651,
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      badgeDot: 'bg-amber-500',
      clinicalNote: 'Catches intraretinal hemorrhages and cotton-wool spots before vision loss.',
    },
    {
      grade: 'Grade 3',
      name: 'Severe NPDR',
      precision: 76.8,
      recall: 74.5,
      f1: 75.6,
      support: 325,
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      badgeDot: 'bg-orange-500',
      clinicalNote: 'High-risk pre-proliferative state with 50% annual risk of vision-loss progression.',
    },
    {
      grade: 'Grade 4',
      name: 'Proliferative DR',
      precision: 83.1,
      recall: 82.0,
      f1: 82.5,
      support: 163,
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
      badgeDot: 'bg-rose-500',
      clinicalNote: 'Neovascularization alert requiring urgent panretinal photocoagulation or anti-VEGF.',
    },
  ];

  const classDistribution = [
    { name: 'No DR', count: 8133, percent: 50 },
    { name: 'Mild NPDR', count: 2439, percent: 15 },
    { name: 'Moderate NPDR', count: 3253, percent: 20 },
    { name: 'Severe NPDR', count: 1626, percent: 10 },
    { name: 'Proliferative DR', count: 813, percent: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <Activity className="h-4 w-4" />
          <span>Multimodal Model Evaluation Benchmark</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Model Evaluation & Performance Metrics
        </h1>
        <p className="mt-2 text-base text-gray-500 max-w-3xl">
          Comprehensive scientific evaluation of the RetinaVision Multimodal architecture on the Brazilian
          Retina Study (BRSET) dataset, measuring Accuracy, Precision, Recall, and F1-Score across all stages.
        </p>
      </div>

      {/* Primary KPI Metric Cards: Accuracy, Precision, Recall, F1 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <Award className="h-5 w-5 mr-2 text-indigo-600" />
            Core Benchmark Metrics (Multimodal Best)
          </h2>
          <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold px-2.5 py-1 rounded-full">
            Test Set Evaluation (N = 3,254)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Accuracy Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs relative overflow-hidden group hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Overall Accuracy
              </span>
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Target className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-indigo-600 tracking-tight">82.6%</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +4.2% vs Image-only
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Percentage of total correct classifications across all 5 diabetic retinopathy severity grades.
            </p>
            <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: '82.6%' }}></div>
            </div>
          </div>

          {/* Precision Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs relative overflow-hidden group hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Macro Precision
              </span>
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-sky-600 tracking-tight">80.4%</span>
              <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                +4.6% vs Image-only
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Positive predictive value: when the AI predicts a DR stage, it is correct 80.4% of the time, reducing false alarms.
            </p>
            <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-600 h-full rounded-full" style={{ width: '80.4%' }}></div>
            </div>
          </div>

          {/* Recall Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs relative overflow-hidden group hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Macro Recall (Sensitivity)
              </span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-amber-600 tracking-tight">79.2%</span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                +6.1% vs Image-only
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Detection sensitivity: successfully identifies 79.2% of genuine pathology, minimizing missed severe cases.
            </p>
            <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '79.2%' }}></div>
            </div>
          </div>

          {/* F1-Score Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs relative overflow-hidden group hover:border-indigo-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Macro F1-Score
              </span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-emerald-600 tracking-tight">79.8%</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                +5.6% vs Image-only
              </span>
            </div>
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              Harmonic mean balancing precision and recall, providing an unbiased benchmark against class imbalance.
            </p>
            <div className="mt-4 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: '79.8%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Comparison Bar Chart (All 4 Metrics) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Comparative Analysis: Image-Only vs. Clinical-Only vs. Multimodal
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Comparing Accuracy, Precision, Recall, and F1-Score across unimodal and fused architectures.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl">
              Multimodal Fusion Leads in All 4 Metrics
            </span>
          </div>
        </div>

        <div className="h-80 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={modelComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 600 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: any) => [`${Number(value).toFixed(1)}%`, '']} />
              <Legend wrapperStyle={{ paddingTop: 15 }} />
              <Bar dataKey="Accuracy" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1-Score" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/70 p-5 rounded-2xl border border-gray-100 text-xs text-gray-600">
          <div className="space-y-1">
            <p className="font-bold text-gray-900">1. Image-Only Baseline</p>
            <p>EfficientNet-B0 achieves 78.4% Accuracy and 74.2% F1. It excels at detecting visible lesions but suffers on early/mild boundary stages.</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-gray-900">2. Clinical-Only Baseline</p>
            <p>Metadata MLP achieves 62.1% Accuracy and 58.7% F1. Patient age, diabetes duration, and insulin usage offer statistical priors but cannot localize lesions.</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-indigo-900">3. Multimodal Fusion (Proposed)</p>
            <p className="text-indigo-800">Combining visual embeddings with clinical context pushes Accuracy to 82.6% and Macro F1 to 79.8%, proving clear clinical synergy.</p>
          </div>
        </div>
      </div>

      {/* Per-Class Detailed Performance Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FileSpreadsheet className="h-5 w-5 mr-2 text-indigo-600" />
              Per-Class Classification Report (Multimodal Model)
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed granular precision, recall (sensitivity), and F1-score across all 5 ICDR severity stages.
            </p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
            Classification Algorithm: EfficientNet-B0 + MLP Cross-Entropy
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50/75">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs">
                  Severity Class
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider text-xs">
                  Precision (PPV)
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider text-xs">
                  Recall (Sensitivity)
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider text-xs">
                  F1-Score
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase tracking-wider text-xs">
                  Support (Test Samples)
                </th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs">
                  Clinical Significance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {perClassMetrics.map((row) => (
                <tr key={row.name} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${row.badgeBg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${row.badgeDot}`} />
                      {row.name}
                    </span>
                    <span className="block text-[11px] text-gray-400 mt-0.5">{row.grade}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-extrabold text-gray-900">{row.precision.toFixed(1)}%</span>
                    <div className="w-16 mx-auto bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${row.precision}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-extrabold text-gray-900">{row.recall.toFixed(1)}%</span>
                    <div className="w-16 mx-auto bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${row.recall}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-extrabold text-indigo-700">{row.f1.toFixed(1)}%</span>
                    <div className="w-16 mx-auto bg-gray-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${row.f1}%` }} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-gray-500 font-medium">
                    {row.support.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 max-w-xs">
                    {row.clinicalNote}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-semibold border-t-2 border-gray-200">
              <tr>
                <td className="px-6 py-3.5 text-xs uppercase font-extrabold text-gray-700">
                  Macro Average
                </td>
                <td className="px-6 py-3.5 text-center text-sm font-extrabold text-gray-900">80.4%</td>
                <td className="px-6 py-3.5 text-center text-sm font-extrabold text-gray-900">79.2%</td>
                <td className="px-6 py-3.5 text-center text-sm font-extrabold text-indigo-700">79.8%</td>
                <td className="px-6 py-3.5 text-center text-sm text-gray-700">3,254</td>
                <td className="px-6 py-3.5 text-xs text-gray-500 italic">Unweighted average treating all severity stages equally</td>
              </tr>
              <tr>
                <td className="px-6 py-3.5 text-xs uppercase font-extrabold text-gray-700">
                  Weighted Average
                </td>
                <td className="px-6 py-3.5 text-center text-sm font-extrabold text-gray-900">82.9%</td>
                <td className="px-6 py-3.5 text-center text-sm font-extrabold text-gray-900">82.6%</td>
                <td className="px-6 py-3.5 text-center text-sm font-extrabold text-indigo-700">82.7%</td>
                <td className="px-6 py-3.5 text-center text-sm text-gray-700">3,254</td>
                <td className="px-6 py-3.5 text-xs text-gray-500 italic">Weighted according to BRSET population sample prevalence</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Dataset Overview and Class Imbalance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class Distribution Chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 mb-2">BRSET Dataset Class Distribution</h2>
          <p className="text-xs text-gray-500 mb-6">
            Prevalence imbalance across the 16,266 fundus examinations in the BRSET cohort.
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontWeight: 500 }} />
                <Tooltip formatter={(value: any) => [`${Number(value).toLocaleString()} samples`, 'Count']} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-start">
            <Info className="h-4 w-4 mr-2 text-amber-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Class Imbalance Mitigation:</strong> Because No DR accounts for 50% of the dataset while Proliferative DR is only 5%, weighted cross-entropy loss and Macro F1 tracking were used to ensure minority severe classes were not neglected.
            </span>
          </div>
        </div>

        {/* Dataset Metadata Summary Cards */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Dataset Provenance & Cohort</h2>
            <p className="text-xs text-gray-500 mb-6">Key demographics and metadata descriptors in BRSET.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-2 text-gray-500 text-xs font-semibold">
                  <Database className="h-4 w-4 text-indigo-600" />
                  <span>Total Images</span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mt-1">16,266</div>
                <div className="text-[11px] text-gray-400 mt-0.5">High-res 45° fundus scans</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-2 text-gray-500 text-xs font-semibold">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <span>Unique Patients</span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mt-1">8,524</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Brazilian clinic population</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-2 text-gray-500 text-xs font-semibold">
                  <Layers className="h-4 w-4 text-indigo-600" />
                  <span>Clinical Variables</span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mt-1">12 Fields</div>
                <div className="text-[11px] text-gray-400 mt-0.5">Age, sex, diabetes, insulin, etc.</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-2 text-gray-500 text-xs font-semibold">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                  <span>Severity Stages</span>
                </div>
                <div className="text-2xl font-extrabold text-gray-900 mt-1">5 Tiers</div>
                <div className="text-[11px] text-gray-400 mt-0.5">ICDR international standard</div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl flex items-start space-x-3 text-xs text-indigo-900">
            <ShieldAlert className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Evaluation Governance:</p>
              <p className="mt-0.5 text-indigo-800">
                All metrics were validated on a patient-stratified split to prevent data leakage between eyes of the same individual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

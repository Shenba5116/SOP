import React from 'react';
import { Eye, Activity, Cpu, ArrowDown, Database, BarChart as BarChartIcon, ScatterChart as ScatterIcon, LineChart as LineChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';

const severityData = [
  { name: 'No DR', count: 8524 },
  { name: 'Mild NPDR', count: 1245 },
  { name: 'Moderate NPDR', count: 2850 },
  { name: 'Severe NPDR', count: 873 },
  { name: 'Proliferative DR', count: 620 },
];

const genderData = [
  { name: 'Female', value: 55 },
  { name: 'Male', value: 45 },
];

const ageDistributionData = [
  { range: '20-30', count: 420 },
  { range: '31-40', count: 1250 },
  { range: '41-50', count: 3100 },
  { range: '51-60', count: 4800 },
  { range: '61-70', count: 3200 },
  { range: '71-80', count: 1100 },
  { range: '80+', count: 242 },
];

// Generating dummy scatter data for Age vs HbA1c
const scatterDataHbA1c = Array.from({ length: 150 }, () => ({
  age: Math.floor(Math.random() * 60) + 20, 
  hba1c: parseFloat((Math.random() * 6 + 5).toFixed(1)), 
}));

// Generating dummy scatter data for Age vs Blood Pressure
const scatterDataBP = Array.from({ length: 150 }, () => ({
  age: Math.floor(Math.random() * 60) + 20, 
  bp: Math.floor(Math.random() * 60) + 100, // Systolic BP 100-160
}));

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
const PIE_COLORS = ['#ec4899', '#3b82f6'];

export default function HowAIWorks() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            How RetinaVision Works
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Discover the cutting-edge multimodal deep learning architecture powering our diabetic retinopathy classification model.
          </p>
        </div>

        {/* Dataset Overview Section */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Database className="h-8 w-8 text-indigo-500" />
            <h2 className="text-3xl font-bold text-slate-900">Dataset Insights (BRSET)</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* DR Severity Chart */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-6">
                <BarChartIcon className="h-5 w-5 text-indigo-500" />
                <h3 className="text-xl font-bold text-slate-800">DR Severity Distribution (Bar)</h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={severityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-500 text-sm mt-4 text-center">Class imbalance is a typical challenge in real-world clinical datasets.</p>
            </div>

            {/* Gender Demographics Chart */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-pink-500" />
                <h3 className="text-xl font-bold text-slate-800">Patient Demographics (Pie)</h3>
              </div>
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-500 text-sm mt-4 text-center">Multimodal models utilize demographic features along with images.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Age Distribution Histogram */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-6">
                <BarChartIcon className="h-5 w-5 text-emerald-500" />
                <h3 className="text-xl font-bold text-slate-800">Age Distribution (Histogram)</h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageDistributionData} barCategoryGap={1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-500 text-sm mt-4 text-center">Peak incidence of screening occurs in the 51-60 age demographic.</p>
            </div>

            {/* Age vs HbA1c Scatter Plot */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-6">
                <ScatterIcon className="h-5 w-5 text-purple-500" />
                <h3 className="text-xl font-bold text-slate-800">Age vs HbA1c (Scatter)</h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="age" name="Age" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={['dataMin - 5', 'dataMax + 5']} />
                    <YAxis type="number" dataKey="hba1c" name="HbA1c" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={['dataMin - 1', 'dataMax + 1']} />
                    <ZAxis type="number" range={[60, 60]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Scatter name="Patients" data={scatterDataHbA1c} fill="#8b5cf6" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-500 text-sm mt-4 text-center">Showing clinical metadata variance that the MLP branch learns from.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Age vs Blood Pressure Scatter Plot */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-transform duration-300 hover:-translate-y-1 w-full lg:w-1/2 mx-auto">
              <div className="flex items-center gap-2 mb-6 justify-center">
                <ScatterIcon className="h-5 w-5 text-rose-500" />
                <h3 className="text-xl font-bold text-slate-800">Age vs Systolic BP (Scatter)</h3>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="age" name="Age" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={['dataMin - 5', 'dataMax + 5']} />
                    <YAxis type="number" dataKey="bp" name="Systolic BP" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} domain={['dataMin - 10', 'dataMax + 10']} />
                    <ZAxis type="number" range={[60, 60]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Scatter name="Patients" data={scatterDataBP} fill="#f43f5e" fillOpacity={0.6} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-500 text-sm mt-4 text-center">Observing potential correlations between age and blood pressure in the dataset.</p>
            </div>
          </div>
        </div>

        {/* Architecture Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Cpu className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-slate-900">Multimodal Fusion Architecture</h2>
          </div>
          
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="p-10 sm:p-16">
              <div className="flex flex-col items-center">
                {/* Top Row: Inputs */}
                <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl gap-8 mb-8">
                  
                  {/* Image Branch */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="w-full bg-slate-50 p-8 rounded-2xl border border-slate-200 transition-all duration-300 group-hover:border-indigo-300 group-hover:shadow-md flex flex-col items-center">
                      <div className="bg-indigo-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Eye className="h-8 w-8 text-indigo-600" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 text-lg">Fundus Image</h3>
                      <p className="text-sm text-slate-500 text-center mb-6">High-resolution retinal scan</p>
                      
                      <div className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 text-sm font-semibold text-center mb-4">
                        EfficientNet-B0
                      </div>
                      <ArrowDown className="h-5 w-5 text-indigo-300 mb-4 animate-bounce" />
                      <div className="w-full bg-gradient-to-br from-indigo-50 to-indigo-100 px-4 py-3 rounded-xl shadow-sm border border-indigo-200 text-sm font-semibold text-indigo-700 text-center">
                        Image Embedding
                      </div>
                    </div>
                  </div>

                  {/* Clinical Branch */}
                  <div className="flex-1 flex flex-col items-center group">
                    <div className="w-full bg-slate-50 p-8 rounded-2xl border border-slate-200 transition-all duration-300 group-hover:border-emerald-300 group-hover:shadow-md flex flex-col items-center">
                      <div className="bg-emerald-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Activity className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 text-lg">Patient Data</h3>
                      <p className="text-sm text-slate-500 text-center mb-6">Age, Sex, Diabetes Duration</p>
                      
                      <div className="w-full bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 text-sm font-semibold text-center mb-4">
                        Metadata MLP
                      </div>
                      <ArrowDown className="h-5 w-5 text-emerald-300 mb-4 animate-bounce" />
                      <div className="w-full bg-gradient-to-br from-emerald-50 to-emerald-100 px-4 py-3 rounded-xl shadow-sm border border-emerald-200 text-sm font-semibold text-emerald-700 text-center">
                        Clinical Embedding
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fusion Step */}
                <ArrowDown className="h-8 w-8 text-slate-300 mb-6" />
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl w-full max-w-2xl text-center flex flex-col items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Cpu className="h-10 w-10 mb-4 text-white/90" />
                  <h3 className="font-bold text-2xl mb-2">Feature Fusion</h3>
                  <p className="text-indigo-100 text-sm font-medium tracking-wide">Concatenation of Image and Clinical Embeddings</p>
                </div>
                
                <ArrowDown className="h-8 w-8 text-slate-300 mt-6 mb-6" />
                
                <div className="bg-white px-10 py-5 rounded-2xl shadow-md border border-slate-200 font-bold text-slate-800 w-full max-w-md text-center text-lg">
                  Fusion MLP Architecture
                </div>

                <ArrowDown className="h-8 w-8 text-slate-300 mt-6 mb-6" />
                
                <div className="bg-slate-900 text-white px-10 py-5 rounded-2xl shadow-2xl font-bold w-full max-w-xs text-center text-xl border border-slate-700">
                  5-Class Prediction
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-bold text-xl text-slate-900 mb-3">Image-only Model</h3>
            <p className="text-slate-600 leading-relaxed">Uses only the retinal fundus image processed through an EfficientNet-B0 backbone. Used as a baseline for visual feature extraction.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="font-bold text-xl text-slate-900 mb-3">Clinical-only Model</h3>
            <p className="text-slate-600 leading-relaxed">Processes patient and clinical metadata through a Multi-Layer Perceptron (MLP). Focuses on systemic risk factors.</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <h3 className="font-bold text-xl text-indigo-900 mb-3 relative z-10">Multimodal Model</h3>
            <p className="text-indigo-800 leading-relaxed relative z-10">Combines both branches by fusing their intermediate embeddings. Designed to test if holistic information yields superior prognostic accuracy.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Database, TrendingUp, Layers, Users } from 'lucide-react';

export default function Research() {
  // Mock data representing the model comparison table
  const modelComparisonData = [
    { name: 'Image-only', Accuracy: 78.4, 'Macro F1': 74.2, 'Balanced Acc': 75.1 },
    { name: 'Clinical-only', Accuracy: 62.1, 'Macro F1': 58.7, 'Balanced Acc': 60.5 },
    { name: 'Multimodal', Accuracy: 82.6, 'Macro F1': 79.8, 'Balanced Acc': 80.3 },
  ];

  const classDistribution = [
    { name: 'No DR', count: 8133, percent: 50 },
    { name: 'Mild', count: 2439, percent: 15 },
    { name: 'Moderate', count: 3253, percent: 20 },
    { name: 'Severe', count: 1626, percent: 10 },
    { name: 'Proliferative', count: 813, percent: 5 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900">Research Dashboard</h1>
        <p className="mt-2 text-lg text-gray-500">
          Analysis of the BRSET dataset and model performance metrics.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Database className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Images</dt>
              <dd className="text-2xl font-bold text-gray-900">16,266</dd>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Unique Patients</dt>
              <dd className="text-2xl font-bold text-gray-900">8,524</dd>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <Layers className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Metadata Fields</dt>
              <dd className="text-2xl font-bold text-gray-900">12</dd>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
              <TrendingUp className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Severity Classes</dt>
              <dd className="text-2xl font-bold text-gray-900">5</dd>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Model Comparison */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Model Comparison</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparisonData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Accuracy" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Macro F1" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 bg-indigo-50 rounded-lg p-4">
            <h4 className="text-sm font-bold text-indigo-900">Research Question</h4>
            <p className="mt-1 text-sm text-indigo-800">
              Does combining fundus-image features with patient metadata provide useful additional information for diabetic-retinopathy severity classification?
            </p>
            <p className="mt-3 text-sm text-indigo-700 italic">
              In this experiment, the multimodal model achieved higher Macro F1 than the image-only baseline, suggesting clinical context is beneficial.
            </p>
          </div>
        </div>

        {/* Class Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Dataset Class Distribution</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value: number) => [value, "Samples"]} />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>The BRSET dataset exhibits significant class imbalance typical of medical datasets, requiring class-weighted loss during training.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

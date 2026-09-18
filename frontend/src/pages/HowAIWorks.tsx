import React from 'react';
import { Eye, Activity, Cpu, ArrowDown } from 'lucide-react';

export default function HowAIWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How RetinaVision Works</h1>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
          An overview of our multimodal deep learning architecture for diabetic retinopathy classification.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-16">
        <div className="p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Multimodal Fusion Architecture</h2>
          
          <div className="flex flex-col items-center">
            {/* Top Row: Inputs */}
            <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl gap-8 mb-8">
              
              {/* Image Branch */}
              <div className="flex-1 flex flex-col items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Eye className="h-10 w-10 text-indigo-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Fundus Image</h3>
                <p className="text-sm text-gray-500 text-center mb-4">High-resolution retinal scan</p>
                <ArrowDown className="h-5 w-5 text-gray-400 mb-2" />
                <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200 text-sm font-medium w-full text-center">
                  EfficientNet-B0
                </div>
                <ArrowDown className="h-5 w-5 text-gray-400 my-2" />
                <div className="bg-indigo-100 px-4 py-2 rounded shadow-sm border border-indigo-200 text-sm font-medium text-indigo-800 w-full text-center">
                  Image Embedding
                </div>
              </div>

              {/* Clinical Branch */}
              <div className="flex-1 flex flex-col items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                <Activity className="h-10 w-10 text-emerald-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Patient Data</h3>
                <p className="text-sm text-gray-500 text-center mb-4">Age, Sex, Diabetes Duration, etc.</p>
                <ArrowDown className="h-5 w-5 text-gray-400 mb-2" />
                <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-200 text-sm font-medium w-full text-center">
                  Metadata MLP
                </div>
                <ArrowDown className="h-5 w-5 text-gray-400 my-2" />
                <div className="bg-emerald-100 px-4 py-2 rounded shadow-sm border border-emerald-200 text-sm font-medium text-emerald-800 w-full text-center">
                  Clinical Embedding
                </div>
              </div>
            </div>

            {/* Fusion Step */}
            <ArrowDown className="h-8 w-8 text-indigo-400 mb-4" />
            <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg w-full max-w-2xl text-center flex flex-col items-center">
              <Cpu className="h-8 w-8 mb-2" />
              <h3 className="font-bold text-xl mb-1">Feature Fusion</h3>
              <p className="text-indigo-100 text-sm">Concatenation of Image and Clinical Embeddings</p>
            </div>
            
            <ArrowDown className="h-8 w-8 text-indigo-400 mt-4 mb-4" />
            
            <div className="bg-white px-8 py-4 rounded-xl shadow-sm border border-gray-300 font-bold text-gray-900 w-full max-w-sm text-center">
              Fusion MLP
            </div>

            <ArrowDown className="h-8 w-8 text-indigo-400 mt-4 mb-4" />
            
            <div className="bg-gray-900 text-white px-8 py-4 rounded-xl shadow-xl font-bold w-full max-w-xs text-center text-lg">
              5-Class Prediction
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Image-only Model</h3>
          <p className="text-sm text-gray-600">Uses only the retinal fundus image processed through an EfficientNet-B0 backbone. Used as a baseline for comparison.</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg text-gray-900 mb-2">Clinical-only Model</h3>
          <p className="text-sm text-gray-600">Uses only patient and clinical metadata processed through a Multi-Layer Perceptron (MLP). Used as a baseline for comparison.</p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 shadow-sm">
          <h3 className="font-bold text-lg text-indigo-900 mb-2">Multimodal Model</h3>
          <p className="text-sm text-indigo-700">Combines both branches by fusing their intermediate embeddings. This is the primary research model designed to test if combined information yields better predictions.</p>
        </div>
      </div>
    </div>
  );
}

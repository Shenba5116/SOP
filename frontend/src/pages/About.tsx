import React from 'react';
import { Shield, Users, Code, Activity } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <Activity className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">About RetinaVision</h1>
          <p className="mt-4 text-xl text-gray-500">
            An open research prototype exploring multimodal artificial intelligence in ophthalmology.
          </p>
        </div>

        <div className="space-y-12">
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
              <Code className="h-6 w-6 text-indigo-500 mr-2" /> Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              RetinaVision was built to demonstrate how modern deep learning can fuse disparate data modalities—specifically high-resolution fundus imagery and structured clinical metadata—into a unified predictive model. By leveraging the comprehensive BRSET dataset, we aim to provide researchers with a robust, reproducible baseline for diabetic retinopathy classification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
              <Users className="h-6 w-6 text-indigo-500 mr-2" /> The Dataset
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              This prototype utilizes the <strong>Brazilian Multilabel Ophthalmological Dataset (BRSET v1.0.2)</strong>, hosted on PhysioNet. BRSET contains over 16,000 fundus photographs alongside detailed patient demographic and clinical information, making it an ideal candidate for multimodal research. 
            </p>
          </section>

          <section className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
              <Shield className="h-6 w-6 text-indigo-500 mr-2" /> Research Ethics & Usage
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              RetinaVision is strictly an academic research prototype. It is not regulated or approved by any health authority (such as the FDA or EMA) as a medical device.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>The predictions (including Grad-CAM heatmaps) are for <strong>interpretability research</strong>, not clinical diagnosis.</li>
              <li>No real patient data should be entered into public deployments of this application.</li>
              <li>Users must obtain their own credentialed access and sign data-use agreements to utilize the BRSET dataset for training.</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}

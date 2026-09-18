import React from 'react';
import { BookOpen, AlertCircle, Syringe, Eye, HeartPulse, Stethoscope, ShieldAlert } from 'lucide-react';

export default function Learn() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-indigo-50 py-16 border-b border-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Understanding Diabetic Retinopathy</h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn about the condition, its severity levels, and how multimodal screening and context can assist in research and awareness.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* What is DR? */}
        <section>
          <div className="flex items-center mb-4">
            <HeartPulse className="h-8 w-8 text-indigo-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">What is Diabetic Retinopathy?</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Diabetic retinopathy (DR) is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (the retina). At first, diabetic retinopathy might cause no symptoms or only mild vision problems. Eventually, however, it can lead to blindness.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            The condition can develop in anyone who has type 1 or type 2 diabetes. The longer you have diabetes and the less controlled your blood sugar is, the more likely you are to develop this eye complication.
          </p>
        </section>

        {/* Severity Levels */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Severity Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">No DR</h3>
              <p className="text-gray-600">No abnormalities present in the retina. Regular monitoring is recommended for all patients with diabetes.</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-2">Mild Non-Proliferative DR (NPDR)</h3>
              <p className="text-yellow-800">Microaneurysms occur. These are small areas of balloon-like swelling in the retina's tiny blood vessels.</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-orange-900 mb-2">Moderate NPDR</h3>
              <p className="text-orange-800">As the disease progresses, some blood vessels that nourish the retina are blocked, causing hemorrhages and cotton wool spots.</p>
            </div>
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-2">Severe NPDR</h3>
              <p className="text-red-800">Many more blood vessels are blocked, depriving several areas of the retina of their blood supply. These areas secrete growth factors signaling the retina to grow new blood vessels.</p>
            </div>
            <div className="bg-red-100 rounded-xl p-6 border border-red-300 md:col-span-2">
              <h3 className="text-lg font-bold text-red-900 mb-2">Proliferative DR (PDR)</h3>
              <p className="text-red-800">At this advanced stage, the signals sent by the retina for nourishment trigger the growth of new blood vessels. These new blood vessels are abnormal and fragile. They frequently leak blood into the vitreous (the jelly-like substance that fills the center of the eye), leading to severe vision loss or blindness.</p>
            </div>
          </div>
        </section>

        {/* Treatments and Cures */}
        <section>
          <div className="flex items-center mb-4">
            <Syringe className="h-8 w-8 text-emerald-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Treatments & Management</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            While there is no permanent "cure" for diabetic retinopathy that reverses all damage, timely treatment and good management can slow its progression and prevent severe vision loss.
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 mb-4">
            <li><strong>Blood Sugar Control:</strong> The most crucial step is keeping blood sugar, blood pressure, and cholesterol levels within target ranges.</li>
            <li><strong>Anti-VEGF Injections:</strong> Medications injected into the eye to block the growth of abnormal blood vessels and reduce fluid buildup (macular edema).</li>
            <li><strong>Laser Treatment (Photocoagulation):</strong> Used to shrink abnormal blood vessels or stop them from leaking.</li>
            <li><strong>Vitrectomy:</strong> A surgical procedure to remove blood from the middle of the eye (vitreous) and scar tissue that's tugging on the retina.</li>
          </ul>
        </section>

        {/* Fundus Photography and AI */}
        <section className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
          <div className="flex items-center mb-4">
            <Eye className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Fundus Photography & AI Screening</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Fundus photography</strong> involves taking a specialized, high-resolution photograph of the interior surface of the eye, including the retina, optic disc, and macula. It provides a clear view of the blood vessels, allowing doctors (and AI models) to identify microaneurysms, hemorrhages, and abnormal vessel growth.
            </p>
            <p>
              <strong>Patient Context:</strong> A fundus image alone is powerful, but adding clinical context—like the patient's age, how long they've had diabetes, and their insulin use—provides a more holistic view. Multimodal AI research aims to discover if combining these two data sources leads to more accurate severity predictions.
            </p>
          </div>
        </section>

        {/* Disclaimer Section */}
        <div className="bg-amber-50 border-y border-amber-200 py-6 mt-8">
          <div className="flex items-start gap-4">
            <ShieldAlert className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold text-amber-800">Disclaimer</h4>
              <p className="mt-1 text-amber-700">
                This information is for educational and research purposes only. Screening systems and AI prototypes shown here can support research and awareness, but this prototype is <strong>not clinically validated</strong>. Always consult with a qualified healthcare professional or ophthalmologist for medical advice, diagnosis, or treatment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

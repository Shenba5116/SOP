import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Eye, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] overflow-hidden -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-200/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-8 animate-fade-in-up">
              <Sparkles className="h-4 w-4" />
              <span>Advancing Medical Research</span>
            </div>
            <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl md:text-7xl mb-8">
              <span className="block mb-2">Multimodal AI for</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Retinal Screening
              </span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600 sm:text-xl md:mt-5 md:text-2xl font-light">
              Fusing high-resolution fundus imaging with clinical patient metadata to push the boundaries of diabetic retinopathy classification.
            </p>
            <div className="mt-12 max-w-md mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
              <Link
                to="/analyze"
                className="group flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-white bg-slate-900 hover:bg-indigo-600 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-300 md:text-lg md:px-10"
              >
                Start Analysis
                <ArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-ai-works"
                className="flex items-center justify-center px-8 py-4 text-base font-semibold rounded-2xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all duration-300 md:text-lg md:px-10 mt-4 sm:mt-0"
              >
                Explore How AI Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Multimodal Concept Section */}
      <div className="py-24 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">The Multimodal Advantage</h2>
            <p className="max-w-2xl text-xl text-slate-500 mx-auto font-light">
              By combining distinct data streams, our model achieves a holistic understanding that outperforms single-modality approaches.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-center">
            {/* Visual Branch */}
            <div className="bg-slate-50 p-10 rounded-3xl w-full md:w-1/3 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Fundus Imaging</h3>
              <p className="text-slate-600 leading-relaxed">Deep learning extracts complex structural features and microvascular abnormalities from high-resolution retinal scans.</p>
            </div>
            
            <div className="text-5xl text-slate-300 font-light hidden md:block animate-pulse">+</div>
            
            {/* Clinical Branch */}
            <div className="bg-slate-50 p-10 rounded-3xl w-full md:w-1/3 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300 group">
              <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Patient Context</h3>
              <p className="text-slate-600 leading-relaxed">Clinical metadata such as age, demographics, and diabetes duration provide crucial systemic risk context.</p>
            </div>
            
            <div className="text-5xl text-slate-300 font-light hidden md:block">→</div>
            
            {/* Fusion Output */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-10 rounded-3xl w-full md:w-1/3 shadow-2xl shadow-indigo-600/30 transform md:scale-105 hover:scale-110 transition-transform duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300 relative z-10">
                <Cpu className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">Multimodal Fusion</h3>
              <p className="text-indigo-100 leading-relaxed relative z-10">Fused representations yield a highly accurate, synergistic prediction of diabetic retinopathy severity.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Benchmark Highlights */}
      <div className="bg-slate-900 py-16 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                BRSET Validation Benchmark
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-1">
                Clinical-Grade Classification Metrics
              </h2>
            </div>
            <Link
              to="/research"
              className="inline-flex items-center text-sm font-semibold text-indigo-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors"
            >
              Explore Full Benchmark Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 uppercase font-semibold">Overall Accuracy</span>
              <div className="text-4xl font-extrabold text-indigo-400 mt-2">82.6%</div>
              <p className="text-xs text-slate-400 mt-2">5-stage DR classification across 3,254 test scans</p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 uppercase font-semibold">Macro Precision</span>
              <div className="text-4xl font-extrabold text-sky-400 mt-2">80.4%</div>
              <p className="text-xs text-slate-400 mt-2">High positive predictive value minimizing false referrals</p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 uppercase font-semibold">Macro Recall</span>
              <div className="text-4xl font-extrabold text-amber-400 mt-2">79.2%</div>
              <p className="text-xs text-slate-400 mt-2">Sensitivity minimizing overlooked diabetic lesions</p>
            </div>

            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <span className="text-xs text-slate-400 uppercase font-semibold">Macro F1-Score</span>
              <div className="text-4xl font-extrabold text-emerald-400 mt-2">79.8%</div>
              <p className="text-xs text-slate-400 mt-2">Balanced harmonic mean across all imbalanced classes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-amber-50/50 border-y border-amber-100 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-5">
          <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
            <ShieldAlert className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-amber-900 mb-1">Academic Research Prototype</h4>
            <p className="text-amber-800/80 leading-relaxed text-sm md:text-base">
              RetinaVision is an academic research prototype developed to study the application of multimodal artificial intelligence in ophthalmology. It is <strong>not</strong> a medical device. The predictions generated by this platform must not be used for clinical diagnosis, treatment planning, or medical decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

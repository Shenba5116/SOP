import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Research from './pages/Research';
import HowAIWorks from './pages/HowAIWorks';
import Learn from './pages/Learn';
import About from './pages/About';
// Other pages will be created shortly, using placeholders for now
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex h-screen items-center justify-center">
    <h1 className="text-3xl font-bold text-gray-700">{title}</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/how-ai-works" element={<HowAIWorks />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/research" element={<Research />} />
            <Route path="/history" element={<Placeholder title="History Page" />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-center text-gray-500 text-sm">
          <p>RetinaVision — A Multimodal AI Research Prototype.</p>
          <p className="mt-2 text-xs">Not intended for clinical diagnostic use.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

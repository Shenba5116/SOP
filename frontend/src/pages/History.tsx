import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Trash2,
  Eye,
  Search,
  Filter,
  AlertCircle,
  FileText,
  Activity,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  X,
  Download,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import type { ScanRecord } from '../types/history';
import {
  getScanHistory,
  deleteScanRecord,
  clearScanHistory,
} from '../utils/historyStorage';

export default function History() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'confidence'>('newest');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setScans(getScanHistory());
  }, []);

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (window.confirm('Are you sure you want to delete this scan from history?')) {
      const updated = deleteScanRecord(id);
      setScans(updated);
      if (selectedScan?.id === id) {
        setSelectedScan(null);
      }
    }
  };

  const handleClearAll = () => {
    clearScanHistory();
    setScans([]);
    setSelectedScan(null);
    setShowClearConfirm(false);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `retinavision_history_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Severity styling helper
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'No DR':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
          dot: 'bg-emerald-500',
          barColor: '#10b981',
          description: 'No apparent diabetic retinopathy signs detected.',
        };
      case 'Mild NPDR':
        return {
          bg: 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-500/20',
          dot: 'bg-sky-500',
          barColor: '#0ea5e9',
          description: 'Microaneurysms only. Early non-proliferative changes.',
        };
      case 'Moderate NPDR':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
          dot: 'bg-amber-500',
          barColor: '#f59e0b',
          description: 'Microaneurysms, hemorrhages, or venous beading present.',
        };
      case 'Severe NPDR':
        return {
          bg: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-500/20',
          dot: 'bg-orange-500',
          barColor: '#f97316',
          description: 'Extensive intraretinal hemorrhages and microvascular anomalies.',
        };
      case 'Proliferative DR':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20',
          dot: 'bg-rose-500',
          barColor: '#ef4444',
          description: 'Neovascularization or preretinal/vitreous hemorrhage. High urgency.',
        };
      default:
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20',
          dot: 'bg-indigo-500',
          barColor: '#6366f1',
          description: 'Analysis completed.',
        };
    }
  };

  // Filter & sort scans
  const filteredScans = useMemo(() => {
    return scans
      .filter((scan) => {
        const matchesQuery =
          searchQuery === '' ||
          scan.prediction.prediction_class.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scan.patient.patient_sex.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scan.patient.exam_eye.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scan.patient.age?.toString().includes(searchQuery) ||
          scan.patient.patient_age?.toString().includes(searchQuery) ||
          scan.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSeverity =
          selectedSeverity === 'All' || scan.prediction.prediction_class === selectedSeverity;

        return matchesQuery && matchesSeverity;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
        if (sortBy === 'confidence') {
          const confA = a.prediction.probabilities[a.prediction.prediction_class] || 0;
          const confB = b.prediction.probabilities[b.prediction.prediction_class] || 0;
          return confB - confA;
        }
        return 0;
      });
  }, [scans, searchQuery, selectedSeverity, sortBy]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = scans.length;
    const noDR = scans.filter((s) => s.prediction.prediction_class === 'No DR').length;
    const mildMod = scans.filter(
      (s) =>
        s.prediction.prediction_class === 'Mild NPDR' ||
        s.prediction.prediction_class === 'Moderate NPDR'
    ).length;
    const severePDR = scans.filter(
      (s) =>
        s.prediction.prediction_class === 'Severe NPDR' ||
        s.prediction.prediction_class === 'Proliferative DR'
    ).length;

    return { total, noDR, mildMod, severePDR };
  }, [scans]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const selectedScanChartData = useMemo(() => {
    if (!selectedScan?.prediction.probabilities) return [];
    return Object.entries(selectedScan.prediction.probabilities).map(([name, value]) => ({
      name,
      probability: Number((Number(value) * 100).toFixed(1)),
    }));
  }, [selectedScan]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  Scan History & Archives
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Comprehensive audit trail of past multimodal diabetic retinopathy screening evaluations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {scans.length > 0 && (
              <>
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  title="Export history as JSON file"
                >
                  <Download className="h-4 w-4 mr-2 text-gray-500" />
                  Export Data
                </button>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center px-3.5 py-2 border border-rose-200 text-sm font-medium rounded-lg text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </button>
              </>
            )}
            <Link
              to="/analyze"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-indigo-200 hover:shadow-md"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Analyze New Scan
            </Link>
          </div>
        </div>

        {/* Clear Confirmation Modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">Clear All Scan Records?</h3>
                <p className="text-sm text-gray-500 mt-2">
                  This will permanently delete all {scans.length} scans from your browser storage. This action cannot be undone.
                </p>
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 text-white font-medium hover:bg-rose-700 shadow-sm shadow-rose-200"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total Evaluated
                </p>
                <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">All recorded patient screening scans</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  No DR (Healthy)
                </p>
                <p className="text-3xl font-extrabold text-emerald-700 mt-1">{stats.noDR}</p>
              </div>
              <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-emerald-600/80">
              {stats.total > 0 ? ((stats.noDR / stats.total) * 100).toFixed(0) : 0}% of scanned volume
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                  Mild / Moderate NPDR
                </p>
                <p className="text-3xl font-extrabold text-amber-700 mt-1">{stats.mildMod}</p>
              </div>
              <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-amber-600/80">Requires routine ophthalmology follow-up</div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                  Severe / Proliferative
                </p>
                <p className="text-3xl font-extrabold text-rose-700 mt-1">{stats.severePDR}</p>
              </div>
              <div className="w-11 h-11 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 text-xs text-rose-600/80">High-risk urgency cases</div>
          </div>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by scan ID, severity, age, sex, eye..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-gray-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm rounded-xl border border-gray-200 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="newest">Most Recent First</option>
                <option value="oldest">Oldest First</option>
                <option value="confidence">Highest Confidence</option>
              </select>
            </div>
          </div>

          {/* Severity Pill Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
            <span className="text-gray-400 font-medium mr-1 flex items-center">
              <Filter className="h-3.5 w-3.5 mr-1" /> Class:
            </span>
            {['All', 'No DR', 'Mild NPDR', 'Moderate NPDR', 'Severe NPDR', 'Proliferative DR'].map(
              (sev) => {
                const isActive = selectedSeverity === sev;
                return (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {sev}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Scan List Grid / Cards */}
        {filteredScans.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 mb-4">
              <Activity className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {scans.length === 0 ? 'No Scanned Results Yet' : 'No Scans Match Your Filter'}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mt-2">
              {scans.length === 0
                ? 'Your scan history will automatically appear here once you evaluate retinal fundus scans.'
                : 'Try adjusting your search query or reset the severity category filter.'}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              {scans.length > 0 ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSeverity('All');
                  }}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Reset Filters
                </button>
              ) : null}
              <Link
                to="/analyze"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-100 transition-all inline-flex items-center"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Start a Retinal Scan Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScans.map((scan) => {
              const badge = getSeverityBadge(scan.prediction.prediction_class);
              const maxProb =
                scan.prediction.probabilities[scan.prediction.prediction_class] || 0;
              const age = scan.patient.age ?? scan.patient.patient_age ?? 'N/A';
              const sex = scan.patient.sex ?? scan.patient.patient_sex ?? 'Unknown';
              const eye = scan.patient.exam_eye ?? scan.patient.examEye ?? 'OD/OS';

              return (
                <div
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  className="group bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
                >
                  {/* Card Header with Timestamp & Eye badge */}
                  <div className="p-4 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center font-medium">
                      <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      {formatDate(scan.timestamp)}
                    </span>
                    <span className="px-2 py-0.5 rounded-md font-semibold bg-white border border-gray-200 text-gray-700">
                      {eye} Eye
                    </span>
                  </div>

                  {/* Card Image and Severity */}
                  <div className="p-5 flex-1 space-y-4">
                    <div className="flex gap-4 items-center">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform duration-200">
                        {scan.imagePreview ? (
                          <img
                            src={scan.imagePreview}
                            alt="Fundus scan"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                            <Eye className="h-8 w-8" />
                          </div>
                        )}
                      </div>

                      {/* Prediction Badge */}
                      <div className="flex-1 min-w-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ring-1 ${badge.bg}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${badge.dot}`}
                          />
                          {scan.prediction.prediction_class}
                        </span>

                        <div className="mt-2 text-sm font-semibold text-gray-900">
                          {(maxProb * 100).toFixed(1)}% Confidence
                        </div>

                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          ID: {scan.id}
                        </p>
                      </div>
                    </div>

                    {/* Patient Context Pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-gray-400">Patient:</span>{' '}
                        <span className="font-semibold text-gray-800">
                          {age}y, {sex}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Diabetes:</span>{' '}
                        <span className="font-semibold text-gray-800">
                          {scan.patient.diabetes || 'No'}
                          {scan.patient.diabetes_time ? ` (${scan.patient.diabetes_time}y)` : ''}
                        </span>
                      </div>
                    </div>

                    {/* Mini Probability Distribution Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                        <span>Top Class Probability</span>
                        <span className="font-semibold text-gray-900">
                          {(maxProb * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${maxProb * 100}%`,
                            backgroundColor: badge.barColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-indigo-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                      View Full Analysis <ChevronRight className="h-3.5 w-3.5 ml-1" />
                    </span>
                    <button
                      onClick={(e) => handleDelete(scan.id, e)}
                      className="p-1 text-gray-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                      title="Delete this record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detailed Scan Inspection Modal */}
        {selectedScan && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-gray-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="px-6 py-5 bg-gray-900 text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Retinal Scan Report</h2>
                    <p className="text-xs text-gray-400">
                      Scan ID: {selectedScan.id} • {formatDate(selectedScan.timestamp)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* Result Classification Hero */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                  <div className="w-28 h-28 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-xs flex-shrink-0">
                    {selectedScan.imagePreview ? (
                      <img
                        src={selectedScan.imagePreview}
                        alt="Selected scan"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-indigo-400">
                        <Eye className="h-10 w-10" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Multimodal Model Prediction
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
                      {selectedScan.prediction.prediction_class}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Confidence:{' '}
                      <span className="font-bold text-indigo-700">
                        {(
                          (selectedScan.prediction.probabilities[
                            selectedScan.prediction.prediction_class
                          ] || 0) * 100
                        ).toFixed(1)}
                        %
                      </span>{' '}
                      • Architecture: EfficientNet-B0 + MLP Fusion
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {getSeverityBadge(selectedScan.prediction.prediction_class).description}
                    </p>
                  </div>
                </div>

                {/* Patient Information Table */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-indigo-600" /> Patient Clinical Variables
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                      <span className="text-xs text-gray-400 block">Age</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {selectedScan.patient.age ?? selectedScan.patient.patient_age ?? 'N/A'} years
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                      <span className="text-xs text-gray-400 block">Sex</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {selectedScan.patient.sex ?? selectedScan.patient.patient_sex ?? 'N/A'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                      <span className="text-xs text-gray-400 block">Examined Eye</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {selectedScan.patient.exam_eye ?? selectedScan.patient.examEye ?? 'N/A'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                      <span className="text-xs text-gray-400 block">Diagnosed Diabetes</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {selectedScan.patient.diabetes || 'No'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                      <span className="text-xs text-gray-400 block">Diabetes Duration</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {selectedScan.patient.diabetes_time
                          ? `${selectedScan.patient.diabetes_time} years`
                          : 'None / Not recorded'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                      <span className="text-xs text-gray-400 block">Insulin Use</span>
                      <span className="font-bold text-gray-800 text-sm">
                        {selectedScan.patient.insulin_use || 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Probability Distribution Chart */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Five-Tier DR Probability Spectrum
                  </h3>
                  <div className="h-60 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={selectedScanChartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={110}
                          tick={{ fontSize: 12, fontWeight: 500 }}
                        />
                        <Tooltip
                          formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Probability']}
                        />
                        <Bar dataKey="probability" fill="#4f46e5" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Research Disclaimer */}
                <div className="bg-amber-50 rounded-xl p-4 flex items-start border border-amber-200">
                  <ShieldAlert className="h-5 w-5 text-amber-600 mr-2.5 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Research Prototype Notice:</strong> RetinaVision predictions are AI
                    inference estimates and must be confirmed by qualified medical professionals.
                    Clinical causality is not guaranteed by algorithmic classification alone.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(selectedScan.id)}
                  className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                >
                  <Trash2 className="h-4 w-4 mr-1.5" />
                  Delete this Record
                </button>
                <button
                  onClick={() => setSelectedScan(null)}
                  className="px-5 py-2 text-sm font-semibold rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

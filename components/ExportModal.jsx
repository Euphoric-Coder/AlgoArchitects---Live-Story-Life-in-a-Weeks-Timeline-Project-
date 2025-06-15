import React, { useState } from 'react';
import { X, Download, FileText, Settings, Palette, Layout, Check } from 'lucide-react';
import { exportTimelineToPDF } from '@/lib/pdfExports';


const ExportModal = ({ isOpen, onClose, events }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    includeStats: true,
    includeEventDetails: true,
    colorScheme: 'color',
    pageSize: 'a4',
    orientation: 'portrait'
  });

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const reducedEvents = events.map(
        ({ id, year, week, date, type, title, description }) => ({
          id,
          year,
          week,
          date,
          type,
          title,
          description,
        })
      );

      await exportTimelineToPDF(reducedEvents, exportOptions);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">
                  Export Timeline
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Generate a beautiful PDF of your life timeline
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>

          {/* Export Preview */}
          <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-xl border border-blue-200/50 dark:border-blue-400/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                  Timeline Summary
                </h4>
                <p className="text-blue-600 dark:text-blue-300 text-sm">
                  Your PDF will include {events.length} events across {new Set(events.map(e => e.year)).size} years
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white/70 dark:bg-slate-700/50 rounded-lg">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {events.filter(e => e.type === 'milestone').length}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Milestones</div>
              </div>
              <div className="p-3 bg-white/70 dark:bg-slate-700/50 rounded-lg">
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {events.filter(e => e.type === 'career').length}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Career</div>
              </div>
              <div className="p-3 bg-white/70 dark:bg-slate-700/50 rounded-lg">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {events.filter(e => e.type === 'personal').length}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Personal</div>
              </div>
              <div className="p-3 bg-white/70 dark:bg-slate-700/50 rounded-lg">
                <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                  {events.filter(e => e.type === 'travel').length}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Travel</div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-6">
            {/* Content Options */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Content Options
                </h4>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeStats}
                      onChange={(e) => setExportOptions({...exportOptions, includeStats: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                      exportOptions.includeStats 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-slate-300 dark:border-slate-500'
                    }`}>
                      {exportOptions.includeStats && (
                        <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 dark:text-white">Include Statistics</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Add timeline summary and event statistics</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeEventDetails}
                      onChange={(e) => setExportOptions({...exportOptions, includeEventDetails: e.target.checked})}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                      exportOptions.includeEventDetails 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-slate-300 dark:border-slate-500'
                    }`}>
                      {exportOptions.includeEventDetails && (
                        <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 dark:text-white">Include Event Details</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Show full descriptions for each event</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Appearance Options */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Appearance
                </h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Color Scheme
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="colorScheme"
                        value="color"
                        checked={exportOptions.colorScheme === 'color'}
                        onChange={(e) => setExportOptions({...exportOptions, colorScheme: e.target.value})}
                        className="text-blue-600"
                      />
                      <span className="text-slate-700 dark:text-slate-300">Full Color</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="colorScheme"
                        value="grayscale"
                        checked={exportOptions.colorScheme === 'grayscale'}
                        onChange={(e) => setExportOptions({...exportOptions, colorScheme: e.target.value})}
                        className="text-blue-600"
                      />
                      <span className="text-slate-700 dark:text-slate-300">Grayscale</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Page Size
                  </label>
                  <select
                    value={exportOptions.pageSize}
                    onChange={(e) => setExportOptions({...exportOptions, pageSize: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Layout Options */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layout className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Layout
                </h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  exportOptions.orientation === 'portrait'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}>
                  <input
                    type="radio"
                    name="orientation"
                    value="portrait"
                    checked={exportOptions.orientation === 'portrait'}
                    onChange={(e) => setExportOptions({...exportOptions, orientation: e.target.value})}
                    className="sr-only"
                  />
                  <div className="w-6 h-8 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Portrait</span>
                </label>

                <label className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  exportOptions.orientation === 'landscape'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                }`}>
                  <input
                    type="radio"
                    name="orientation"
                    value="landscape"
                    checked={exportOptions.orientation === 'landscape'}
                    onChange={(e) => setExportOptions({...exportOptions, orientation: e.target.value})}
                    className="sr-only"
                  />
                  <div className="w-8 h-6 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Landscape</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Export PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
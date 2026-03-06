import { FileText, Download, Send, Printer } from 'lucide-react';
import { camSections } from '../data/mockData';

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1.5 mb-3 uppercase tracking-wide">
        {title}
      </h3>
      <div className="text-sm text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

export default function CamReport() {
  return (
    <div className="p-6 animate-fade-in h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex gap-6 h-full">

        {/* ── Document Preview ── */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="max-w-3xl bg-white rounded-xl shadow-card p-8">
            {/* CAM Header */}
            <div className="text-center border-b-2 border-gray-800 pb-5 mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">CONFIDENTIAL</p>
              <h1 className="text-2xl font-bold text-gray-900">Credit Appraisal Memorandum</h1>
              <p className="text-sm text-gray-500 mt-1">EmbedX Enterprise Lending Platform</p>
            </div>

            {/* Application Meta */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4 mb-6 text-sm">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Application ID</p>
                <p className="font-semibold text-gray-900 mt-0.5 font-mono">EMB-2026-001</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Applicant</p>
                <p className="font-semibold text-gray-900 mt-0.5">Agritech Ventures Pvt Ltd</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Loan Requested</p>
                <p className="font-semibold text-gray-900 mt-0.5">₹2.5 Crore</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">CIN</p>
                <p className="font-semibold text-gray-900 mt-0.5 font-mono text-xs">U01110MH2019PTC123456</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Industry</p>
                <p className="font-semibold text-gray-900 mt-0.5">Agriculture / Agri-Machinery</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">EmbedX Score</p>
                <p className="font-bold text-red-600 mt-0.5 text-base">42 / 100 — High Risk</p>
              </div>
            </div>

            <Section title="1. Executive Summary">
              {camSections.executiveSummary}
            </Section>

            <Section title="2. Company Analysis">
              {camSections.companyAnalysis}
            </Section>

            <Section title="3. Promoter Background">
              {camSections.promoterBackground}
            </Section>

            <Section title="4. Financial Analysis">
              {camSections.financialAnalysis}
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { label: 'Revenue FY2024', value: '₹8.4 Cr', sub: '↓25% YoY', neg: true },
                  { label: 'DSCR', value: '0.82x', sub: 'Below 1.25x threshold', neg: true },
                  { label: 'D/E Ratio', value: '3.1x', sub: 'Sector median 1.8x', neg: true },
                ].map((m) => (
                  <div key={m.label} className="bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">{m.label}</p>
                    <p className="text-lg font-bold text-red-600 mt-0.5">{m.value}</p>
                    <p className="text-xs text-red-500">{m.sub}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="5. Industry Outlook">
              {camSections.industryOutlook}
            </Section>

            <Section title="6. Final Recommendation">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-sm font-bold uppercase tracking-wider">
                  ⚠ CONDITIONAL APPROVE
                </span>
              </div>
              {camSections.recommendation}
            </Section>

            {/* Signatures */}
            <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-6 text-center">
              {['Credit Analyst', 'Senior Underwriter', 'Credit Committee'].map((role) => (
                <div key={role}>
                  <div className="h-10 border-b border-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Action Panel ── */}
        <div className="w-56 shrink-0">
          <div className="sticky top-4 space-y-3">
            <div className="bg-white rounded-xl shadow-card p-4">
              <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">Actions</p>
              <div className="space-y-2">
                <button className="btn-primary w-full flex items-center justify-center gap-2 text-xs h-9">
                  <FileText size={14} />
                  Generate CAM
                </button>
                <button className="btn-secondary w-full flex items-center justify-center gap-2 text-xs h-9">
                  <Download size={14} />
                  Export PDF
                </button>
                <button className="btn-secondary w-full flex items-center justify-center gap-2 text-xs h-9">
                  <Printer size={14} />
                  Download Word
                </button>
                <button className="btn-primary w-full flex items-center justify-center gap-2 text-xs h-9 mt-4">
                  <Send size={14} />
                  Send to Committee
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-4">
              <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Report Status</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Financial Analysis', done: true },
                  { label: 'Promoter Check', done: true },
                  { label: 'GST Reconciliation', done: true },
                  { label: 'Legal Screening', done: true },
                  { label: 'Committee Review', done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                      {item.done && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </div>
                    <p className={`text-xs ${item.done ? 'text-gray-600' : 'text-gray-400'}`}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

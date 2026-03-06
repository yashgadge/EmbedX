import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  ZoomIn, ZoomOut, Download, Send, AlertTriangle, RefreshCw,
  FileText as FileIcon,
} from 'lucide-react';
import { shapData, timelineEvents, networkNodes, networkEdges, researchFeed } from '../data/mockData';

/* ─── Gauge ──────────────────────────────────────────────────── */
function RiskGauge({ score = 42 }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  // Semicircle gauge: 180° arc
  const cx = 110, cy = 110, r = 80;
  const toRad = (deg) => (deg * Math.PI) / 180;

  const arcPath = (startDeg, endDeg, color) => {
    const x1 = cx + r * Math.cos(toRad(180 + startDeg));
    const y1 = cy + r * Math.sin(toRad(180 + startDeg));
    const x2 = cx + r * Math.cos(toRad(180 + endDeg));
    const y2 = cy + r * Math.sin(toRad(180 + endDeg));
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return (
      <path
        d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
      />
    );
  };

  // needle: score 0→100 maps to 0°→180°
  const needleAngle = (displayScore / 100) * 180;
  const needleRad = toRad(180 + needleAngle);
  const nx = cx + 68 * Math.cos(needleRad);
  const ny = cy + 68 * Math.sin(needleRad);

  const riskLabel = score >= 70 ? 'Low Risk' : score >= 50 ? 'Moderate Risk' : 'High Risk';
  const riskColor = score >= 70 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';

  return (
    <div className="flex flex-col items-center">
      <svg width={220} height={130} viewBox="0 0 220 130">
        {/* Background track */}
        {arcPath(0, 180, '#F1F5F9')}
        {/* Red zone 0-50 → 0°-90° */}
        {arcPath(0, 90, '#fca5a5')}
        {/* Amber zone 50-70 → 90°-126° */}
        {arcPath(90, 126, '#fcd34d')}
        {/* Green zone 70-100 → 126°-180° */}
        {arcPath(126, 180, '#86efac')}
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="#1E293B"
          strokeWidth={2.5}
          strokeLinecap="round"
          style={{ transition: 'all 0.8s ease-in-out' }}
        />
        <circle cx={cx} cy={cy} r={5} fill="#1E293B" />
        {/* Score labels */}
        <text x={18} y={118} fontSize={9} fill="#94a3b8" textAnchor="middle">0</text>
        <text x={110} y={26} fontSize={9} fill="#94a3b8" textAnchor="middle">50</text>
        <text x={202} y={118} fontSize={9} fill="#94a3b8" textAnchor="middle">100</text>
      </svg>
      <p className="text-4xl font-bold text-gray-900 -mt-2">{score}</p>
      <p className="text-sm font-semibold mt-0.5" style={{ color: riskColor }}>{riskLabel}</p>
      <p className="text-xs text-gray-400 mt-0.5">EmbedX Risk Score</p>
    </div>
  );
}

/* ─── Promoter Network ───────────────────────────────────────── */
function PromoterNetwork() {
  const nodeColors = { company: '#2563EB', director: '#94a3b8', flagged: '#ef4444' };

  return (
    <svg width="100%" height={200} viewBox="0 0 320 200">
      {networkEdges.map((edge, i) => {
        const from = networkNodes.find((n) => n.id === edge.from);
        const to = networkNodes.find((n) => n.id === edge.to);
        return (
          <line
            key={i}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke="#e2e8f0"
            strokeWidth={1.5}
          />
        );
      })}
      {networkNodes.map((node) => (
        <g key={node.id}>
          <circle
            cx={node.x} cy={node.y} r={22}
            fill={nodeColors[node.type] ?? '#94a3b8'}
            opacity={0.15}
          />
          <circle
            cx={node.x} cy={node.y} r={14}
            fill={nodeColors[node.type] ?? '#94a3b8'}
          />
          <text
            x={node.x} y={node.y + 28}
            textAnchor="middle"
            fontSize={9}
            fill="#64748b"
            fontFamily="Inter"
          >
            {node.label}
          </text>
        </g>
      ))}
      {/* Flagged indicator */}
      <circle cx={networkNodes[4].x + 12} cy={networkNodes[4].y - 12} r={5} fill="#ef4444" />
      <text
        x={networkNodes[4].x + 12} y={networkNodes[4].y - 8}
        textAnchor="middle" fontSize={8} fill="white" fontFamily="Inter" fontWeight="bold"
      >!</text>
    </svg>
  );
}

/* ─── SHAP Custom Tooltip ────────────────────────────────────── */
function ShapTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="font-medium text-gray-900">{payload[0].payload.feature}</p>
      <p className="text-gray-500 mt-0.5">Impact: <span className="font-semibold">{payload[0].value > 0 ? '+' : ''}{payload[0].value}</span></p>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
const DOC_TABS = ['Audited Financials', 'GSTR-3B', 'Bank Statements', 'Legal Notices'];

export default function UnderwritingWorkspace() {
  const [activeTab, setActiveTab] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [siteVisit, setSiteVisit] = useState('');

  return (
    <div className="p-4 animate-fade-in h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex gap-4 h-full">

        {/* ── Column 1: Source Documents ── */}
        <div className="w-[30%] flex flex-col gap-4">
          <div className="section-card flex-1 flex flex-col overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto shrink-0">
              {DOC_TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`tab-btn whitespace-nowrap ${activeTab === i ? 'active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* PDF placeholder */}
            <div className="flex-1 m-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center gap-3 min-h-0">
              <FileIcon size={40} className="text-gray-300" />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-400">Document Preview</p>
                <p className="text-xs text-gray-400 mt-0.5">{DOC_TABS[activeTab]}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 px-4 pb-4 shrink-0">
              <button className="btn-secondary flex items-center gap-1.5 h-9 px-3 text-xs flex-1">
                <ZoomIn size={13} /> Zoom In
              </button>
              <button className="btn-secondary flex items-center gap-1.5 h-9 px-3 text-xs flex-1">
                <ZoomOut size={13} /> Zoom Out
              </button>
              <button className="btn-secondary flex items-center gap-1.5 h-9 px-3 text-xs flex-1">
                <Download size={13} /> Download
              </button>
            </div>
          </div>
        </div>

        {/* ── Column 2: Risk Intelligence ── */}
        <div className="w-[40%] flex flex-col gap-4 overflow-y-auto pr-1">
          {/* Sector Ribbon */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg h-16 flex items-center gap-6 px-4 shrink-0">
            <div className="text-center">
              <p className="text-xs text-slate-400 leading-none">Agri Machinery</p>
              <p className="text-xs font-semibold text-emerald-600 mt-0.5">Index +2.3%</p>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-xs text-slate-400 leading-none">Steel Prices</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">₹68,400/MT</p>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div className="text-center">
              <p className="text-xs text-slate-400 leading-none">Sector Outlook</p>
              <p className="text-xs font-semibold text-amber-600 mt-0.5">Moderate</p>
            </div>
          </div>

          {/* Risk Score Gauge */}
          <div className="section-card p-4 flex items-center justify-center shrink-0">
            <RiskGauge score={42} />
          </div>

          {/* GST Alert */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-3 flex items-start gap-2 shrink-0">
            <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-red-700">GST vs Bank Variance Detected</p>
              <p className="text-xs text-red-600 mt-0.5">GSTR-3B vs bank receipts mismatch: <strong>25.7%</strong> — ₹42L discrepancy in FY2025-26.</p>
            </div>
          </div>

          {/* SHAP Chart */}
          <div className="section-card p-4 shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-3">SHAP Feature Importance</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={shapData}
                layout="vertical"
                margin={{ top: 0, right: 12, left: 4, bottom: 0 }}
              >
                <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  tick={{ fontSize: 10 }}
                  width={110}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ShapTooltip />} cursor={{ fill: '#F8FAFC' }} />
                <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                  {shapData.map((entry, index) => (
                    <Cell key={index} fill={entry.positive ? '#16a34a' : '#dc2626'} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Site Visit */}
          <div className="section-card p-4 shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-2">Site Visit Notes</p>
            <textarea
              value={siteVisit}
              onChange={(e) => setSiteVisit(e.target.value)}
              placeholder="Enter site visit observations, management meeting notes, collateral inspection findings…"
              className="w-full h-[100px] border border-gray-200 rounded-lg p-3 text-xs text-gray-700 resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
            />
            <button className="btn-primary mt-2 w-full flex items-center justify-center gap-2 text-xs h-9">
              <RefreshCw size={13} />
              Recalculate Risk Score
            </button>
          </div>
        </div>

        {/* ── Column 3: External Intelligence ── */}
        <div className="w-[30%] flex flex-col gap-4 overflow-y-auto">
          {/* Promoter Network */}
          <div className="section-card p-4 shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-2">Promoter Network Graph</p>
            <PromoterNetwork />
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />Company</span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />Director</span>
              <span className="flex items-center gap-1 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Flagged</span>
            </div>
          </div>

          {/* Risk Timeline */}
          <div className="section-card p-4 shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-3">Risk Timeline</p>
            <div className="relative pl-5">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-200" />
              {timelineEvents.map((evt, i) => (
                <div key={evt.id} className={`relative mb-4 ${i === timelineEvents.length - 1 ? 'mb-0' : ''}`}>
                  <div className="absolute left-[-14px] top-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                  <p className="text-[10px] text-gray-400 font-medium">{evt.date}</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">{evt.title}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Feed */}
          <div className="section-card p-4 shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-3">Research Feed</p>
            <div className="space-y-3">
              {researchFeed.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`badge-${item.tagColor} text-[10px]`}>{item.tag}</span>
                    <span className="text-[10px] text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-xs font-medium text-gray-800 leading-snug">{item.headline}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{item.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat */}
          <div className="section-card p-4 shrink-0">
            <p className="text-xs font-semibold text-gray-700 mb-2">Ask EmbedX AI</p>
            <div className="flex gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask EmbedX…"
                className="flex-1 h-11 border border-gray-200 rounded-lg px-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
                onKeyDown={(e) => { if (e.key === 'Enter') setChatInput(''); }}
              />
              <button
                onClick={() => setChatInput('')}
                className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200 shrink-0"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

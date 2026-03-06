import { Link } from 'react-router-dom';
import {
  ClipboardList,
  AlertTriangle,
  Clock,
  BarChart2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { applications, kpiData } from '../data/mockData';

const KPI_ICONS = [ClipboardList, AlertTriangle, Clock, BarChart2];
const KPI_COLORS = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
  red: { bg: 'bg-red-50', text: 'text-red-600' },
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  purple: { bg: 'bg-violet-50', text: 'text-violet-600' },
};

function scoreBadge(score) {
  if (score >= 70) return <span className="badge-green">{score}</span>;
  if (score >= 50) return <span className="badge-amber">{score}</span>;
  return <span className="badge-red">{score}</span>;
}

function statusBadge(status) {
  const map = {
    Approved: 'badge-green',
    'Under Review': 'badge-amber',
    'High Risk': 'badge-red',
    Pending: 'badge-blue',
  };
  return <span className={map[status] ?? 'badge-blue'}>{status}</span>;
}

function formatAmount(amount) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return `₹${amount.toLocaleString()}`;
}

export default function Dashboard() {
  return (
    <div className="p-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {kpiData.map((kpi, i) => {
          const Icon = KPI_ICONS[i];
          const colors = KPI_COLORS[kpi.color];
          const isPositiveTrend = kpi.trend === 'up';
          const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;
          const trendGood =
            (kpi.color === 'blue' && isPositiveTrend) ||
            (kpi.color === 'red' && !isPositiveTrend) ||
            (kpi.color === 'green' && !isPositiveTrend) ||
            (kpi.color === 'purple' && isPositiveTrend);

          return (
            <div key={kpi.label} className="kpi-card">
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider leading-tight">
                  {kpi.label}
                </p>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors.bg}`}>
                  <Icon size={18} className={colors.text} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">{kpi.value}</p>
              <div className={`flex items-center gap-1 text-xs font-medium ${trendGood ? 'text-emerald-600' : 'text-red-500'}`}>
                <TrendIcon size={13} />
                <span>{kpi.delta} vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Applications Table */}
      <div className="section-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Recent Applications</h2>
          <Link
            to="/applicant-directory"
            className="flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">App ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Amount</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">EmbedX Score</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50 transition-colors duration-100 cursor-pointer"
                >
                  <td className="px-6 py-3.5 font-mono text-xs text-blue-600 font-semibold">{app.id}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-900">{app.company}</td>
                  <td className="px-6 py-3.5 text-gray-500">{app.industry}</td>
                  <td className="px-6 py-3.5 text-right font-medium text-gray-900">{formatAmount(app.loanAmount)}</td>
                  <td className="px-6 py-3.5 text-center">{scoreBadge(app.score)}</td>
                  <td className="px-6 py-3.5 text-center">{statusBadge(app.status)}</td>
                  <td className="px-6 py-3.5 text-gray-500">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

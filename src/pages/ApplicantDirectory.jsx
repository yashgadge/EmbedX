import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { applications } from '../data/mockData';

const INDUSTRIES = ['All', 'Agriculture', 'Steel', 'Textile', 'FMCG', 'Real Estate', 'IT Services', 'Pharma', 'Manufacturing'];
const STATUSES = ['All', 'Approved', 'Under Review', 'High Risk', 'Pending'];

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

export default function ApplicantDirectory() {
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All');
  const [status, setStatus] = useState('All');

  const filtered = applications.filter((app) => {
    const matchSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.cin.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === 'All' || app.industry === industry;
    const matchStatus = status === 'All' || app.status === status;
    return matchSearch && matchIndustry && matchStatus;
  });

  return (
    <div className="p-6 animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company, ID, or CIN…"
            className="form-input pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="h-[42px] border border-gray-300 rounded-lg px-3 text-sm text-gray-700 bg-white outline-none focus:border-blue-500 transition-all"
          >
            {INDUSTRIES.map((ind) => <option key={ind}>{ind}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-gray-400" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-[42px] border border-gray-300 rounded-lg px-3 text-sm text-gray-700 bg-white outline-none focus:border-blue-500 transition-all"
          >
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="ml-auto text-sm text-gray-500">
          {filtered.length} record{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Table */}
      <div className="section-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">App ID</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">CIN</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Industry</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Amount</th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">EmbedX Score</th>
              <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">
                  No applications match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50 transition-colors duration-100 cursor-pointer"
                >
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-semibold">{app.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.company}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{app.cin}</td>
                  <td className="px-6 py-4 text-gray-500">{app.industry}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{formatAmount(app.loanAmount)}</td>
                  <td className="px-6 py-4 text-center">{scoreBadge(app.score)}</td>
                  <td className="px-6 py-4 text-center">{statusBadge(app.status)}</td>
                  <td className="px-6 py-4 text-gray-500">{app.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

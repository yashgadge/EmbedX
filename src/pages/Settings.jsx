import React, { useState } from 'react';
import {
  User, Bell, Shield, Key, Palette,
  Save, Eye, EyeOff, RefreshCw,
} from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'api-keys', label: 'API Keys', icon: Key },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

/* ─── Tab panels ──────────────────────────────────────────────── */
function ProfilePanel() {
  return (
    <div className="max-w-lg space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
          AK
        </div>
        <div>
          <p className="font-semibold text-gray-900">Arjun Kumar</p>
          <p className="text-sm text-gray-500">Senior Credit Analyst</p>
          <button className="text-xs text-blue-600 mt-1 hover:text-blue-700">Change photo</button>
        </div>
      </div>
      {[
        { label: 'Full Name', value: 'Arjun Kumar', type: 'text' },
        { label: 'Email Address', value: 'arjun.kumar@embedx.in', type: 'email' },
        { label: 'Job Title', value: 'Senior Credit Analyst', type: 'text' },
        { label: 'Department', value: 'Credit & Risk', type: 'text' },
      ].map(({ label, value, type }) => (
        <div key={label}>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">{label}</label>
          <input type={type} defaultValue={value} className="form-input" />
        </div>
      ))}
      <button className="btn-primary flex items-center gap-2 mt-2">
        <Save size={14} /> Save Profile
      </button>
    </div>
  );
}

function NotificationsPanel() {
  const items = [
    { label: 'New application submitted', desc: 'Get notified when a new credit application is submitted.', on: true },
    { label: 'High risk alert triggered', desc: 'Alert when EmbedX scores an application below 50.', on: true },
    { label: 'CAM report generated', desc: 'Notify when a CAM report is ready for review.', on: false },
    { label: 'Committee decision', desc: 'Get updates on credit committee approvals and rejections.', on: true },
    { label: 'Document upload complete', desc: 'Confirmation when all documents are processed.', on: false },
  ];

  const [states, setStates] = useState(items.map((i) => i.on));

  return (
    <div className="max-w-lg space-y-3">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex-1 pr-4">
            <p className="text-sm font-medium text-gray-900">{item.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
          </div>
          <button
            onClick={() => setStates((s) => s.map((v, j) => (j === i ? !v : v)))}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0 mt-0.5 ${states[i] ? 'bg-blue-600' : 'bg-gray-300'}`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${states[i] ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function SecurityPanel() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Current Password</label>
            <div className="relative">
              <input type={showOld ? 'text' : 'password'} placeholder="Enter current password" className="form-input pr-10" />
              <button onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showOld ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} placeholder="Minimum 12 characters" className="form-input pr-10" />
              <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Shield size={14} /> Update Password
          </button>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Two-Factor Authentication</h3>
        <p className="text-xs text-gray-500 mb-3">Secure your account with 2FA using an authenticator app.</p>
        <button className="btn-secondary flex items-center gap-2 text-sm">
          <Shield size={14} /> Enable 2FA
        </button>
      </div>
    </div>
  );
}

function ApiKeysPanel() {
  const keys = [
    { name: 'Production API Key', key: 'emx_live_sk_••••••••••••••••••••2b7f', created: 'Jan 10, 2026', last: '2 hours ago' },
    { name: 'Sandbox API Key', key: 'emx_test_sk_••••••••••••••••••••9d3c', created: 'Dec 5, 2025', last: '3 days ago' },
  ];

  return (
    <div className="max-w-xl space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">Manage API keys for integrating EmbedX with your systems.</p>
        <button className="btn-primary flex items-center gap-2 text-xs h-9">
          <Key size={13} /> New API Key
        </button>
      </div>
      {keys.map((k) => (
        <div key={k.name} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-gray-900">{k.name}</p>
            <button className="text-red-500 text-xs hover:text-red-700 font-medium">Revoke</button>
          </div>
          <p className="font-mono text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 mb-2">{k.key}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Created {k.created}</span>
            <span>Last used {k.last}</span>
            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium ml-auto">
              <RefreshCw size={11} /> Regenerate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState('light');
  const [density, setDensity] = useState('default');

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light', bg: 'bg-white border-gray-200' },
            { id: 'dark', label: 'Dark', bg: 'bg-gray-900 border-gray-700' },
            { id: 'system', label: 'System', bg: 'bg-gradient-to-br from-white to-gray-800 border-gray-400' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-4 rounded-xl border-2 text-sm font-medium transition-all ${theme === t.id ? 'border-blue-600' : 'border-gray-200'}`}
            >
              <div className={`w-full h-12 rounded-lg ${t.bg} border mb-2`} />
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Table Density</h3>
        <div className="space-y-2">
          {['compact', 'default', 'spacious'].map((d) => (
            <label key={d} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="density"
                value={d}
                checked={density === d}
                onChange={() => setDensity(d)}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-700 capitalize">{d}</span>
            </label>
          ))}
        </div>
      </div>
      <button className="btn-primary flex items-center gap-2">
        <Save size={14} /> Save Preferences
      </button>
    </div>
  );
}

const PANEL_MAP = {
  profile: ProfilePanel,
  notifications: NotificationsPanel,
  security: SecurityPanel,
  'api-keys': ApiKeysPanel,
  appearance: AppearancePanel,
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const ActivePanel = PANEL_MAP[activeTab];

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0">
          <div className="section-card overflow-hidden">
            {TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-4 h-12 text-sm font-medium transition-all duration-150 border-l-2
                  ${activeTab === id
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {React.createElement(icon, { size: 16 })}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="section-card p-6">
            <h2 className="text-base font-bold text-gray-900 mb-5">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>
            <ActivePanel />
          </div>
        </div>
      </div>
    </div>
  );
}

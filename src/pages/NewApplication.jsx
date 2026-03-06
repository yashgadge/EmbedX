import { useState, useRef } from 'react';
import { Upload, Play } from 'lucide-react';

const INDUSTRIES = [
  'Agriculture', 'Steel', 'Textile', 'FMCG',
  'Real Estate', 'IT Services', 'Pharma', 'Manufacturing',
];

const UPLOAD_ZONES = [
  { id: 'financials', label: 'Audited Financials (FY2023-24)' },
  { id: 'gst', label: 'GST Returns (GSTR-3B)' },
  { id: 'bank', label: 'Bank Statements (12 months)' },
  { id: 'legal', label: 'Legal / MCA Documents' },
];

function UploadZone({ label }) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`h-[120px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200
        ${isDragging
          ? 'border-blue-400 bg-blue-50'
          : fileName
            ? 'border-emerald-300 bg-emerald-50/40'
            : 'border-blue-200 bg-blue-50/30 hover:border-blue-300 hover:bg-blue-50/50'
        }`}
    >
      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />
      <Upload size={20} className={fileName ? 'text-emerald-500' : 'text-blue-400'} />
      <div className="text-center px-3">
        <p className="text-xs font-medium text-gray-600">{label}</p>
        {fileName
          ? <p className="text-xs text-emerald-600 mt-0.5 truncate max-w-[160px]">{fileName}</p>
          : <p className="text-xs text-gray-400 mt-0.5">Drop files here or click to upload</p>
        }
      </div>
    </div>
  );
}

export default function NewApplication() {
  const [form, setForm] = useState({
    companyName: '',
    cin: '',
    industry: '',
    loanAmount: '',
    email: '',
    promoter: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">New Credit Application</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in company details and upload documents to run the EmbedX Engine.</p>
        </div>

        <div className="space-y-6">
          {/* Company Details */}
          <div className="section-card p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              Company Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Agritech Ventures Pvt Ltd"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">CIN</label>
                <input
                  type="text"
                  name="cin"
                  value={form.cin}
                  onChange={handleChange}
                  placeholder="e.g. U01110MH2019PTC123456"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Industry Sector</label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select industry…</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Requested Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₹</span>
                  <input
                    type="number"
                    name="loanAmount"
                    value={form.loanAmount}
                    onChange={handleChange}
                    placeholder="0"
                    className="form-input pl-7"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Applicant Contact Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Promoter Name</label>
                <input
                  type="text"
                  name="promoter"
                  value={form.promoter}
                  onChange={handleChange}
                  placeholder="e.g. Rajiv Sharma"
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="section-card p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              Document Upload
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {UPLOAD_ZONES.map((zone) => (
                <UploadZone key={zone.id} label={zone.label} />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button className="btn-primary w-full flex items-center justify-center gap-2 text-base">
            <Play size={16} fill="white" />
            Run EmbedX Engine
          </button>
        </div>
      </div>
    </div>
  );
}

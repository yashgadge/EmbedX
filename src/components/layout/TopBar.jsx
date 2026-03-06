import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/new-application': 'New Application',
  '/underwriting': 'Underwriting Workspace',
  '/applicant-directory': 'Applicant Directory',
  '/cam-reports': 'CAM Reports',
  '/settings': 'Settings',
};

export default function TopBar() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? 'EmbedX';

  return (
    <header
      className="fixed top-0 left-60 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-6 z-20 gap-4"
    >
      {/* Page title */}
      <h1 className="text-gray-900 font-semibold text-lg flex-1">{title}</h1>

      {/* Search */}
      <div className="relative w-80">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search applications…"
          className="w-full h-9 pl-9 pr-3 text-sm border border-gray-200 rounded-lg bg-gray-50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
        />
      </div>

      {/* Bell */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors duration-200">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer select-none">
        <span className="text-white text-sm font-semibold">AK</span>
      </div>
    </header>
  );
}

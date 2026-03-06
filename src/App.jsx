import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import NewApplication from './pages/NewApplication';
import UnderwritingWorkspace from './pages/UnderwritingWorkspace';
import ApplicantDirectory from './pages/ApplicantDirectory';
import CamReport from './pages/CamReport';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="new-application" element={<NewApplication />} />
          <Route path="underwriting" element={<UnderwritingWorkspace />} />
          <Route path="applicant-directory" element={<ApplicantDirectory />} />
          <Route path="cam-reports" element={<CamReport />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

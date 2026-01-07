import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import Patient360 from './pages/Patient360';
import BillingReports from './pages/BillingReports';
import AdminRules from './pages/AdminRules';
import AdminSettings from './pages/AdminSettings';
import PatientMessages from './pages/PatientMessages';
import PatientSurveys from './pages/PatientSurveys';
import PatientMyCarePlan from './pages/PatientMyCarePlan';
import CarePlansList from './pages/CarePlansList';
import OutreachQueue from './pages/OutreachQueue';
import Scheduling from './pages/Scheduling';
import Signatures from './pages/Signatures';
import ReferralsManager from './pages/ReferralsManager';
import AuditLogs from './pages/AuditLogs';
import ProviderInbox from './pages/ProviderInbox';

function App() {
  return (
    <RoleProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/:id" element={<Patient360 />} />
            <Route path="/billing" element={<BillingReports />} />
            <Route path="/admin" element={<AdminRules />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            
            {/* Role Specific Routes */}
            <Route path="/care-plans" element={<CarePlansList />} />
            <Route path="/outreach" element={<OutreachQueue />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/signatures" element={<Signatures />} />
            <Route path="/referrals" element={<ReferralsManager />} />
            <Route path="/inbox" element={<ProviderInbox />} />
            
            {/* Patient Portal Routes */}
            <Route path="/messages" element={<PatientMessages />} />
            <Route path="/surveys" element={<PatientSurveys />} />
            <Route path="/my-plan" element={<PatientMyCarePlan />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </RoleProvider>
  );
}

export default App;

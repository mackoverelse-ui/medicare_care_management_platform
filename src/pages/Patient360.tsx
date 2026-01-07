import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  mockPatients, getCarePlan, getCareGaps, getCommunications, 
  getLabResults, getVitalSigns, getClinicalNotes, getDischargeTasks,
  getDocuments
} from '../data/mock';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { 
  User, Activity, FileText, Phone, Calendar, 
  AlertCircle, ChevronRight, CheckCircle2, Clock, 
  ShieldCheck, BrainCircuit, Download, Plus, MessageSquare,
  PhoneCall, Mail, AlertTriangle, XCircle, ArrowRight, PenTool,
  Database, RefreshCw, FileBarChart, Stethoscope, Share2, ClipboardList,
  Timer, File, Upload
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../context/RoleContext';
import { BillableActivity } from '../types';

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={clsx(
      "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
      active 
        ? "border-blue-600 text-blue-600" 
        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
    )}
  >
    <Icon size={16} />
    {label}
  </button>
);

export default function Patient360() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [planStatus, setPlanStatus] = useState('Pending Signature');
  
  // Time Tracking State
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [timeActivity, setTimeActivity] = useState('');
  const [timeDuration, setTimeDuration] = useState(15);
  const [billableItems, setBillableItems] = useState<BillableActivity[]>([
    { id: '1', date: 'Oct 24, 2023', activity: 'Care Plan Review & Update', durationMinutes: 15, provider: 'Sarah Jenkins, RN' },
    { id: '2', date: 'Oct 20, 2023', activity: 'Patient Outreach Call', durationMinutes: 12, provider: 'Sarah Jenkins, RN' }
  ]);
  
  const patient = mockPatients.find(p => p.id === id) || mockPatients[0];
  const carePlan = getCarePlan(patient.id);
  const careGaps = getCareGaps(patient.id);
  const communications = getCommunications(patient.id);
  const documents = getDocuments(patient.id);
  
  // EMR Data
  const labs = getLabResults(patient.id);
  const vitals = getVitalSigns(patient.id);
  const notes = getClinicalNotes(patient.id);
  
  // Coordination Data
  const dischargeTasks = getDischargeTasks(patient.id);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTab('care-plan');
    }, 2000);
  };

  const handleSignPlan = () => {
    if (confirm("Are you sure you want to electronically sign this care plan?")) {
      setPlanStatus('Active');
      alert("Care plan signed successfully.");
    }
  };

  const handleLogTime = () => {
    const newItem: BillableActivity = {
      id: Math.random().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      activity: timeActivity || 'General Coordination',
      durationMinutes: Number(timeDuration),
      provider: 'Sarah Jenkins, RN' // Hardcoded for prototype
    };
    setBillableItems([newItem, ...billableItems]);
    setIsTimeModalOpen(false);
    setTimeActivity('');
    setTimeDuration(15);
    alert("Time logged successfully.");
  };

  const totalBillableTime = billableItems.reduce((acc, item) => acc + item.durationMinutes, 0);

  if (!patient) return <div>Patient not found</div>;

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600">
              {patient.firstName[0]}{patient.lastName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{patient.lastName}, {patient.firstName}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                <span>DOB: {new Date(patient.dob).toLocaleDateString()}</span>
                <span>•</span>
                <span>MRN: {patient.mrn}</span>
                <span>•</span>
                <span>{patient.gender}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge variant={patient.riskLevel === 'Level 3' ? 'danger' : 'warning'}>{patient.riskLevel}</Badge>
                <Badge variant="neutral">Medicare Part B</Badge>
                {patient.billingEligible && <Badge variant="success">Billable This Month</Badge>}
                {patient.status === 'Post-Acute' && <Badge variant="warning">Post-Discharge</Badge>}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Risk Score (HCC)</p>
              <p className="text-2xl font-bold text-slate-900">{patient.riskScore}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsTimeModalOpen(true)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"
              >
                <Timer size={16} /> Log Time
              </button>
              
              {role === 'CARE_MANAGER' && (
                <button 
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                  {isGenerating ? (
                    <>
                      <BrainCircuit size={16} className="animate-pulse" />
                      AI Generating...
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={16} />
                      Update Care Plan
                    </>
                  )}
                </button>
              )}

              {role === 'PCP' && (
                <button 
                  onClick={handleSignPlan}
                  disabled={planStatus === 'Active'}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm",
                    planStatus === 'Active' 
                      ? "bg-emerald-100 text-emerald-700 cursor-default" 
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  )}
                >
                  {planStatus === 'Active' ? (
                    <>
                      <CheckCircle2 size={16} /> Signed
                    </>
                  ) : (
                    <>
                      <PenTool size={16} /> Sign & Approve
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white px-2 rounded-t-lg overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={User} label="Overview" />
          <TabButton active={activeTab === 'emr'} onClick={() => setActiveTab('emr')} icon={Database} label="EMR Data" />
          <TabButton active={activeTab === 'care-plan'} onClick={() => setActiveTab('care-plan')} icon={Activity} label="Care Plan" />
          <TabButton active={activeTab === 'coordination'} onClick={() => setActiveTab('coordination')} icon={Share2} label="Coordination" />
          <TabButton active={activeTab === 'gaps'} onClick={() => setActiveTab('gaps')} icon={AlertCircle} label="Care Gaps" />
          <TabButton active={activeTab === 'comms'} onClick={() => setActiveTab('comms')} icon={Phone} label="Communications" />
          <TabButton active={activeTab === 'documents'} onClick={() => setActiveTab('documents')} icon={File} label="Documents" />
          <TabButton active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} icon={FileText} label="Monthly Summary" />
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader title="Clinical Snapshot" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Active Conditions</h4>
                  <ul className="space-y-2">
                    {carePlan.conditions.map(c => (
                      <li key={c} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-blue-500" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Current Medications</h4>
                  <ul className="space-y-3">
                    {carePlan.medications.map(m => (
                      <li key={m.name} className="flex justify-between items-start text-sm">
                        <div>
                          <p className="font-medium text-slate-900">{m.name}</p>
                          <p className="text-slate-500">{m.dosage}</p>
                        </div>
                        <Badge variant={m.adherence > 90 ? 'success' : 'warning'}>{m.adherence}% Adherence</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Care Team" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{patient.pcp}</p>
                    <p className="text-xs text-slate-500">Primary Care Provider</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{patient.careManager}</p>
                    <p className="text-xs text-slate-500">Lead Care Manager</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Next Appointment</h4>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar size={20} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Annual Wellness Visit</p>
                    <p className="text-xs text-slate-500">{new Date(patient.nextDue).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ... EMR Tab (Existing) ... */}
        {activeTab === 'emr' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-md border border-slate-200 shadow-sm">
                   <Database size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Athena EMR Connection</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Sync Active • Last updated 2 mins ago
                  </p>
                </div>
              </div>
              <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                <RefreshCw size={14} /> Force Sync
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Labs Section */}
              <Card>
                <CardHeader title="Recent Lab Results" action={<FileBarChart size={18} className="text-slate-400" />} />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-2">Test</th>
                        <th className="px-4 py-2">Value</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {labs.map(lab => (
                        <tr key={lab.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-900">{lab.testName}</td>
                          <td className="px-4 py-3">
                            {lab.value} <span className="text-slate-400 text-xs">{lab.unit}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{new Date(lab.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <Badge variant={lab.status === 'Abnormal' ? 'warning' : lab.status === 'Critical' ? 'danger' : 'neutral'}>
                              {lab.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Vitals Section */}
              <Card>
                <CardHeader title="Vitals History" action={<Activity size={18} className="text-slate-400" />} />
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <p className="text-xs text-blue-600 font-bold uppercase">BP</p>
                      <p className="text-xl font-bold text-slate-900">{vitals.find(v => v.type === 'BP')?.value}</p>
                      <p className="text-xs text-slate-500">{vitals.find(v => v.type === 'BP')?.unit}</p>
                    </div>
                    <div className="p-3 bg-rose-50 rounded-lg text-center">
                      <p className="text-xs text-rose-600 font-bold uppercase">HR</p>
                      <p className="text-xl font-bold text-slate-900">{vitals.find(v => v.type === 'HR')?.value}</p>
                      <p className="text-xs text-slate-500">{vitals.find(v => v.type === 'HR')?.unit}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg text-center">
                      <p className="text-xs text-emerald-600 font-bold uppercase">Weight</p>
                      <p className="text-xl font-bold text-slate-900">{vitals.find(v => v.type === 'Weight')?.value}</p>
                      <p className="text-xs text-slate-500">{vitals.find(v => v.type === 'Weight')?.unit}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-500 mb-2">Previous Readings</h4>
                    <div className="space-y-2">
                      {vitals.slice(3).map(v => (
                        <div key={v.id} className="flex justify-between text-sm">
                          <span className="text-slate-600">{new Date(v.date).toLocaleDateString()}</span>
                          <span className="font-medium text-slate-900">{v.type}: {v.value} {v.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Clinical Notes */}
            <Card>
              <CardHeader title="Clinical Notes (SOAP)" action={<Stethoscope size={18} className="text-slate-400" />} />
              <div className="space-y-4 divide-y divide-slate-100">
                {notes.map(note => (
                  <div key={note.id} className="pt-4 first:pt-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{note.type}</h4>
                        <p className="text-xs text-slate-500">By {note.provider}</p>
                      </div>
                      <span className="text-xs text-slate-400">{new Date(note.date).toLocaleDateString()}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-md border border-slate-100 text-sm text-slate-700 font-mono whitespace-pre-wrap">
                      {note.content}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ... Care Plan Tab (Existing) ... */}
        {activeTab === 'care-plan' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-3">
                <BrainCircuit className="text-blue-600" size={24} />
                <div>
                  <h3 className="text-sm font-bold text-blue-900">AI-Enhanced Care Plan</h3>
                  <p className="text-xs text-blue-700">Generated based on recent lab results, EMR notes, and claims data.</p>
                </div>
              </div>
              <div className="flex gap-2">
                 {role === 'CARE_MANAGER' && (
                   <button className="px-3 py-1.5 bg-white text-blue-700 text-xs font-medium rounded border border-blue-200 shadow-sm hover:bg-blue-50">
                    Edit Manually
                   </button>
                 )}
                 {role === 'PCP' ? (
                    <button 
                      onClick={handleSignPlan}
                      disabled={planStatus === 'Active'}
                      className={clsx(
                        "px-3 py-1.5 text-xs font-medium rounded shadow-sm flex items-center gap-1",
                        planStatus === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-emerald-600 text-white hover:bg-emerald-700"
                      )}
                    >
                      {planStatus === 'Active' ? <CheckCircle2 size={12} /> : <PenTool size={12} />}
                      {planStatus === 'Active' ? 'Signed' : 'Sign & Approve'}
                    </button>
                 ) : (
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded shadow-sm hover:bg-blue-700">
                      Submit for Signature
                    </button>
                 )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader title="Patient Goals" />
                <div className="space-y-4">
                  {carePlan.goals.map(goal => (
                    <div key={goal.id} className="p-3 border border-slate-100 rounded-lg flex items-center justify-between">
                      <p className="text-sm text-slate-700">{goal.text}</p>
                      <Badge variant={goal.status === 'On Track' ? 'success' : goal.status === 'At Risk' ? 'warning' : 'default'}>
                        {goal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <CardHeader title="Interventions" />
                 <div className="space-y-4">
                  {carePlan.interventions.map(int => (
                    <div key={int.id} className="p-3 border border-slate-100 rounded-lg">
                      <p className="text-sm font-medium text-slate-900">{int.text}</p>
                      <p className="text-xs text-slate-500 mt-1">Assignee: {int.assignee}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* --- COORDINATION TAB --- */}
        {activeTab === 'coordination' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Transitional Care Management (TCM) Section */}
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader title="Transitional Care Management (Post-Discharge)" action={<Badge variant="warning">TCM Active</Badge>} />
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  Patient discharged from <strong>Mercy Hospital</strong> on {new Date().toLocaleDateString()}. 
                  TCM 7-day follow-up window closes in 3 days.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dischargeTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "w-5 h-5 rounded-full flex items-center justify-center border",
                          task.status === 'Completed' ? "bg-emerald-100 border-emerald-500 text-emerald-600" : "bg-white border-slate-300"
                        )}>
                          {task.status === 'Completed' && <CheckCircle2 size={12} />}
                        </div>
                        <span className={clsx("text-sm font-medium", task.status === 'Completed' ? "text-slate-500 line-through" : "text-slate-900")}>
                          {task.task}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Referrals Section */}
            <Card>
              <CardHeader title="Active Referrals" action={<button className="text-sm text-blue-600 font-medium flex items-center gap-1"><Plus size={16} /> Add Referral</button>} />
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2">Specialty</th>
                      <th className="px-4 py-2">Provider</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Last Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-3 font-medium">Cardiology</td>
                      <td className="px-4 py-3">Dr. Sarah Smith</td>
                      <td className="px-4 py-3"><Badge variant="default">Scheduled</Badge></td>
                      <td className="px-4 py-3 text-slate-500">Oct 24, 2023</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Nutrition</td>
                      <td className="px-4 py-3">Pending Assignment</td>
                      <td className="px-4 py-3"><Badge variant="warning">Pending Auth</Badge></td>
                      <td className="px-4 py-3 text-slate-500">Oct 20, 2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ... Gaps Tab (Existing) ... */}
        {activeTab === 'gaps' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
             <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-100 rounded-lg text-amber-900">
                <AlertTriangle size={24} className="text-amber-600" />
                <div>
                  <h3 className="text-sm font-bold">Action Required</h3>
                  <p className="text-xs mt-0.5">2 High Priority gaps identified. Closing these may improve risk adjustment score.</p>
                </div>
             </div>

             <Card>
               <CardHeader title="Active Care Gaps" />
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                       <th className="px-6 py-3">Gap Name</th>
                       <th className="px-6 py-3">Category</th>
                       <th className="px-6 py-3">Due Date</th>
                       <th className="px-6 py-3">Priority</th>
                       <th className="px-6 py-3">Status</th>
                       <th className="px-6 py-3 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {careGaps.map(gap => (
                       <tr key={gap.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4">
                           <p className="font-medium text-slate-900">{gap.title}</p>
                           <p className="text-xs text-slate-500">{gap.description}</p>
                         </td>
                         <td className="px-6 py-4">
                           <Badge variant="neutral">{gap.category}</Badge>
                         </td>
                         <td className="px-6 py-4 text-slate-600">
                           {new Date(gap.dueDate).toLocaleDateString()}
                         </td>
                         <td className="px-6 py-4">
                           <span className={clsx(
                             "font-medium",
                             gap.priority === 'High' ? "text-rose-600" : "text-slate-600"
                           )}>
                             {gap.priority}
                           </span>
                         </td>
                         <td className="px-6 py-4">
                           {gap.status === 'Open' ? (
                             <Badge variant="danger">Open</Badge>
                           ) : (
                             <Badge variant="success">Closed</Badge>
                           )}
                         </td>
                         <td className="px-6 py-4 text-right">
                           {role !== 'ADMIN' && (
                             <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                               Resolve
                             </button>
                           )}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </Card>
          </motion.div>
        )}

        {/* ... Comms Tab (Existing) ... */}
        {activeTab === 'comms' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Communication Timeline</h2>
              {role !== 'ADMIN' && (
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <Plus size={16} /> Log Interaction
                </button>
              )}
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
              {communications.map((comm) => (
                <div key={comm.id} className="relative">
                  {/* Timeline Dot */}
                  <div className={clsx(
                    "absolute -left-[31px] top-0 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center",
                    comm.type === 'Call' ? "bg-blue-100 text-blue-600" :
                    comm.type === 'SMS' ? "bg-purple-100 text-purple-600" :
                    "bg-emerald-100 text-emerald-600"
                  )}>
                    {comm.type === 'Call' && <PhoneCall size={14} />}
                    {comm.type === 'SMS' && <MessageSquare size={14} />}
                    {comm.type === 'Portal' && <Mail size={14} />}
                  </div>

                  <Card className="ml-2" noPadding>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-semibold text-slate-900">{comm.type} </span>
                          <span className="text-slate-500 text-sm">• {comm.direction}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(comm.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 mb-3">{comm.summary}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1">
                          <User size={12} /> {comm.performedBy}
                        </span>
                        {comm.durationMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {comm.durationMinutes} mins
                          </span>
                        )}
                        {comm.outcome && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-500" /> {comm.outcome}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- DOCUMENTS TAB (NEW) --- */}
        {activeTab === 'documents' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-900">Patient Documents</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Upload size={16} /> Upload Document
              </button>
            </div>

            <Card noPadding>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3">Document Name</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3">Uploaded By</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map(doc => (
                      <tr key={doc.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded text-slate-500">
                              <File size={16} />
                            </div>
                            <span className="font-medium text-slate-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4"><Badge variant="neutral">{doc.type}</Badge></td>
                        <td className="px-6 py-4 text-slate-600">{new Date(doc.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.size}</td>
                        <td className="px-6 py-4 text-slate-600">{doc.uploadedBy}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:underline text-xs font-medium">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ... Billing Tab (Existing) ... */}
        {activeTab === 'billing' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <Card>
               <CardHeader title="Monthly Billing Summary (CPT 99490)" action={
                 <button className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                   <Download size={16} /> Export PDF
                 </button>
               } />
               
               <div className="space-y-6">
                 <div className={clsx(
                   "flex items-center gap-4 p-4 border rounded-lg",
                   totalBillableTime >= 20 ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
                 )}>
                   {totalBillableTime >= 20 ? <CheckCircle2 className="text-emerald-600" size={24} /> : <Clock className="text-amber-600" size={24} />}
                   <div>
                     <h3 className={clsx("text-sm font-bold", totalBillableTime >= 20 ? "text-emerald-900" : "text-amber-900")}>
                       {totalBillableTime >= 20 ? "Audit Ready" : "Time Requirement Not Met"}
                     </h3>
                     <p className={clsx("text-xs", totalBillableTime >= 20 ? "text-emerald-700" : "text-amber-700")}>
                       {totalBillableTime >= 20 
                         ? "All requirements for CCM Level 1 met for current month." 
                         : `Current: ${totalBillableTime} mins. Target: 20 mins.`}
                     </p>
                   </div>
                 </div>

                 <div className="border rounded-lg overflow-hidden">
                   <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-500 font-medium">
                       <tr>
                         <th className="px-4 py-2">Date</th>
                         <th className="px-4 py-2">Activity</th>
                         <th className="px-4 py-2">Duration</th>
                         <th className="px-4 py-2">Provider</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       {billableItems.map((item) => (
                         <tr key={item.id}>
                           <td className="px-4 py-3">{item.date}</td>
                           <td className="px-4 py-3">{item.activity}</td>
                           <td className="px-4 py-3">{item.durationMinutes} min</td>
                           <td className="px-4 py-3">{item.provider}</td>
                         </tr>
                       ))}
                     </tbody>
                     <tfoot className="bg-slate-50 font-semibold">
                        <tr>
                          <td colSpan={2} className="px-4 py-3 text-right">Total Billable Time:</td>
                          <td className="px-4 py-3 text-blue-600">{totalBillableTime} min</td>
                          <td></td>
                        </tr>
                     </tfoot>
                   </table>
                 </div>
               </div>
             </Card>
          </motion.div>
        )}
      </div>

      {/* Time Tracking Modal */}
      <Modal 
        isOpen={isTimeModalOpen} 
        onClose={() => setIsTimeModalOpen(false)} 
        title="Log Billable Time (CCM)"
        footer={
          <div className="flex gap-2 justify-end w-full">
            <button 
              onClick={() => setIsTimeModalOpen(false)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleLogTime}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save Entry
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Activity Type</label>
            <select 
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeActivity}
              onChange={(e) => setTimeActivity(e.target.value)}
            >
              <option value="">Select activity...</option>
              <option value="Care Plan Review & Update">Care Plan Review & Update</option>
              <option value="Patient Outreach Call">Patient Outreach Call</option>
              <option value="Coordination with Specialist">Coordination with Specialist</option>
              <option value="Medication Reconciliation">Medication Reconciliation</option>
              <option value="Social Determinants Assessment">Social Determinants Assessment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Minutes)</label>
            <input 
              type="number" 
              min="1"
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeDuration}
              onChange={(e) => setTimeDuration(Number(e.target.value))}
            />
            <p className="text-xs text-slate-500 mt-1">Minimum 20 mins total required for 99490 billing.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
            <textarea 
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe the clinical nature of the activity..."
            ></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}

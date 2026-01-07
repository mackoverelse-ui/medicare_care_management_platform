export type Role = 'CARE_MANAGER' | 'PCP' | 'ADMIN' | 'PATIENT' | 'COORDINATOR';

export type RiskLevel = 'Level 1' | 'Level 2' | 'Level 3';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  mrn: string; // Medical Record Number
  riskScore: number; // HCC Score
  riskLevel: RiskLevel;
  status: 'Active' | 'On Hold' | 'Discharged' | 'Post-Acute';
  lastContact: string;
  nextDue: string;
  primaryCondition: string;
  careManager: string;
  pcp: string;
  insurance: string;
  billingEligible: boolean;
  careGaps: number;
  phone: string;
  email: string;
}

export interface CarePlan {
  id: string;
  patientId: string;
  status: 'Draft' | 'Pending Signature' | 'Active' | 'Archived';
  lastUpdated: string;
  conditions: string[];
  goals: { id: string; text: string; status: 'On Track' | 'At Risk' | 'Completed' }[];
  interventions: { id: string; text: string; assignee: string }[];
  medications: { name: string; dosage: string; adherence: number }[];
}

export interface Metric {
  label: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  color?: 'blue' | 'green' | 'red' | 'yellow';
}

export interface CareGap {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'Closed' | 'Excluded';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category: 'Screening' | 'Medication' | 'Lab';
}

export interface CommunicationEvent {
  id: string;
  type: 'Call' | 'SMS' | 'Portal' | 'In-Person' | 'Email';
  direction: 'Inbound' | 'Outbound';
  timestamp: string;
  summary: string;
  performedBy: string;
  durationMinutes?: number;
  outcome?: string;
}

export interface BillingStat {
  month: string;
  readyToBill: number;
  submitted: number;
  paid: number;
  denied: number;
  revenue: number;
}

export interface Survey {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
  questions: number;
  estimatedTime: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: Role;
  email: string;
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

// --- EMR Specific Types ---

export interface LabResult {
  id: string;
  testName: string;
  value: string;
  unit: string;
  date: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  referenceRange: string;
}

export interface VitalSign {
  id: string;
  type: 'BP' | 'HR' | 'Weight' | 'Temp' | 'SpO2';
  value: string;
  unit: string;
  date: string;
}

export interface ClinicalNote {
  id: string;
  date: string;
  provider: string;
  type: 'SOAP' | 'Discharge Summary' | 'Consult';
  content: string;
}

// --- New Types for Enhancements ---

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  specialty: string;
  provider: string; // The specialist
  status: 'Pending Auth' | 'Scheduled' | 'Completed' | 'Report Received';
  priority: 'Urgent' | 'Routine';
  dateOrdered: string;
  notes: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: Role;
  action: string;
  resource: string; // e.g., "Patient: John Doe"
  ipAddress: string;
}

export interface DischargeTask {
  id: string;
  task: string;
  status: 'Pending' | 'Completed';
  dueDate: string;
}

export interface PatientDocument {
  id: string;
  name: string;
  type: 'Lab Report' | 'Discharge Summary' | 'Insurance' | 'Consent' | 'Other';
  date: string;
  size: string;
  uploadedBy: string;
}

export interface MessageThread {
  id: number;
  patientId: string;
  patientName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'Active' | 'Archived';
}

export interface BillableActivity {
  id: string;
  date: string;
  activity: string;
  durationMinutes: number;
  provider: string;
}

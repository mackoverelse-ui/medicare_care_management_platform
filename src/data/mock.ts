import { faker } from '@faker-js/faker';
import { 
  Patient, CarePlan, CareGap, CommunicationEvent, BillingStat, 
  LabResult, VitalSign, ClinicalNote, Referral, AuditLog, DischargeTask,
  PatientDocument, MessageThread
} from '../types';

export const generatePatients = (count: number): Patient[] => {
  return Array.from({ length: count }).map(() => {
    const riskScore = faker.number.float({ min: 0.5, max: 4.5, fractionDigits: 2 });
    let riskLevel: 'Level 1' | 'Level 2' | 'Level 3' = 'Level 1';
    if (riskScore > 1.5) riskLevel = 'Level 2';
    if (riskScore > 2.5) riskLevel = 'Level 3';

    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: faker.date.birthdate({ min: 65, max: 90, mode: 'age' }).toISOString().split('T')[0],
      gender: faker.person.sexType(),
      mrn: faker.string.numeric(8),
      riskScore,
      riskLevel,
      status: faker.helpers.arrayElement(['Active', 'Active', 'Active', 'On Hold', 'Post-Acute']),
      lastContact: faker.date.recent({ days: 14 }).toISOString(),
      nextDue: faker.date.soon({ days: 7 }).toISOString(),
      primaryCondition: faker.helpers.arrayElement(['Hypertension', 'Diabetes Type 2', 'CHF', 'COPD', 'CKD']),
      careManager: 'Sarah Jenkins, RN',
      pcp: 'Dr. Michael Chen',
      insurance: 'Medicare Part B',
      billingEligible: faker.datatype.boolean(),
      careGaps: faker.number.int({ min: 0, max: 3 }),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    };
  });
};

export const mockPatients = generatePatients(25);

export const getCarePlan = (patientId: string): CarePlan => ({
  id: faker.string.uuid(),
  patientId,
  status: 'Active',
  lastUpdated: faker.date.recent({ days: 5 }).toISOString(),
  conditions: ['Hypertension', 'Hyperlipidemia', 'Osteoarthritis'],
  goals: [
    { id: '1', text: 'Maintain BP under 130/80', status: 'On Track' },
    { id: '2', text: 'Reduce BMI by 2 points', status: 'At Risk' },
    { id: '3', text: 'Complete annual wellness visit', status: 'Completed' },
  ],
  interventions: [
    { id: '1', text: 'Weekly tele-monitoring of BP', assignee: 'Care Manager' },
    { id: '2', text: 'Nutritionist referral', assignee: 'Coordinator' },
  ],
  medications: [
    { name: 'Lisinopril', dosage: '10mg Daily', adherence: 95 },
    { name: 'Atorvastatin', dosage: '20mg Nightly', adherence: 80 },
  ],
});

export const getCareGaps = (patientId: string): CareGap[] => [
  {
    id: '1',
    title: 'Breast Cancer Screening',
    description: 'Mammogram overdue by 3 months',
    status: 'Open',
    dueDate: faker.date.recent({ days: 30 }).toISOString(),
    priority: 'High',
    category: 'Screening'
  },
  {
    id: '2',
    title: 'HbA1c Control',
    description: 'Last reading > 9.0%',
    status: 'Open',
    dueDate: faker.date.soon({ days: 14 }).toISOString(),
    priority: 'High',
    category: 'Lab'
  },
  {
    id: '3',
    title: 'Statin Therapy',
    description: 'Patient with CVD not on statin',
    status: 'Closed',
    dueDate: faker.date.past().toISOString(),
    priority: 'Medium',
    category: 'Medication'
  }
];

export const getCommunications = (patientId: string): CommunicationEvent[] => [
  {
    id: '1',
    type: 'Call',
    direction: 'Outbound',
    timestamp: faker.date.recent({ days: 1 }).toISOString(),
    summary: 'Monthly check-in. Patient reports stable BP. Reviewed medication adherence.',
    performedBy: 'Sarah Jenkins, RN',
    durationMinutes: 15,
    outcome: 'Successful'
  },
  {
    id: '2',
    type: 'SMS',
    direction: 'Inbound',
    timestamp: faker.date.recent({ days: 3 }).toISOString(),
    summary: 'Confirming appointment for next Tuesday.',
    performedBy: 'Patient',
  },
  {
    id: '3',
    type: 'Portal',
    direction: 'Outbound',
    timestamp: faker.date.recent({ days: 7 }).toISOString(),
    summary: 'Sent lab order requisition for upcoming blood work.',
    performedBy: 'Dr. Michael Chen',
  }
];

export const billingStats: BillingStat[] = [
  { month: 'Oct', readyToBill: 145, submitted: 140, paid: 132, denied: 8, revenue: 5600 },
  { month: 'Nov', readyToBill: 152, submitted: 148, paid: 145, denied: 3, revenue: 6100 },
  { month: 'Dec', readyToBill: 160, submitted: 155, paid: 150, denied: 5, revenue: 6400 },
  { month: 'Jan', readyToBill: 120, submitted: 45, paid: 0, denied: 0, revenue: 1800 }, // Current month
];

// --- EMR Mock Data Generators ---

export const getLabResults = (patientId: string): LabResult[] => [
  {
    id: '1',
    testName: 'Hemoglobin A1c',
    value: '7.2',
    unit: '%',
    date: faker.date.recent({ days: 30 }).toISOString(),
    status: 'Abnormal',
    referenceRange: '< 5.7%'
  },
  {
    id: '2',
    testName: 'Lipid Panel - LDL',
    value: '110',
    unit: 'mg/dL',
    date: faker.date.recent({ days: 30 }).toISOString(),
    status: 'Abnormal',
    referenceRange: '< 100 mg/dL'
  },
  {
    id: '3',
    testName: 'Comprehensive Metabolic Panel',
    value: 'Normal',
    unit: '',
    date: faker.date.recent({ days: 30 }).toISOString(),
    status: 'Normal',
    referenceRange: 'N/A'
  },
  {
    id: '4',
    testName: 'Hemoglobin A1c',
    value: '7.5',
    unit: '%',
    date: faker.date.past({ years: 1 }).toISOString(),
    status: 'Abnormal',
    referenceRange: '< 5.7%'
  }
];

export const getVitalSigns = (patientId: string): VitalSign[] => [
  { id: '1', type: 'BP', value: '128/82', unit: 'mmHg', date: faker.date.recent({ days: 2 }).toISOString() },
  { id: '2', type: 'Weight', value: '185', unit: 'lbs', date: faker.date.recent({ days: 2 }).toISOString() },
  { id: '3', type: 'HR', value: '72', unit: 'bpm', date: faker.date.recent({ days: 2 }).toISOString() },
  { id: '4', type: 'BP', value: '135/88', unit: 'mmHg', date: faker.date.recent({ days: 14 }).toISOString() },
  { id: '5', type: 'Weight', value: '187', unit: 'lbs', date: faker.date.recent({ days: 14 }).toISOString() },
];

export const getClinicalNotes = (patientId: string): ClinicalNote[] => [
  {
    id: '1',
    date: faker.date.recent({ days: 45 }).toISOString(),
    provider: 'Dr. Michael Chen',
    type: 'SOAP',
    content: 'S: Patient presents for follow-up of hypertension. Reports good adherence to Lisinopril. No dizziness or headaches.\nO: BP 128/82. HR 72. Lungs clear to auscultation. No edema.\nA: Hypertension, stable. Hyperlipidemia, uncontrolled.\nP: Continue Lisinopril 10mg. Increase Atorvastatin to 20mg. Recheck lipids in 3 months.'
  },
  {
    id: '2',
    date: faker.date.past({ years: 1 }).toISOString(),
    provider: 'Dr. Sarah Smith (Cardiology)',
    type: 'Consult',
    content: 'Cardiology Consult: Patient evaluated for occasional palpitations. Holter monitor ordered. Echocardiogram shows mild LVH. Recommending lifestyle modifications and weight loss.'
  }
];

// --- New Mock Data ---

export const mockReferrals: Referral[] = Array.from({ length: 10 }).map(() => ({
  id: faker.string.uuid(),
  patientId: faker.string.uuid(),
  patientName: `${faker.person.lastName()}, ${faker.person.firstName()}`,
  specialty: faker.helpers.arrayElement(['Cardiology', 'Endocrinology', 'Podiatry', 'Ophthalmology', 'Nutrition']),
  provider: `Dr. ${faker.person.lastName()}`,
  status: faker.helpers.arrayElement(['Pending Auth', 'Scheduled', 'Completed', 'Report Received']),
  priority: faker.helpers.arrayElement(['Routine', 'Routine', 'Urgent']),
  dateOrdered: faker.date.recent({ days: 30 }).toISOString(),
  notes: faker.lorem.sentence(),
}));

export const mockAuditLogs: AuditLog[] = Array.from({ length: 20 }).map(() => ({
  id: faker.string.uuid(),
  timestamp: faker.date.recent({ days: 2 }).toISOString(),
  user: faker.helpers.arrayElement(['Sarah Jenkins, RN', 'Dr. Michael Chen', 'Alex Lee']),
  role: faker.helpers.arrayElement(['CARE_MANAGER', 'PCP', 'COORDINATOR']),
  action: faker.helpers.arrayElement(['Viewed Patient Record', 'Updated Care Plan', 'Exported Billing Report', 'Signed Note', 'Viewed Lab Results']),
  resource: `Patient: ${faker.person.lastName()}, ${faker.person.firstName()}`,
  ipAddress: faker.internet.ipv4(),
}));

export const getDischargeTasks = (patientId: string): DischargeTask[] => [
  { id: '1', task: 'Medication Reconciliation', status: 'Pending', dueDate: faker.date.soon({ days: 2 }).toISOString() },
  { id: '2', task: 'Schedule PCP Follow-up (7-day)', status: 'Completed', dueDate: faker.date.recent({ days: 1 }).toISOString() },
  { id: '3', task: 'Review Discharge Summary', status: 'Pending', dueDate: faker.date.soon({ days: 1 }).toISOString() },
  { id: '4', task: 'Coordinate Home Health', status: 'Pending', dueDate: faker.date.soon({ days: 3 }).toISOString() },
];

export const getDocuments = (patientId: string): PatientDocument[] => [
  { id: '1', name: 'Hospital Discharge Summary', type: 'Discharge Summary', date: faker.date.recent({ days: 5 }).toISOString(), size: '2.4 MB', uploadedBy: 'System' },
  { id: '2', name: 'Lab Results - CBC/CMP', type: 'Lab Report', date: faker.date.recent({ days: 10 }).toISOString(), size: '1.1 MB', uploadedBy: 'LabCorp' },
  { id: '3', name: 'Annual Wellness Visit Note', type: 'Other', date: faker.date.past({ years: 1 }).toISOString(), size: '0.8 MB', uploadedBy: 'Dr. Chen' },
];

export const getProviderThreads = (): MessageThread[] => [
  { id: 1, patientId: 'p1', patientName: 'Doe, Jane', lastMessage: 'I have a question about my new medication.', timestamp: '10:30 AM', unreadCount: 1, status: 'Active' },
  { id: 2, patientId: 'p2', patientName: 'Smith, John', lastMessage: 'Thanks for the update.', timestamp: 'Yesterday', unreadCount: 0, status: 'Active' },
  { id: 3, patientId: 'p3', patientName: 'Williams, Mary', lastMessage: 'Appointment confirmed.', timestamp: 'Oct 20', unreadCount: 0, status: 'Active' },
  { id: 4, patientId: 'p4', patientName: 'Brown, Robert', lastMessage: 'Can we reschedule?', timestamp: 'Oct 18', unreadCount: 2, status: 'Active' },
];

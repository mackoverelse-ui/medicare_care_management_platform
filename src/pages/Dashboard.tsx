import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  ArrowUpRight, ArrowDownRight, Users, AlertTriangle, CheckCircle, 
  Clock, DollarSign, FileCheck, Stethoscope, Calendar, Pill, Activity,
  ChevronRight, Phone, Truck, CalendarCheck, BrainCircuit
} from 'lucide-react';
import { useRole } from '../context/RoleContext';
import { Link, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

const StatCard = ({ title, value, trend, trendValue, icon: Icon, color, to }: any) => {
  const CardContent = (
    <Card className={clsx("flex flex-col justify-between h-32 transition-all hover:shadow-md cursor-pointer", to && "hover:border-blue-300")}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-center text-xs mt-4">
        {trend === 'up' ? (
          <ArrowUpRight size={14} className="text-emerald-500 mr-1" />
        ) : trend === 'down' ? (
          <ArrowDownRight size={14} className="text-rose-500 mr-1" />
        ) : null}
        <span className={trend === 'up' ? 'text-emerald-600 font-medium' : trend === 'down' ? 'text-rose-600 font-medium' : 'text-slate-500'}>
          {trendValue}
        </span>
        {trend && <span className="text-slate-400 ml-1">vs last month</span>}
      </div>
    </Card>
  );

  return to ? <Link to={to}>{CardContent}</Link> : CardContent;
};

export default function Dashboard() {
  const { role } = useRole();
  const navigate = useNavigate();

  // --- Charts Configuration ---
  const riskOption = {
    tooltip: { trigger: 'item' },
    legend: { bottom: '0%', left: 'center' },
    series: [
      {
        name: 'Risk Level',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
        data: [
          { value: 1048, name: 'Level 1 (Low)', itemStyle: { color: '#3b82f6' } },
          { value: 735, name: 'Level 2 (Med)', itemStyle: { color: '#f59e0b' } },
          { value: 580, name: 'Level 3 (High)', itemStyle: { color: '#ef4444' } },
        ],
      },
    ],
  };

  const outreachOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Completed Calls',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 3, color: '#10b981' },
        areaStyle: { opacity: 0.1, color: '#10b981' },
        data: [12, 18, 15, 25, 22, 10, 5],
      },
      {
        name: 'Pending Tasks',
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 3, color: '#6366f1' },
        data: [5, 8, 12, 6, 8, 2, 1],
      },
    ],
  };

  const revenueOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['Oct', 'Nov', 'Dec', 'Jan'] },
    yAxis: { type: 'value' },
    series: [{
      data: [5600, 6100, 6400, 1800],
      type: 'bar',
      itemStyle: { color: '#8b5cf6' }
    }]
  };

  // --- Role Specific Content ---

  if (role === 'PATIENT') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-blue-100 opacity-90">You have 2 pending tasks and 1 new message from Dr. Chen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Next Appointment" value="Oct 24" trendValue="10:00 AM" icon={Calendar} color="blue" to="/my-plan" />
          <StatCard title="Medication Adherence" value="95%" trend="up" trendValue="+2%" icon={Pill} color="emerald" to="/my-plan" />
          <StatCard title="Blood Pressure" value="128/82" trendValue="Stable" icon={Activity} color="rose" to="/my-plan" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="My Active Goals" action={<Link to="/my-plan" className="text-sm text-blue-600 hover:underline">View Plan</Link>} />
            <div className="space-y-3">
              {[
                { text: "Maintain BP under 130/80", status: "On Track", color: "emerald" },
                { text: "Reduce BMI by 2 points", status: "At Risk", color: "amber" },
                { text: "Complete annual wellness visit", status: "Completed", color: "blue" }
              ].map((goal, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full bg-${goal.color}-500`}></div>
                    <span className="text-sm font-medium text-slate-700">{goal.text}</span>
                  </div>
                  <Badge variant={goal.status === 'On Track' || goal.status === 'Completed' ? 'success' : 'warning'}>
                    {goal.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Action Items" />
            <div className="space-y-4">
              <div className="p-3 border border-blue-100 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full text-blue-600 shadow-sm">
                    <FileCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900">Weekly Symptom Survey</h4>
                    <p className="text-xs text-blue-700 mt-1">Due Today • 5 mins</p>
                    <Link to="/surveys" className="mt-2 inline-block text-xs font-semibold text-blue-600 hover:underline">Start Survey →</Link>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate('/messages')}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">Lab Results Available</h4>
                    <p className="text-xs text-slate-500">CBC Panel • Yesterday</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (role === 'COORDINATOR') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Coordinator Dashboard</h1>
          <p className="text-slate-500">Logistics, scheduling, and patient outreach.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Outreach Calls" value="24" trend="up" trendValue="Due Today" icon={Phone} color="blue" to="/outreach" />
          <StatCard title="Pending Referrals" value="8" trend="down" trendValue="-2" icon={FileCheck} color="amber" to="/outreach" />
          <StatCard title="Transport Requests" value="3" trend="up" trendValue="+1" icon={Truck} color="purple" to="/outreach" />
          <StatCard title="Appts to Schedule" value="12" trend="up" trendValue="+4" icon={CalendarCheck} color="emerald" to="/scheduling" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Today's Outreach Queue" action={<Link to="/outreach"><Badge variant="outline" className="cursor-pointer">View All</Badge></Link>} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-4 py-2">Patient</th>
                    <th className="px-4 py-2">Reason</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Wilson, James', reason: 'Post-Discharge Follow-up', status: 'Urgent' },
                    { name: 'Garcia, Maria', reason: 'Medication Adherence Check', status: 'Pending' },
                    { name: 'Smith, Robert', reason: 'Schedule Annual Wellness', status: 'Pending' },
                  ].map((task, i) => (
                    <tr key={i} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate('/outreach')}>
                      <td className="px-4 py-3 font-medium">{task.name}</td>
                      <td className="px-4 py-3">{task.reason}</td>
                      <td className="px-4 py-3">
                        <Badge variant={task.status === 'Urgent' ? 'danger' : 'neutral'}>{task.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 font-medium hover:underline flex items-center gap-1">
                          <Phone size={14} /> Call
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <Card>
            <CardHeader title="Referral Tracking" />
            <div className="space-y-4">
              {[
                { specialty: "Cardiology", patient: "Doe, Jane", status: "Waiting for Appt" },
                { specialty: "Nutrition", patient: "Brown, Charlie", status: "Scheduled" },
                { specialty: "Podiatry", patient: "Davis, Susan", status: "Pending Auth" },
              ].map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{ref.specialty}</p>
                    <p className="text-xs text-slate-500">{ref.patient}</p>
                  </div>
                  <Badge variant="outline">{ref.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (role === 'PCP') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dr. Chen's Dashboard</h1>
          <p className="text-slate-500">Clinical oversight and care plan approvals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="My Panel Size" value="842" trend="up" trendValue="+2%" icon={Users} color="blue" to="/patients" />
          <StatCard title="Pending Signatures" value="12" trend="up" trendValue="+5" icon={FileCheck} color="amber" to="/signatures" />
          <StatCard title="High Risk (L3)" value="45" trend="down" trendValue="-2" icon={AlertTriangle} color="rose" to="/patients" />
          <StatCard title="Hospital Discharges" value="3" trend="up" trendValue="New" icon={Stethoscope} color="purple" to="/patients" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader title="Pending Care Plan Approvals" action={<Link to="/signatures" className="text-sm text-blue-600">View All</Link>} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-4 py-2">Patient</th>
                    <th className="px-4 py-2">Risk</th>
                    <th className="px-4 py-2">Last Updated</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3].map(i => (
                    <tr key={i} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate('/signatures')}>
                      <td className="px-4 py-3 font-medium">Doe, Jane</td>
                      <td className="px-4 py-3"><Badge variant="warning">Level 2</Badge></td>
                      <td className="px-4 py-3 text-slate-500">Today, 9:00 AM</td>
                      <td className="px-4 py-3">
                        <button className="text-blue-600 font-medium hover:underline">Review & Sign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card>
            <CardHeader title="Risk Stratification" />
            <ReactECharts option={riskOption} style={{ height: '300px' }} />
          </Card>
        </div>
      </div>
    );
  }

  if (role === 'ADMIN') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500">Program performance, billing, and compliance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue (YTD)" value="$142k" trend="up" trendValue="+15%" icon={DollarSign} color="emerald" to="/billing" />
          <StatCard title="Active Patients" value="2,345" trend="up" trendValue="+12%" icon={Users} color="blue" to="/patients" />
          <StatCard title="Audit Flags" value="4" trend="down" trendValue="-2" icon={AlertTriangle} color="rose" to="/billing" />
          <StatCard title="Claims Denied" value="1.2%" trend="down" trendValue="-0.5%" icon={FileCheck} color="amber" to="/billing" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="Revenue Trends" />
            <ReactECharts option={revenueOption} style={{ height: '300px' }} />
          </Card>
          <Card>
            <CardHeader title="Population Risk" action={<Link to="/admin" className="text-sm text-blue-600">View Rules</Link>} />
            <ReactECharts option={riskOption} style={{ height: '300px' }} />
          </Card>
        </div>
      </div>
    );
  }

  // Default: CARE_MANAGER
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Care Manager Dashboard</h1>
        <p className="text-slate-500">Overview of your patient population and daily tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Patients" value="2,345" trend="up" trendValue="+12%" icon={Users} color="blue" to="/patients" />
        <StatCard title="High Risk (L3)" value="142" trend="up" trendValue="+4%" icon={AlertTriangle} color="rose" to="/patients" />
        <StatCard title="Care Gaps Closed" value="86%" trend="up" trendValue="+2.4%" icon={CheckCircle} color="emerald" to="/care-plans" />
        <StatCard title="Pending Reviews" value="18" trend="down" trendValue="-5" icon={Clock} color="amber" to="/care-plans" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader title="Weekly Outreach & Task Volume" />
          <ReactECharts option={outreachOption} style={{ height: '300px' }} />
        </Card>
        <Card>
          <CardHeader title="Patient Risk Distribution" />
          <ReactECharts option={riskOption} style={{ height: '300px' }} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card noPadding>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Urgent Tasks</h3>
            <Badge variant="warning">5 Pending</Badge>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between group cursor-pointer transition-colors" onClick={() => navigate('/care-plans')}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Post-Discharge Follow-up</p>
                    <p className="text-xs text-slate-500">James Wilson • Medicare L3</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Start
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card noPadding>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Recent Care Plan Approvals</h3>
            <Link to="/care-plans" className="text-xs text-blue-600 font-medium">View All</Link>
          </div>
          <div className="divide-y divide-slate-100">
             {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 hover:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Jane Doe</p>
                    <p className="text-xs text-slate-500">Signed by Dr. Chen</p>
                  </div>
                </div>
                <Badge variant="success">Approved</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

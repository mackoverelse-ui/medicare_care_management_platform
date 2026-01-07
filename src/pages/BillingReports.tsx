import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { billingStats } from '../data/mock';
import { DollarSign, FileCheck, AlertOctagon, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <Card className="flex items-center p-6">
    <div className={`p-3 rounded-full bg-${color}-50 text-${color}-600 mr-4`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
  </Card>
);

export default function BillingReports() {
  const chartOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { type: 'category', data: billingStats.map(s => s.month) },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Submitted',
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        data: billingStats.map(s => s.submitted),
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Paid',
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        data: billingStats.map(s => s.paid),
        itemStyle: { color: '#10b981' }
      },
      {
        name: 'Denied',
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        data: billingStats.map(s => s.denied),
        itemStyle: { color: '#ef4444' }
      }
    ]
  };

  const revenueOption = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: billingStats.map(s => s.month) },
    yAxis: { type: 'value', axisLabel: { formatter: '${value}' } },
    series: [{
      data: billingStats.map(s => s.revenue),
      type: 'line',
      smooth: true,
      lineStyle: { color: '#8b5cf6', width: 4 },
      areaStyle: { color: '#8b5cf6', opacity: 0.1 }
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Billing & Compliance</h1>
        <p className="text-slate-500">Track CCM revenue, claim status, and audit readiness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Est. Revenue (MTD)" value="$12,450" subtext="Current Month" icon={DollarSign} color="emerald" />
        <StatCard title="Claims Submitted" value="482" subtext="Last 30 Days" icon={FileCheck} color="blue" />
        <StatCard title="Denial Rate" value="1.2%" subtext="Below 5% Target" icon={AlertOctagon} color="rose" />
        <StatCard title="Ready to Bill" value="145" subtext="Patients Met Criteria" icon={TrendingUp} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Claims Status Overview" />
          <ReactECharts option={chartOption} style={{ height: '300px' }} />
        </Card>
        <Card>
          <CardHeader title="Revenue Trend" />
          <ReactECharts option={revenueOption} style={{ height: '300px' }} />
        </Card>
      </div>

      <Card>
        <CardHeader title="Patients Ready for Billing (January)" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Minutes</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">Smith, John</td>
                  <td className="px-6 py-4">99490 (CCM 20min)</td>
                  <td className="px-6 py-4">25 min</td>
                  <td className="px-6 py-4"><Badge variant="success">Audit Ready</Badge></td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50">
                      Submit Claim
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

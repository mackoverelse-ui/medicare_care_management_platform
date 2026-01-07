import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockPatients } from '../data/mock';
import { Search, Filter, FileText, Edit3, Send, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function CarePlansList() {
  const [filter, setFilter] = useState('All');

  // Mocking care plan statuses based on patient data for demo
  const plans = mockPatients.map((p, i) => ({
    ...p,
    planStatus: i % 3 === 0 ? 'Draft' : i % 3 === 1 ? 'Pending Signature' : 'Active',
    lastUpdated: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString()
  }));

  const filteredPlans = filter === 'All' ? plans : plans.filter(p => p.planStatus === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Care Plans Manager</h1>
          <p className="text-slate-500">Review, edit, and submit care plans for provider signature.</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Draft', 'Pending Signature', 'Active'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                filter === f 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Risk Level</th>
                <th className="px-6 py-3">Last Updated</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Primary Condition</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{plan.lastName}, {plan.firstName}</div>
                    <div className="text-xs text-slate-500">MRN: {plan.mrn}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={plan.riskLevel === 'Level 3' ? 'danger' : plan.riskLevel === 'Level 2' ? 'warning' : 'success'}>
                      {plan.riskLevel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{plan.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      plan.planStatus === 'Active' ? 'success' : 
                      plan.planStatus === 'Pending Signature' ? 'warning' : 'neutral'
                    }>
                      {plan.planStatus}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{plan.primaryCondition}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/patients/${plan.id}`}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                        title="View Patient"
                      >
                        <FileText size={18} />
                      </Link>
                      {plan.planStatus === 'Draft' && (
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full" title="Submit for Signature">
                          <Send size={18} />
                        </button>
                      )}
                    </div>
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

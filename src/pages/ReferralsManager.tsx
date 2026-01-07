import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockReferrals } from '../data/mock';
import { Share2, Filter, Plus, Search, MoreHorizontal, FileCheck, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

export default function ReferralsManager() {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredReferrals = filterStatus === 'All' 
    ? mockReferrals 
    : mockReferrals.filter(r => r.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Referral Management</h1>
          <p className="text-slate-500">Track and coordinate specialist referrals.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm">
          <Plus size={16} /> New Referral
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Pending Auth', 'Scheduled', 'Report Received', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              filterStatus === status 
                ? "bg-white border border-blue-200 text-blue-700 shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanban-style Columns for larger screens or just a list */}
        <div className="lg:col-span-3">
          <Card noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Specialty / Provider</th>
                    <th className="px-6 py-3">Priority</th>
                    <th className="px-6 py-3">Date Ordered</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReferrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{ref.patientName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{ref.specialty}</div>
                        <div className="text-xs text-slate-500">{ref.provider}</div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={ref.priority === 'Urgent' ? 'danger' : 'neutral'}>
                          {ref.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(ref.dateOrdered).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={
                          ref.status === 'Report Received' ? 'success' :
                          ref.status === 'Scheduled' ? 'default' :
                          'warning'
                        }>
                          {ref.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 p-1">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

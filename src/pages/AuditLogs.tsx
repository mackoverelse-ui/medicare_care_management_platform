import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockAuditLogs } from '../data/mock';
import { ShieldAlert, Download, Search, Filter } from 'lucide-react';

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit & Compliance Logs</h1>
          <p className="text-slate-500">System-wide access logs for HIPAA compliance monitoring.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 shadow-sm">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <Card noPadding>
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by user, action, or resource..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50">
            <Filter size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Resource Accessed</th>
                <th className="px-6 py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-600 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{log.role}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                    {log.ipAddress}
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

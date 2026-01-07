import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockPatients } from '../data/mock';
import { Search, Filter, MoreHorizontal, ChevronRight } from 'lucide-react';

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(p => 
    p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.mrn.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Registry</h1>
          <p className="text-slate-500">Manage enrollment, risk levels, and care gaps.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2">
            <Filter size={16} />
            Filters
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
            Add Patient
          </button>
        </div>
      </div>

      <Card noPadding className="overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, MRN, or condition..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Patient Name</th>
                <th className="px-6 py-3">Risk Level</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Contact</th>
                <th className="px-6 py-3">Care Gaps</th>
                <th className="px-6 py-3">Billing</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium text-xs">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </div>
                      <div>
                        <Link to={`/patients/${patient.id}`} className="font-medium text-slate-900 hover:text-blue-600">
                          {patient.lastName}, {patient.firstName}
                        </Link>
                        <p className="text-xs text-slate-500">MRN: {patient.mrn}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      patient.riskLevel === 'Level 3' ? 'danger' : 
                      patient.riskLevel === 'Level 2' ? 'warning' : 'success'
                    }>
                      {patient.riskLevel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex items-center gap-1.5",
                      patient.status === 'Active' ? "text-emerald-600" : "text-slate-500"
                    )}>
                      <span className={clsx("w-1.5 h-1.5 rounded-full", patient.status === 'Active' ? "bg-emerald-500" : "bg-slate-400")}></span>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(patient.lastContact).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {patient.careGaps > 0 ? (
                      <span className="text-rose-600 font-medium flex items-center gap-1">
                        {patient.careGaps} Open
                      </span>
                    ) : (
                      <span className="text-emerald-600 flex items-center gap-1">
                         None
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {patient.billingEligible ? (
                      <Badge variant="neutral">Eligible</Badge>
                    ) : (
                      <Badge variant="outline">Ineligible</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/patients/${patient.id}`} className="text-slate-400 hover:text-blue-600">
                      <ChevronRight size={20} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <span>Showing {filteredPatients.length} patients</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

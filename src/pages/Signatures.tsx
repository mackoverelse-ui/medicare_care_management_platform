import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockPatients } from '../data/mock';
import { FileText, CheckCircle2, Clock, ChevronRight, PenTool } from 'lucide-react';

export default function Signatures() {
  const [selected, setSelected] = useState<string[]>([]);
  
  // Filter patients who hypothetically need signatures
  const pendingPatients = mockPatients.slice(0, 5).map(p => ({
    ...p,
    submittedDate: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(),
    submittedBy: 'Sarah Jenkins, RN'
  }));

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSignAll = () => {
    alert(`Signed ${selected.length} care plans successfully.`);
    setSelected([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pending Signatures</h1>
          <p className="text-slate-500">Review and e-sign care plans submitted by your care team.</p>
        </div>
        {selected.length > 0 && (
          <button 
            onClick={handleSignAll}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"
          >
            <PenTool size={18} />
            Sign Selected ({selected.length})
          </button>
        )}
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 w-12">
                  <input 
                    type="checkbox" 
                    className="rounded text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) setSelected(pendingPatients.map(p => p.id));
                      else setSelected([]);
                    }}
                    checked={selected.length === pendingPatients.length && pendingPatients.length > 0}
                  />
                </th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Risk</th>
                <th className="px-6 py-3">Submitted</th>
                <th className="px-6 py-3">Submitted By</th>
                <th className="px-6 py-3">Changes</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingPatients.map((patient) => (
                <tr key={patient.id} className={selected.includes(patient.id) ? "bg-blue-50/50" : "hover:bg-slate-50"}>
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      className="rounded text-blue-600 focus:ring-blue-500"
                      checked={selected.includes(patient.id)}
                      onChange={() => toggleSelect(patient.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{patient.lastName}, {patient.firstName}</div>
                    <div className="text-xs text-slate-500">MRN: {patient.mrn}</div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={patient.riskLevel === 'Level 3' ? 'danger' : 'warning'}>
                      {patient.riskLevel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-slate-400" /> {patient.submittedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{patient.submittedBy}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      Medication Update
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/patients/${patient.id}`} className="text-blue-600 font-medium hover:underline text-xs flex items-center justify-end gap-1">
                      Review <ChevronRight size={14} />
                    </Link>
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

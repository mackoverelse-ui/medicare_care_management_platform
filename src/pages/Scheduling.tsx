import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus } from 'lucide-react';

export default function Scheduling() {
  const appointments = [
    { id: 1, time: "09:00 AM", patient: "Doe, Jane", type: "Annual Wellness Visit", provider: "Dr. Chen", status: "Confirmed" },
    { id: 2, time: "10:30 AM", patient: "Smith, John", type: "Follow-up (Hypertension)", provider: "Dr. Chen", status: "Confirmed" },
    { id: 3, time: "01:00 PM", patient: "Williams, Mary", type: "New Patient Intake", provider: "Sarah Jenkins, RN", status: "Tentative" },
    { id: 4, time: "02:45 PM", patient: "Brown, Robert", type: "Care Plan Review", provider: "Sarah Jenkins, RN", status: "Confirmed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scheduling</h1>
          <p className="text-slate-500">Manage appointments and provider availability.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <div className="p-4">
            <h3 className="font-bold text-slate-900 mb-4">October 2023</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
              <span className="text-slate-400">S</span>
              <span className="text-slate-400">M</span>
              <span className="text-slate-400">T</span>
              <span className="text-slate-400">W</span>
              <span className="text-slate-400">T</span>
              <span className="text-slate-400">F</span>
              <span className="text-slate-400">S</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {[...Array(31)].map((_, i) => (
                <button 
                  key={i} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${i + 1 === 24 ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 text-slate-700'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 p-4">
            <h4 className="font-bold text-slate-900 text-sm mb-3">Filters</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" /> Dr. Chen
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" /> Sarah Jenkins, RN
              </label>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon size={20} className="text-blue-600" /> Tuesday, Oct 24
          </h3>
          
          {appointments.map((appt) => (
            <div key={appt.id} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors">
              <div className="w-24 flex flex-col items-center justify-center border-r border-slate-100 pr-4">
                <span className="text-lg font-bold text-slate-900">{appt.time.split(' ')[0]}</span>
                <span className="text-xs text-slate-500">{appt.time.split(' ')[1]}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{appt.patient}</h4>
                    <p className="text-slate-600 font-medium">{appt.type}</p>
                  </div>
                  <Badge variant={appt.status === 'Confirmed' ? 'success' : 'warning'}>{appt.status}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><User size={14} /> {appt.provider}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> Exam Room 2</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> 30 min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

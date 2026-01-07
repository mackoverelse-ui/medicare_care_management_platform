import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Phone, Calendar, Clock, CheckCircle2, MoreHorizontal, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function OutreachQueue() {
  const [tasks, setTasks] = useState([
    { id: 1, type: 'Call', patient: 'Wilson, James', reason: 'Post-Discharge Follow-up', due: 'Today', priority: 'High', status: 'Pending' },
    { id: 2, type: 'Call', patient: 'Garcia, Maria', reason: 'Medication Adherence Check', due: 'Today', priority: 'Medium', status: 'Pending' },
    { id: 3, type: 'Schedule', patient: 'Smith, Robert', reason: 'Annual Wellness Visit', due: 'Tomorrow', priority: 'Low', status: 'Pending' },
    { id: 4, type: 'Referral', patient: 'Johnson, Lisa', reason: 'Cardiology Referral Auth', due: 'Overdue', priority: 'High', status: 'Pending' },
    { id: 5, type: 'Call', patient: 'Brown, Charlie', reason: 'Monthly Check-in', due: 'Today', priority: 'Medium', status: 'Completed' },
  ]);

  const handleComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: 'Completed' } : t));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Outreach Queue</h1>
          <p className="text-slate-500">Daily tasks, calls, and coordination items.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex text-sm">
            <button className="px-3 py-1 bg-slate-100 font-medium rounded text-slate-900">List View</button>
            <button className="px-3 py-1 text-slate-500 hover:text-slate-900">Calendar</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {tasks.filter(t => t.status === 'Pending').map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={clsx(
                    "p-3 rounded-full",
                    task.type === 'Call' ? "bg-blue-50 text-blue-600" :
                    task.type === 'Schedule' ? "bg-emerald-50 text-emerald-600" :
                    "bg-purple-50 text-purple-600"
                  )}>
                    {task.type === 'Call' ? <Phone size={20} /> : 
                     task.type === 'Schedule' ? <Calendar size={20} /> : 
                     <CheckCircle2 size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{task.patient}</h3>
                      {task.due === 'Overdue' && (
                        <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                          <AlertCircle size={12} /> Overdue
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 font-medium">{task.reason}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={14} /> Due: {task.due}</span>
                      <span>•</span>
                      <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'neutral'}>
                        {task.priority} Priority
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleComplete(task.id)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm"
                  >
                    Start Task
                  </button>
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50">
                    Snooze
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {tasks.filter(t => t.status === 'Completed').length > 0 && (
            <div className="pt-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Completed Today</h3>
              <div className="space-y-2 opacity-75">
                {tasks.filter(t => t.status === 'Completed').map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-slate-500 line-through">{task.patient} - {task.reason}</span>
                    </div>
                    <span className="text-xs text-slate-400">Completed</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Quick Stats</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Tasks Remaining</span>
                <span className="font-bold text-slate-900">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">High Priority</span>
                <span className="font-bold text-rose-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Completion Rate</span>
                <span className="font-bold text-emerald-600">20%</span>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-600 text-white">
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">Coordinator Tips</h3>
              <p className="text-blue-100 text-sm">
                Remember to document all "Unsuccessful" call attempts. 3 attempts are required before moving a patient to "Unable to Contact".
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

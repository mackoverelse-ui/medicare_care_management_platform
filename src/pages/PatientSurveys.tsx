import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ClipboardList, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function PatientSurveys() {
  const surveys = [
    { id: 1, title: "Weekly Symptom Check", due: "Today", time: "5 mins", status: "Pending", priority: "High" },
    { id: 2, title: "PHQ-9 (Mood Assessment)", due: "Oct 28", time: "10 mins", status: "Pending", priority: "Medium" },
    { id: 3, title: "Social Needs Assessment", due: "Oct 15", time: "15 mins", status: "Completed", priority: "Low" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Health Surveys</h1>
        <p className="text-slate-500">Please complete these assessments to help us track your progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {surveys.map(survey => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${survey.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {survey.status === 'Completed' ? <CheckCircle2 size={24} /> : <ClipboardList size={24} />}
              </div>
              <Badge variant={survey.status === 'Completed' ? 'success' : survey.priority === 'High' ? 'danger' : 'neutral'}>
                {survey.status === 'Completed' ? 'Completed' : `Due: ${survey.due}`}
              </Badge>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-1">{survey.title}</h3>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1"><Clock size={14} /> {survey.time}</span>
              <span>•</span>
              <span>12 Questions</span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              {survey.status === 'Completed' ? (
                <span className="text-sm font-medium text-emerald-600">View Results</span>
              ) : (
                <span className="text-sm font-medium text-blue-600 group-hover:underline flex items-center gap-1">
                  Start Survey <ChevronRight size={16} />
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

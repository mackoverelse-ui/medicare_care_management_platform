import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function PatientMyCarePlan() {
  const goals = [
    { id: 1, text: "Maintain BP under 130/80", status: "On Track", progress: 80 },
    { id: 2, text: "Reduce BMI by 2 points", status: "At Risk", progress: 40 },
    { id: 3, text: "Complete annual wellness visit", status: "Completed", progress: 100 },
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg Daily", instructions: "Take in the morning with food", time: "8:00 AM" },
    { name: "Atorvastatin", dosage: "20mg Nightly", instructions: "Take before bed", time: "9:00 PM" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Care Plan</h1>
        <p className="text-slate-500">Your personalized health goals and daily routine.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Health Goals" />
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-900">{goal.text}</span>
                  <Badge variant={goal.status === 'On Track' || goal.status === 'Completed' ? 'success' : 'warning'}>
                    {goal.status}
                  </Badge>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${goal.status === 'At Risk' ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Daily Medications" />
          <div className="space-y-4">
            {medications.map((med, i) => (
              <div key={i} className="flex items-start gap-4 p-3 border border-slate-100 rounded-lg">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-slate-900">{med.name}</h4>
                    <span className="text-xs font-semibold text-slate-500">{med.time}</span>
                  </div>
                  <p className="text-sm text-slate-600">{med.dosage}</p>
                  <p className="text-xs text-slate-400 mt-1">{med.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Care Team Notes" />
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-700">
          <p className="font-medium mb-1">From Sarah Jenkins, RN:</p>
          <p>"Great job on your blood pressure logs this week, John! Keep avoiding high-sodium foods. Let's discuss your exercise routine during our call next Tuesday."</p>
        </div>
      </Card>
    </div>
  );
}

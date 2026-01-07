import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { GitBranch, Shield, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

const LogicBlock = ({ title, children, type = 'condition' }: any) => (
  <div className={`p-4 rounded-lg border ${type === 'result' ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 shadow-sm'} mb-4 relative`}>
    <h4 className={`text-xs font-bold uppercase mb-2 ${type === 'result' ? 'text-emerald-700' : 'text-slate-500'}`}>{title}</h4>
    <div className="text-sm font-medium text-slate-900">{children}</div>
    {type !== 'result' && (
      <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-slate-300 -ml-px z-0"></div>
    )}
  </div>
);

export default function AdminRules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Automation Rules Engine</h1>
        <p className="text-slate-500">Visualize and manage clinical logic for eligibility and risk stratification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Eligibility Logic */}
        <Card className="relative overflow-visible">
          <CardHeader title="CCM Eligibility Logic" action={<Badge variant="outline">Active</Badge>} />
          
          <div className="flex flex-col items-center max-w-md mx-auto py-4">
            <LogicBlock title="Trigger">
              Patient Enrollment or Annual Update
            </LogicBlock>
            
            <div className="h-4"></div>

            <LogicBlock title="Condition 1">
              Has Medicare Part B Coverage?
            </LogicBlock>

            <div className="h-4"></div>

            <LogicBlock title="Condition 2">
              Has 2+ Chronic Conditions lasting &gt;12 months?
            </LogicBlock>

            <div className="h-4"></div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="text-center">
                <div className="inline-block p-2 bg-rose-50 text-rose-700 rounded text-xs font-bold mb-2">FALSE</div>
                <div className="p-3 bg-slate-100 rounded border border-slate-200 text-slate-500 text-sm">
                  Ineligible
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block p-2 bg-emerald-50 text-emerald-700 rounded text-xs font-bold mb-2">TRUE</div>
                <LogicBlock title="Outcome" type="result">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} /> Flag as CCM Eligible
                  </div>
                </LogicBlock>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Stratification Logic */}
        <Card>
          <CardHeader title="Risk Stratification (Levels 1-3)" action={<Badge variant="outline">v2.4</Badge>} />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">Low Risk (Level 1)</h4>
                <p className="text-sm text-slate-600">HCC Score &lt; 1.5 <span className="font-bold text-slate-400 mx-1">OR</span> 0 Hospitalizations in 12mo</p>
              </div>
              <ArrowRight className="text-slate-300" />
              <Badge variant="default">Quarterly Review</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border border-amber-200 rounded-lg bg-amber-50">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">Moderate Risk (Level 2)</h4>
                <p className="text-sm text-slate-600">HCC Score 1.5 - 2.5 <span className="font-bold text-slate-400 mx-1">OR</span> 1 Hospitalization</p>
              </div>
              <ArrowRight className="text-amber-300" />
              <Badge variant="warning">Monthly Review</Badge>
            </div>

            <div className="flex items-center gap-4 p-4 border border-rose-200 rounded-lg bg-rose-50">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">High Risk (Level 3)</h4>
                <p className="text-sm text-slate-600">HCC Score &gt; 2.5 <span className="font-bold text-slate-400 mx-1">OR</span> 2+ Hospitalizations</p>
              </div>
              <ArrowRight className="text-rose-300" />
              <Badge variant="danger">Bi-Weekly Review</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

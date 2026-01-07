import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Activity, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Stethoscope, 
  BarChart3, 
  Users, 
  BrainCircuit
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-blue-600">
              <Stethoscope size={28} strokeWidth={2.5} />
              <span className="text-xl font-bold tracking-tight text-slate-900">MediCare<span className="text-blue-600">Sync</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#compliance" className="hover:text-blue-600 transition-colors">Compliance</a>
              <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">Log in</Link>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            New: AI-Powered Care Plans
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Automate Medicare <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Care Management</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
            Streamline CCM, RPM, and PCM workflows. Generate audit-ready documentation, 
            close care gaps, and maximize reimbursement with our intelligent platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-base font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight size={20} />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Activity size={20} className="text-slate-400" /> View Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70">
            <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck size={24} /> HEALTH<span className="font-light">SECURE</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><Activity size={24} /> MED<span className="font-light">CORE</span></div>
            <div className="flex items-center gap-2 font-bold text-xl"><Users size={24} /> CLINIC<span className="font-light">FLOW</span></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to scale Care Management</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Replace spreadsheets and disjointed tools with a single, unified platform designed for value-based care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "AI Risk Stratification",
                desc: "Automatically identify high-risk patients using real-time clinical data and HCC scoring logic."
              },
              {
                icon: ShieldCheck,
                title: "Audit-Ready Compliance",
                desc: "Built-in timers and activity logs ensure every billable minute is documented to Medicare standards."
              },
              {
                icon: DollarSign,
                title: "Revenue Cycle Engine",
                desc: "Track eligibility, generate claims, and monitor reimbursement for CCM (99490) and RPM codes."
              },
              {
                icon: Users,
                title: "Patient Engagement",
                desc: "Integrated portal, SMS, and automated outreach queues to keep patients connected to their care team."
              },
              {
                icon: BarChart3,
                title: "Population Health Analytics",
                desc: "Visualize care gaps, readmission risks, and program performance at a glance."
              },
              {
                icon: Stethoscope,
                title: "Provider Workflow",
                desc: "One-click e-signatures and streamlined approval queues designed to minimize provider burnout."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Proven results for Primary Care</h2>
              <p className="text-blue-200 text-lg mb-8">
                Our partners see immediate improvements in patient outcomes and practice revenue within the first 90 days.
              </p>
              <ul className="space-y-4">
                {[
                  "35% Reduction in Hospital Readmissions",
                  "$45k Average Annual Revenue Increase per Provider",
                  "98% Audit Pass Rate"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400" size={24} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-800/50 p-8 rounded-2xl border border-blue-700">
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center font-bold text-lg">JS</div>
                <div>
                  <h4 className="font-bold">Dr. Jennifer Smith</h4>
                  <p className="text-blue-300 text-sm">Medical Director, Metro Health</p>
                </div>
              </div>
              <p className="text-lg italic text-blue-100">
                "MediCareSync transformed how we handle chronic care management. The AI care plans save my nurses hours every week, and the billing automation is flawless."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to modernize your practice?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Join 500+ forward-thinking providers delivering better care with MediCareSync.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Get Started Now <ArrowRight size={20} />
          </Link>
          <p className="mt-4 text-sm text-slate-500">No credit card required • HIPAA Compliant</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <Stethoscope size={24} />
            <span className="font-bold text-slate-700">MediCareSync</span>
          </div>
          <div className="text-sm text-slate-500">
            © 2024 MediCareSync Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

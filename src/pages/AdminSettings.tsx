import React from 'react';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Users, Plus, MoreVertical, Shield, Mail } from 'lucide-react';

export default function AdminSettings() {
  const users = [
    { id: 1, name: "Sarah Jenkins, RN", role: "CARE_MANAGER", email: "sarah.j@clinic.com", status: "Active", lastLogin: "2 mins ago" },
    { id: 2, name: "Dr. Michael Chen", role: "PCP", email: "dr.chen@clinic.com", status: "Active", lastLogin: "1 hour ago" },
    { id: 3, name: "Alex Lee", role: "COORDINATOR", email: "alex.l@clinic.com", status: "Active", lastLogin: "4 hours ago" },
    { id: 4, name: "Jessica Smith", role: "ADMIN", email: "jessica.s@clinic.com", status: "Active", lastLogin: "Yesterday" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500">Manage staff access and roles for your organization.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
          <Plus size={16} /> Add User
        </button>
      </div>

      <Card noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Login</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="neutral">{user.role.replace('_', ' ')}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <Mail size={14} className="text-slate-400" /> {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="success">{user.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader title="Organization Details" />
            <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Clinic Name</span>
                    <span className="font-medium text-slate-900">Metro Health Partners</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">NPI</span>
                    <span className="font-medium text-slate-900">1234567890</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Primary Contact</span>
                    <span className="font-medium text-slate-900">admin@metrohealth.com</span>
                </div>
            </div>
        </Card>
         <Card>
            <CardHeader title="Security Settings" />
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Enforce 2FA for all staff accounts</p>
                    </div>
                    <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-900">Session Timeout</p>
                        <p className="text-xs text-slate-500">Auto-logout after 15 minutes of inactivity</p>
                    </div>
                    <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
}

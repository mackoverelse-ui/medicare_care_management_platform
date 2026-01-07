import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Search, Send, Paperclip, MoreVertical, User } from 'lucide-react';
import { clsx } from 'clsx';

export default function PatientMessages() {
  const [activeThread, setActiveThread] = useState(1);

  const threads = [
    { id: 1, name: "Sarah Jenkins, RN", role: "Care Manager", lastMsg: "Please confirm your pharmacy location.", time: "10:30 AM", unread: true },
    { id: 2, name: "Dr. Michael Chen", role: "PCP", lastMsg: "Lab results look good. Continue current dosage.", time: "Yesterday", unread: false },
  ];

  const messages = [
    { id: 1, sender: "Sarah Jenkins, RN", text: "Hi John, just checking in on your blood pressure readings.", time: "10:00 AM", isMe: false },
    { id: 2, sender: "Me", text: "Morning Sarah. It was 128/82 this morning.", time: "10:15 AM", isMe: true },
    { id: 3, sender: "Sarah Jenkins, RN", text: "That's excellent! Keep up the good work. Please confirm your pharmacy location for the refill.", time: "10:30 AM", isMe: false },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Messages</h1>
      </div>

      <Card className="flex-1 flex overflow-hidden" noPadding>
        {/* Sidebar List */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map(thread => (
              <div 
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={clsx(
                  "p-4 cursor-pointer hover:bg-white border-b border-slate-100 transition-colors",
                  activeThread === thread.id ? "bg-white border-l-4 border-l-blue-600 shadow-sm" : "border-l-4 border-l-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={clsx("text-sm font-semibold", thread.unread ? "text-slate-900" : "text-slate-700")}>{thread.name}</h4>
                  <span className="text-xs text-slate-400">{thread.time}</span>
                </div>
                <p className="text-xs text-slate-500 mb-1">{thread.role}</p>
                <p className={clsx("text-sm truncate", thread.unread ? "font-medium text-slate-800" : "text-slate-500")}>
                  {thread.lastMsg}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Sarah Jenkins, RN</h3>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {messages.map(msg => (
              <div key={msg.id} className={clsx("flex", msg.isMe ? "justify-end" : "justify-start")}>
                <div className={clsx(
                  "max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                  msg.isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                )}>
                  <p>{msg.text}</p>
                  <p className={clsx("text-[10px] mt-1 text-right", msg.isMe ? "text-blue-100" : "text-slate-400")}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 py-2 px-4 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

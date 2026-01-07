import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Search, Send, Paperclip, MoreVertical, User, CheckCircle2, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { getProviderThreads } from '../data/mock';

export default function ProviderInbox() {
  const [activeThreadId, setActiveThreadId] = useState(1);
  const threads = getProviderThreads();
  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const messages = [
    { id: 1, sender: activeThread.patientName, text: activeThread.lastMessage, time: activeThread.timestamp, isMe: false },
    { id: 2, sender: "Me", text: "Thank you for reaching out. Let me check your chart.", time: "10:35 AM", isMe: true },
    { id: 3, sender: "Me", text: "Everything looks stable. Please continue your current dosage.", time: "10:36 AM", isMe: true },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Provider Inbox</h1>
        <p className="text-slate-500">Secure messaging with your patient panel.</p>
      </div>

      <Card className="flex-1 flex overflow-hidden" noPadding>
        {/* Sidebar List */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search patients..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700 shadow-sm">All</button>
              <button className="px-3 py-1 bg-transparent border border-transparent rounded text-xs font-medium text-slate-500 hover:bg-slate-200">Unread</button>
              <button className="px-3 py-1 bg-transparent border border-transparent rounded text-xs font-medium text-slate-500 hover:bg-slate-200">Flagged</button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {threads.map(thread => (
              <div 
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={clsx(
                  "p-4 cursor-pointer hover:bg-white border-b border-slate-100 transition-colors relative",
                  activeThreadId === thread.id ? "bg-white border-l-4 border-l-blue-600 shadow-sm" : "border-l-4 border-l-transparent"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={clsx("text-sm font-semibold", thread.unreadCount > 0 ? "text-slate-900" : "text-slate-700")}>{thread.patientName}</h4>
                  <span className="text-xs text-slate-400">{thread.timestamp}</span>
                </div>
                <p className={clsx("text-sm truncate pr-6", thread.unreadCount > 0 ? "font-medium text-slate-800" : "text-slate-500")}>
                  {thread.lastMessage}
                </p>
                {thread.unreadCount > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {thread.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                {activeThread.patientName.split(',')[0][0]}{activeThread.patientName.split(',')[1][1]}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  {activeThread.patientName}
                  <Badge variant="neutral">Patient</Badge>
                </h3>
                <p className="text-xs text-slate-500">Last active: 10 mins ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
                <CheckCircle2 size={20} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>
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
                placeholder="Type a secure message..." 
                className="flex-1 py-2 px-4 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-sm transition-colors">
                <Send size={18} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-2">
               <p className="text-[10px] text-slate-400">Press Enter to send. Messages are encrypted.</p>
               <button className="text-[10px] font-medium text-blue-600 hover:underline">Insert Template</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

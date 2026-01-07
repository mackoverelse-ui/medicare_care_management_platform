import React, { Fragment } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-slate-900/50 transition-opacity" onClick={onClose} />

        <div className={clsx(
          "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full",
          size === 'sm' && "sm:max-w-sm",
          size === 'md' && "sm:max-w-lg",
          size === 'lg' && "sm:max-w-2xl",
          size === 'xl' && "sm:max-w-4xl",
        )}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
            <h3 className="text-base font-semibold leading-6 text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-md bg-transparent text-slate-400 hover:text-slate-500 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {children}
          </div>

          {footer && (
            <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-slate-200">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

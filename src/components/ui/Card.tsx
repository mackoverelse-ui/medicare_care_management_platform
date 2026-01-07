import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export function Card({ className, children, noPadding = false, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        'bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      <div className={clsx(!noPadding && 'p-5')}>{children}</div>
    </div>
  );
}

export function CardHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {action && <div>{action}</div>}
    </div>
  );
}

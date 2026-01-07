import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const styles = {
    default: 'bg-blue-100 text-blue-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-rose-100 text-rose-700',
    neutral: 'bg-slate-100 text-slate-600',
    outline: 'bg-transparent border border-slate-200 text-slate-600',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

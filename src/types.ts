export type EmailStatus = 'queued' | 'delayed' | 'sending' | 'sent' | 'failed' | 'rescheduled';

export interface EmailItem {
  id: string;
  recipient: string;
  recipientName: string;
  subject: string;
  preview: string;
  status: EmailStatus;
  scheduledFor: string;
  sender: string;
  attempts: number;
}

export interface StatCard {
  label: string;
  value: string;
  trend: number;
  trendUp: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: 'success' | 'error' | 'info';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export const STATUS_META: Record<EmailStatus, { label: string; classes: string; dot: string }> = {
  queued:      { label: 'Queued',      classes: 'bg-slate-500/15 text-slate-300 border-slate-400/20',     dot: 'bg-slate-400' },
  delayed:     { label: 'Delayed',     classes: 'bg-blue-500/15 text-blue-300 border-blue-400/20',       dot: 'bg-blue-400' },
  sending:     { label: 'Sending',     classes: 'bg-amber-500/15 text-amber-300 border-amber-400/20',   dot: 'bg-amber-400' },
  sent:        { label: 'Sent',        classes: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20', dot: 'bg-emerald-400' },
  failed:      { label: 'Failed',      classes: 'bg-rose-500/15 text-rose-300 border-rose-400/20',       dot: 'bg-rose-400' },
  rescheduled: { label: 'Rescheduled', classes: 'bg-violet-500/15 text-violet-300 border-violet-400/20', dot: 'bg-violet-400' },
};

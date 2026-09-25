import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import type { ToastMessage } from '@/types';

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
}

const iconMap = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
  error: <AlertCircle className="h-5 w-5 text-rose-400" />,
  info: <Info className="h-5 w-5 text-cyan-400" />,
};

const accentMap = {
  success: 'border-l-emerald-400',
  error: 'border-l-rose-400',
  info: 'border-l-cyan-400',
};

export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      className={`animate-slide-in-up flex items-start gap-3 rounded-xl border border-white/10 border-l-2 ${accentMap[toast.variant]} bg-ink-800/95 backdrop-blur-xl px-4 py-3.5 shadow-2xl shadow-black/40 min-w-[300px] max-w-sm`}
    >
      <div className="mt-0.5 shrink-0">{iconMap[toast.variant]}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{toast.title}</p>
        {toast.description && <p className="mt-0.5 text-xs text-slate-400">{toast.description}</p>}
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-3">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
}

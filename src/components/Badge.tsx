import type { EmailStatus } from '@/types';
import { STATUS_META } from '@/types';

interface BadgeProps {
  status: EmailStatus;
}

export function StatusBadge({ status }: BadgeProps) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot} ${status === 'sending' ? 'animate-pulse' : ''}`} />
      {meta.label}
    </span>
  );
}

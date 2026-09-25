import { Search, Inbox } from 'lucide-react';
import type { EmailItem } from '@/types';
import { StatusBadge } from '@/components/Badge';
import { Skeleton } from '@/components/Skeleton';

interface EmailTableProps {
  emails: EmailItem[];
  loading: boolean;
  query: string;
  onQueryChange: (q: string) => void;
}

export function EmailTable({ emails, loading, query, onQueryChange }: EmailTableProps) {
  return (
    <div className="glass overflow-hidden">
      {/* Search bar */}
      <div className="border-b border-white/[0.06] p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search recipients, subjects, or statuses…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/[0.06] text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3">Recipient</th>
              <th className="px-5 py-3">Subject</th>
              <th className="px-5 py-3">Sender</th>
              <th className="px-5 py-3">Scheduled</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04]">
                  <td className="px-5 py-4"><Skeleton className="h-4 w-32" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-48" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-28" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-5 py-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
                </tr>
              ))
            ) : emails.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16">
                  <EmptyState query={query} />
                </td>
              </tr>
            ) : (
              emails.map((email) => (
                <tr
                  key={email.id}
                  className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white">
                        {email.recipientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{email.recipientName}</p>
                        <p className="truncate text-xs text-slate-500">{email.recipient}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="max-w-[200px] truncate text-sm text-slate-300">{email.subject}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-400">{email.sender}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-400">
                      {new Date(email.scheduledFor).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={email.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
        <Inbox className="h-8 w-8 text-slate-600" />
      </div>
      <p className="mt-4 text-sm font-semibold text-white">
        {query ? 'No matching sends found' : 'No emails scheduled yet'}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {query ? 'Try a different search term.' : 'Click "Compose New Email" to schedule your first send.'}
      </p>
    </div>
  );
}

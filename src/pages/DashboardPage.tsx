import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Sidebar, TopBar, type DashboardView } from '@/components/dashboard/Sidebar';
import { StatsGrid } from '@/components/dashboard/StatsGrid';
import { EmailTable } from '@/components/dashboard/EmailTable';
import { ComposePanel } from '@/components/dashboard/ComposePanel';
import { ToastContainer } from '@/components/Toast';
import { MOCK_STATS, MOCK_EMAILS } from '@/mockData';
import type { EmailItem, ToastMessage } from '@/types';

interface DashboardPageProps {
  session: Session;
  onLogout: () => void;
}

const VIEW_TITLES: Record<DashboardView, string> = {
  dashboard: 'Dashboard',
  scheduled: 'Scheduled Emails',
  sent: 'Sent History',
  search: 'Search Sends',
  settings: 'Settings',
};

export function DashboardPage({ session, onLogout }: DashboardPageProps) {
  const [view, setView] = useState<DashboardView>('dashboard');
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [tab, setTab] = useState<'scheduled' | 'sent'>('scheduled');
  const [query, setQuery] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [slackConnected, setSlackConnected] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const userEmail = session.user.email ?? 'user@mailflow.io';
  const userMeta = session.user.user_metadata as { full_name?: string; name?: string; avatar_url?: string } | null;
  const userName = userMeta?.full_name || userMeta?.name || userEmail.split('@')[0];
  const userInitials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setEmails(MOCK_EMAILS);
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [tab]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleConnectSlack = () => {
    if (slackConnected) return;
    setSlackConnected(true);
    addToast({
      title: 'Slack connected',
      description: 'You will receive alerts when rate limits are hit.',
      variant: 'success',
    });
  };

  const handleSchedule = (data: { subject: string; body: string; recipients: string[]; startTime: string }) => {
    const newEmails: EmailItem[] = data.recipients.map((email, i) => ({
      id: `new_${Date.now()}_${i}`,
      recipient: email,
      recipientName: email.split('@')[0],
      subject: data.subject,
      preview: data.body.slice(0, 80),
      status: 'queued',
      scheduledFor: data.startTime,
      sender: 'outreach@acme.io',
      attempts: 0,
    }));
    setEmails((prev) => [...newEmails, ...prev]);
    setComposeOpen(false);
    addToast({
      title: 'Email scheduled',
      description: `${data.recipients.length} ${data.recipients.length === 1 ? 'recipient' : 'recipients'} queued for ${new Date(data.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}.`,
      variant: 'success',
    });
  };

  // Filter emails by tab and search query
  const filteredEmails = useMemo(() => {
    let result = emails;
    if (tab === 'scheduled') {
      result = result.filter((e) => ['queued', 'delayed', 'sending', 'rescheduled'].includes(e.status));
    } else {
      result = result.filter((e) => ['sent', 'failed'].includes(e.status));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (e) =>
          e.recipient.toLowerCase().includes(q) ||
          e.recipientName.toLowerCase().includes(q) ||
          e.subject.toLowerCase().includes(q) ||
          e.status.toLowerCase().includes(q),
      );
    }
    return result;
  }, [emails, tab, query]);

  return (
    <div className="min-h-screen bg-ink-900">
      <Sidebar active={view} onNavigate={setView} onLogout={onLogout} />

      <div className="lg:pl-64">
        <TopBar
          title={VIEW_TITLES[view]}
          slackConnected={slackConnected}
          onConnectSlack={handleConnectSlack}
          onOpenCompose={() => setComposeOpen(true)}
          userInitials={userInitials}
          userName={userName}
          onLogout={onLogout}
        />

        <main className="px-5 py-6 lg:px-8 lg:py-8">
          {view === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Overview of your outreach pipeline</p>
                <button
                  onClick={() => setComposeOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_24px_-4px_rgba(124,58,237,0.6)]"
                >
                  + Compose New Email
                </button>
              </div>

              <StatsGrid stats={MOCK_STATS} loading={loading} />

              {/* Tabbed table */}
              <div>
                <div className="mb-4 flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1 w-fit">
                  {(['scheduled', 'sent'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
                        tab === t
                          ? 'bg-white/[0.08] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <EmailTable emails={filteredEmails} loading={loading} query={query} onQueryChange={setQuery} />
              </div>
            </div>
          )}

          {view === 'scheduled' && (
            <div className="space-y-6">
              <StatsGrid stats={MOCK_STATS} loading={loading} />
              <EmailTable
                emails={filteredEmails}
                loading={loading}
                query={query}
                onQueryChange={setQuery}
              />
            </div>
          )}

          {view === 'sent' && (
            <EmailTable
              emails={filteredEmails}
              loading={loading}
              query={query}
              onQueryChange={setQuery}
            />
          )}

          {view === 'search' && (
            <div className="space-y-6">
              <div className="glass p-6">
                <h2 className="text-lg font-semibold text-white">Full-text search</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Search across every recipient, subject, and status — powered by Elasticsearch.
                </p>
                <div className="relative mt-4">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type to search instantly…"
                    autoFocus
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-4 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>
              </div>
              <EmailTable
                emails={tab === 'scheduled' ? filteredEmails : emails.filter(e => query.trim() === '' || [e.recipient, e.recipientName, e.subject, e.status].some(v => v.toLowerCase().includes(query.toLowerCase())))}
                loading={loading}
                query={query}
                onQueryChange={setQuery}
              />
            </div>
          )}

          {view === 'settings' && (
            <div className="glass max-w-2xl p-6">
              <h2 className="text-lg font-semibold text-white">Workspace settings</h2>
              <p className="mt-1 text-sm text-slate-400">Manage your MailFlow workspace preferences.</p>
              <div className="mt-6 space-y-4">
                <SettingRow label="Default sender" value="outreach@acme.io" />
                <SettingRow label="Rate limit per sender" value="120 / hour" />
                <SettingRow label="Retry attempts" value="3 with backoff" />
                <SettingRow label="Slack alerts" value={slackConnected ? 'Connected' : 'Not connected'} />
              </div>
            </div>
          )}
        </main>
      </div>

      <ComposePanel
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSchedule={handleSchedule}
      />

      <ToastContainer toasts={toasts} onClose={closeToast} />
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] py-3 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

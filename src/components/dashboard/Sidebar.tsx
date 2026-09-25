import { LayoutDashboard, Clock, Send, Search, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/Logo';

export type DashboardView = 'dashboard' | 'scheduled' | 'sent' | 'search' | 'settings';

interface SidebarProps {
  active: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onLogout: () => void;
}

const navItems: { id: DashboardView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'scheduled', label: 'Scheduled', icon: Clock },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ active, onNavigate, onLogout }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="fixed left-4 top-4 z-50 rounded-lg border border-white/10 bg-ink-800/90 p-2 text-slate-300 backdrop-blur-md lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-white/[0.06] bg-ink-850/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2.5 px-6 py-5">
          <Logo size={32} />
          <span className="text-lg font-bold tracking-tight text-white">
            Mail<span className="gradient-text">Flow</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active === item.id
                  ? 'bg-gradient-brand-soft text-white border border-white/10'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              <item.icon className={`h-4.5 w-4.5 ${active === item.id ? 'text-violet-400' : ''}`} />
              {item.label}
              {active === item.id && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/[0.06] p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/[0.04] hover:text-white transition-all"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}

interface TopBarProps {
  title: string;
  slackConnected: boolean;
  onConnectSlack: () => void;
  onOpenCompose: () => void;
  userInitials: string;
  userName: string;
  onLogout: () => void;
}

export function TopBar({ title, slackConnected, onConnectSlack, onOpenCompose, userInitials, userName, onLogout }: TopBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-xl px-5 py-4 lg:px-8">
      <h1 className="text-xl font-bold text-white lg:ml-0 ml-12">{title}</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={onConnectSlack}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
            slackConnected
              ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300'
              : 'border-white/15 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
          }`}
        >
          {slackConnected ? (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Slack connected
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-slate-500" />
              Connect Slack
            </>
          )}
        </button>

        <button
          onClick={onOpenCompose}
          className="hidden items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_-4px_rgba(124,58,237,0.6)] sm:flex"
        >
          <Bell className="h-3.5 w-3.5" />
          Compose New Email
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-3 transition-all hover:bg-white/[0.06]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-white">
              {userInitials}
            </div>
            <span className="hidden text-sm font-medium text-white sm:block">{userName}</span>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-xl border border-white/10 bg-ink-800/95 backdrop-blur-xl py-2 shadow-2xl">
                <div className="px-4 py-2 border-b border-white/[0.06]">
                  <p className="text-sm font-medium text-white">{userName}</p>
                  <p className="text-xs text-slate-500">Admin workspace</p>
                </div>
                <button
                  onClick={() => { onLogout(); setMenuOpen(false); }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

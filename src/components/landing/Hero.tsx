import { ArrowRight, Play, Clock, Send, CheckCircle2, Activity } from 'lucide-react';
import { Button } from '@/components/Button';

interface HeroProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 top-40 h-[300px] w-[400px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-slate-300 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Now with AI-assisted send-time optimization
          </div>

          <h1 className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-up">
            Schedule outreach that
            <br />
            actually <span className="gradient-text">lands on time</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-400 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            MailFlow orchestrates every send with durable scheduling, intelligent per-sender rate
            limiting, and a live queue you can watch — so nothing slips through the cracks, even
            after a restart.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" onClick={() => onNavigate('login')} className="group">
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('dashboard')}>
              <Play className="h-4 w-4" />
              See how it works
            </Button>
          </div>
        </div>

        <HeroDashboardMockup />
      </div>
    </section>
  );
}

function HeroDashboardMockup() {
  return (
    <div className="relative mt-16 lg:mt-20 animate-fade-up" style={{ animationDelay: '0.3s' }}>
      <div className="absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[2rem] bg-gradient-brand-soft blur-2xl" />
      <div className="glass overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/70" />
          <span className="h-3 w-3 rounded-full bg-amber-400/70" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-xs text-slate-500">app.mailflow.io / dashboard</span>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-[200px_1fr]">
          {/* Mini sidebar */}
          <div className="hidden flex-col gap-2 lg:flex">
            {['Dashboard', 'Scheduled', 'Sent', 'Search', 'Settings'].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${
                  i === 0 ? 'bg-white/[0.06] text-white' : 'text-slate-500'
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-violet-400' : 'bg-slate-600'}`} />
                {item}
              </div>
            ))}
          </div>

          {/* Main area */}
          <div className="space-y-4">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: 'Scheduled', value: '12,847', icon: Clock, color: 'text-violet-400' },
                { label: 'Sent Today', value: '3,219', icon: Send, color: 'text-cyan-400' },
                { label: 'Active Senders', value: '24', icon: Activity, color: 'text-emerald-400' },
                { label: 'Delivered', value: '99.9%', icon: CheckCircle2, color: 'text-amber-400' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="animate-fade-up rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
                  style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                >
                  <stat.icon className={`mb-2 h-4 w-4 ${stat.color}`} />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-[11px] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Queue visual */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-300">Live Send Queue</p>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Streaming
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'alex@northwind.io', status: 'sent', pct: '100%' },
                  { name: 'priya@brightlabs.co', status: 'sending', pct: '64%' },
                  { name: 'm.chen@vertexai.dev', status: 'queued', pct: '0%' },
                  { name: 'sofia@quantumreach.com', status: 'delayed', pct: '0%' },
                ].map((row, i) => (
                  <div key={row.name} className="flex items-center gap-3">
                    <div className="h-2 w-2 shrink-0 rounded-full bg-slate-600" />
                    <span className="w-40 truncate text-xs text-slate-400">{row.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                      <div
                        className={`h-full rounded-full ${
                          row.status === 'sent' ? 'bg-emerald-400' : row.status === 'sending' ? 'bg-cyan-400' : 'bg-slate-600'
                        }`}
                        style={{
                          width: row.pct,
                          animation: row.status === 'sending' ? 'pulseGlow 2s ease-in-out infinite' : undefined,
                        }}
                      />
                    </div>
                    <span className="w-16 text-right text-[11px] text-slate-500">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent cards */}
      <div className="absolute -left-4 top-1/3 hidden animate-float lg:block">
        <div className="glass rounded-xl px-4 py-3 shadow-xl">
          <p className="text-xs text-slate-400">Rate limit safe</p>
          <p className="text-sm font-bold text-emerald-400">24 / 24 senders</p>
        </div>
      </div>
      <div className="absolute -right-4 top-2/3 hidden animate-float-slow lg:block">
        <div className="glass rounded-xl px-4 py-3 shadow-xl">
          <p className="text-xs text-slate-400">Queue latency</p>
          <p className="text-sm font-bold text-cyan-400">340 ms</p>
        </div>
      </div>
    </div>
  );
}

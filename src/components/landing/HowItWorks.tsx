import { PenLine, CalendarClock, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const steps = [
  { icon: PenLine, title: 'Compose', desc: 'Draft your message and drop in a CSV of recipients — MailFlow counts every address as you upload.' },
  { icon: CalendarClock, title: 'Schedule', desc: 'Pick a start time and per-sender pace. The queue distributes sends across mailboxes automatically.' },
  { icon: ShieldCheck, title: 'Send safely', desc: 'Rate limits and restart-safe state keep every send within provider thresholds — no bounces, no bans.' },
  { icon: BarChart3, title: 'Track', desc: 'Follow delivery in real time, search the full history, and get Slack alerts the moment something drifts.' },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">How it works</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
              From draft to delivered in four steps
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="relative">
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ink-800">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-700 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-center text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-4 top-6 hidden h-5 w-5 text-white/20 lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

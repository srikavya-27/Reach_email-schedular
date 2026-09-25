import { Clock, Gauge, Eye, RefreshCw, Search, BellRing } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const features = [
  {
    icon: Clock,
    title: 'Reliable delayed scheduling',
    desc: 'Queue emails for any future moment without a single cron job — MailFlow persists every schedule so it survives deploys and restarts.',
  },
  {
    icon: Gauge,
    title: 'Per-sender rate limiting',
    desc: 'Set a custom send ceiling for each mailbox and let the queue throttle automatically before your provider notices.',
  },
  {
    icon: Eye,
    title: 'Live queue visibility',
    desc: 'Watch every send move through the pipeline in real time, with position, latency, and ETA on a single screen.',
  },
  {
    icon: RefreshCw,
    title: 'Restart-safe delivery',
    desc: 'Durable job state means a crashed worker picks up exactly where it left off — no duplicates, no lost sends.',
  },
  {
    icon: Search,
    title: 'Searchable send history',
    desc: 'Full-text search across every recipient, subject, and status with sub-second results powered by Elasticsearch.',
  },
  {
    icon: BellRing,
    title: 'Instant Slack alerts',
    desc: 'Get a ping the moment a sender hits its rate ceiling or a batch starts failing — so you fix it before it cascades.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-400">Features</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Built for teams that can't afford a missed send
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Every piece of the pipeline is observable, durable, and tuned for high-volume outreach.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="glass glass-hover group h-full p-6">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-brand">
                    <f.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

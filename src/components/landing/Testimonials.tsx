import { Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const testimonials = [
  {
    quote: 'We moved from a brittle cron setup to MailFlow and our dropped-send rate went to zero. The live queue alone is worth it.',
    name: 'Dana Whitfield',
    role: 'Head of Growth, Northwind Labs',
  },
  {
    quote: 'The per-sender rate limiting saved us from a provider suspension during a 40k-send campaign. It just works.',
    name: 'Ravi Sundaram',
    role: 'RevOps Lead, Brightlabs',
  },
  {
    quote: 'Being able to search every send we have ever made in under a second changed how our team audits outreach.',
    name: 'Lena Marchetti',
    role: 'Comms Director, Vertex AI',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-400">Loved by teams</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
              Outreach teams sleep better with MailFlow
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="glass glass-hover flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-violet-500/40" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

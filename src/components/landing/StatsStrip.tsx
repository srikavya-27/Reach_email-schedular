import { Reveal } from '@/components/Reveal';

const stats = [
  { value: '4.2M+', label: 'Emails scheduled reliably' },
  { value: '340ms', label: 'Sub-second queue latency' },
  { value: '99.9%', label: 'Delivery uptime' },
  { value: '63%', label: 'Lower bounce rate on average' },
];

export function StatsStrip() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015] py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="text-center">
                <p className="text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm text-slate-500">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

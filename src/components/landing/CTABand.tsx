import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';

interface CTABandProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export function CTABand({ onNavigate }: CTABandProps) {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-16 text-center lg:px-16 lg:py-20">
            <div className="absolute inset-0 bg-ink-900/40" />
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-balance text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
                Stop wondering if your emails sent
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
                Spin up your first scheduled campaign in under five minutes. No credit card, no
                setup fee — just reliable sends.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  size="lg"
                  onClick={() => onNavigate('login')}
                  className="bg-ink-900 text-white hover:bg-ink-850 hover:scale-[1.02]"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

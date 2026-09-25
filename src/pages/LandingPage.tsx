import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { StatsStrip } from '@/components/landing/StatsStrip';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { CTABand } from '@/components/landing/CTABand';
import { Footer } from '@/components/landing/Footer';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero onNavigate={onNavigate} />
        <StatsStrip />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTABand onNavigate={onNavigate} />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

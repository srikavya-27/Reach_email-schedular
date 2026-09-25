import { LogoWordmark } from '@/components/Logo';

const columns = [
  { title: 'Product', links: ['Features', 'How it Works', 'Pricing', 'Changelog'] },
  { title: 'Developers', links: ['Documentation', 'API Reference', 'Webhooks', 'Status'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'DPA'] },
];

interface FooterProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950/50 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_3fr]">
          <div>
            <LogoWordmark />
            <p className="mt-4 max-w-xs text-sm text-slate-500">
              Durable email scheduling and outreach orchestration for teams that send at scale.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="mt-5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Get started →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-slate-600">© 2026 MailFlow, Inc. All rights reserved.</p>
          <p className="text-xs text-slate-600">Built for teams that send at scale.</p>
        </div>
      </div>
    </footer>
  );
}

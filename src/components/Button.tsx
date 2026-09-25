import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline' | 'google';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const base =
  'relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-brand hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.6)] hover:scale-[1.02] active:scale-[0.98]',
  ghost:
    'text-slate-300 hover:text-white hover:bg-white/[0.06]',
  outline:
    'text-slate-200 border border-white/15 hover:border-white/25 hover:bg-white/[0.04]',
  google:
    'text-white bg-white/[0.04] border border-white/15 hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-md',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

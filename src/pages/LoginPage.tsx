import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { ArrowLeft, Shield, Zap, Loader2, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface LoginPageProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

type Mode = 'login' | 'signup';

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess('Account created successfully. Please log in with your credentials.');
    setMode('login');
    setPassword('');
    setConfirmPassword('');
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[400px] rounded-full bg-cyan-400/10 blur-[100px]" />
      </div>

      <button
        onClick={() => onNavigate('landing')}
        className="absolute left-5 top-5 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors lg:left-8 lg:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </button>

      <div className="w-full max-w-md animate-fade-up">
        <div className="glass rounded-2xl p-8 shadow-2xl shadow-black/40">
          <div className="flex flex-col items-center text-center">
            <Logo size={48} className="animate-fade-in" />
            <h1 className="mt-6 text-2xl font-bold text-white">
              {mode === 'login' ? 'Welcome to MailFlow' : 'Create your account'}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {mode === 'login'
                ? 'Sign in to manage your scheduled campaigns and live send queue.'
                : 'Set up an email and password to get started.'}
            </p>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {success}
            </div>
          )}

          {/* Google OAuth */}
          <div className="mt-8">
            <Button
              variant="google"
              size="lg"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              {loading ? 'Redirecting…' : 'Continue with Google'}
            </Button>
          </div>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs text-slate-600">
              {mode === 'login' ? 'or sign in with email' : 'or sign up with email'}
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Email / password form */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Password {mode === 'signup' && <span className="text-slate-600">(min 6 characters)</span>}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="animate-fade-in">
                <label className="mb-1.5 block text-xs font-medium text-slate-400">Confirm password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                  />
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={mode === 'login' ? handleEmailLogin : handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === 'login' ? (
                <><LogIn className="h-4 w-4" /> Sign in</>
              ) : (
                <><UserPlus className="h-4 w-4" /> Create account</>
              )}
            </Button>
          </div>

          {/* Toggle login / signup */}
          <p className="mt-6 text-center text-sm text-slate-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
              className="font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              SOC 2 ready
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              No credit card needed
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          By continuing you agree to our{' '}
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a> and{' '}
          <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

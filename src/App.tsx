import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';

type Page = 'landing' | 'login' | 'dashboard';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession) setPage('dashboard');
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setPage('landing');
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-violet-500" />
      </div>
    );
  }

  return (
    <>
      {page === 'landing' && <LandingPage onNavigate={navigate} />}
      {page === 'login' && <LoginPage onNavigate={navigate} />}
      {page === 'dashboard' && session && (
        <DashboardPage session={session} onLogout={handleLogout} />
      )}
      {page === 'dashboard' && !session && <LoginPage onNavigate={navigate} />}
    </>
  );
}

export default App;

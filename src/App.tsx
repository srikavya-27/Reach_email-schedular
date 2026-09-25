import { useState } from 'react';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';

type Page = 'landing' | 'login' | 'dashboard';

function App() {
  const [page, setPage] = useState<Page>('landing');

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => navigate('landing');

  return (
    <>
      {page === 'landing' && <LandingPage onNavigate={navigate} />}
      {page === 'login' && <LoginPage onNavigate={navigate} />}
      {page === 'dashboard' && <DashboardPage onLogout={handleLogout} />}
    </>
  );
}

export default App;

// src/App.js
import React, { useState } from 'react';
import AuthPage     from './components/auth/AuthPage';
import GuidanceForm from './components/form/GuidanceForm';
import Dashboard    from './components/dashboard/Dashboard';
import Chatbot      from './components/chatbot/Chatbot';
import './styles/App.css';

function App() {
  const [user,      setUser]      = useState(null);   // null = not logged in
  const [page,      setPage]      = useState('form');
  const [report,    setReport]    = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('form');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('form');
    setReport(null);
  };

  const handleReportReady = (reportData) => {
    setReport(reportData);
    setPage('dashboard');
  };

  // Show login/signup if not authenticated
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">🏆</div>
          <div>
            <h1 className="brand-title">SportPath</h1>
            <p className="brand-sub">Career Guidance System</p>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-btn ${page === 'form' ? 'active' : ''}`}
            onClick={() => setPage('form')}
          >
            Get Guidance
          </button>

          {report && (
            <button
              className={`nav-btn ${page === 'dashboard' ? 'active' : ''}`}
              onClick={() => setPage('dashboard')}
            >
              My Report
            </button>
          )}

          <button
            className={`nav-btn ${page === 'chatbot' ? 'active' : ''}`}
            onClick={() => setPage('chatbot')}
          >
            Chat with AI
          </button>

          {/* Logged-in user */}
          <div className="nav-user">
            <div className="nav-user-dot" />
            {user.name}
          </div>

          <button className="nav-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </nav>
      </header>

      {/* ── Main Content ── */}
      <main className="app-main">

        {page === 'form' && (
          <GuidanceForm onReportReady={handleReportReady} user={user} />
        )}

        {page === 'dashboard' && report && (
          <Dashboard report={report} onBack={() => setPage('form')} />
        )}

        {page === 'dashboard' && !report && (
          <div className="empty-state">
            <p>No report yet. Fill the guidance form first!</p>
            <button className="btn-primary" onClick={() => setPage('form')}>
              Go to Form
            </button>
          </div>
        )}

        {page === 'chatbot' && (
          <div className="chatbot-page-container">
            <Chatbot userProfile={user} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;

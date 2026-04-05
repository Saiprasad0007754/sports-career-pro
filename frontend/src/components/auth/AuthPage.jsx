// src/components/auth/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { loginUser, registerUser, getSupportedSports } from '../../services/api';
import './AuthPage.css';

export default function AuthPage({ onLogin }) {
  const [mode, setMode]       = useState('login'); // 'login' | 'signup'
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  // Ping backend on mount to wake up the Render free tier instance
  useEffect(() => {
    getSupportedSports().catch(() => {}); // silent catch
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!form.name.trim())            return setError('Please enter your name.');
      if (!form.email.includes('@'))    return setError('Please enter a valid email.');
      if (form.password.length < 6)     return setError('Password must be at least 6 characters.');
      if (form.password !== form.confirm) return setError('Passwords do not match.');
    } else {
      if (!form.email.includes('@'))    return setError('Please enter a valid email.');
      if (!form.password)               return setError('Please enter your password.');
    }

    setLoading(true);
    try {
      let userRes;
      if (mode === 'signup') {
        userRes = await registerUser({ name: form.name, email: form.email, password: form.password });
      } else {
        userRes = await loginUser({ email: form.email, password: form.password });
      }
      onLogin({ name: userRes.name, email: userRes.email });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sports = ['🏏 Cricket', '⚽ Football', '🏸 Badminton', '🎾 Tennis', '🏊 Swimming', '🥊 Boxing'];

  return (
    <div className="auth-page">

      {/* ── Left Panel — Hero ── */}
      <div className="auth-hero">
        <div className="auth-hero-overlay" />

        {/* Real sports image via Unsplash */}
        <img
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=80"
          alt="Sports stadium"
          className="auth-hero-img"
        />

        <div className="auth-hero-content">
          <div className="auth-hero-badge">Sports Career AI</div>
          <h1 className="auth-hero-title">
            Your Path to<br/>
            <span className="auth-hero-accent">Athletic Glory</span>
          </h1>
          <p className="auth-hero-desc">
            Get AI-powered career guidance, personalized training plans,
            diet recommendations and salary insights — built for champions.
          </p>

          <div className="auth-sports-grid">
            {sports.map(s => (
              <div key={s} className="auth-sport-pill">{s}</div>
            ))}
          </div>

          <div className="auth-stats-row">
            <div className="auth-stat">
              <div className="auth-stat-num">500+</div>
              <div className="auth-stat-label">Athletes Guided</div>
            </div>
            <div className="auth-stat-divider" />
            <div className="auth-stat">
              <div className="auth-stat-num">20+</div>
              <div className="auth-stat-label">Sports Covered</div>
            </div>
            <div className="auth-stat-divider" />
            <div className="auth-stat">
              <div className="auth-stat-num">95%</div>
              <div className="auth-stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="auth-form-panel">
        <div className="auth-form-wrap">

          {/* Logo */}
          <div className="auth-logo">
            <div className="auth-logo-icon">🏆</div>
            <div>
              <div className="auth-logo-title">SportPath</div>
              <div className="auth-logo-sub">Career Guidance System</div>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => { setMode('login'); setError(''); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => { setMode('signup'); setError(''); }}
            >
              Create Account
            </button>
          </div>

          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome back!' : 'Start your journey'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Sign in to access your career guidance dashboard.'
              : 'Join thousands of athletes unlocking their potential.'}
          </p>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>

            {mode === 'signup' && (
              <div className="auth-field">
                <label>Full Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">✉</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label>
                Password
                {mode === 'login' && (
                  <span className="auth-forgot">Forgot password?</span>
                )}
              </label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">🔒</span>
                  <input
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                  />
                </div>
              </div>
            )}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading
                ? <span className="auth-spinner">⏳ Please wait (Backend waking up, may take ~50s)...</span>
                : mode === 'login' ? 'Sign In →' : 'Create Account →'
              }
            </button>

          </form>

          {/* Divider */}
          <div className="auth-divider"><span>or continue with</span></div>

          {/* Social buttons (demo) */}
          <div className="auth-social">
            <button className="auth-social-btn" onClick={() => onLogin({ name: 'Demo User', email: 'demo@sportpath.in' })}>
              <span>🚀</span> Continue as Guest
            </button>
          </div>

          <p className="auth-switch">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

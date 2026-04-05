// src/components/form/GuidanceForm.jsx
import React, { useState, useEffect } from 'react';
import { analyzeProfile, getSupportedSports } from '../../services/api';
import './GuidanceForm.css';

const INITIAL_FORM = {
  name: '', sportInterest: '', location: '', age: '', weightKg: '', heightCm: '',
  fitnessLevel: '', careerLevel: '', priority: '',
};

function GuidanceForm({ onReportReady, user }) {
  const [form,    setForm]    = useState({ ...INITIAL_FORM, name: user?.name || '' });
  const [sports,  setSports]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [step,    setStep]    = useState(1);

  useEffect(() => {
    getSupportedSports()
      .then(setSports)
      .catch(() => setSports([
        'Cricket','Football','Athletics','Badminton',
        'Tennis','Swimming','Basketball','Kabaddi',
      ]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!form.name.trim())   return 'Please enter your name.';
    if (!form.sportInterest) return 'Please select a sport.';
    if (!form.location.trim()) return 'Please enter your location/city.';
    if (!form.age || form.age < 8 || form.age > 50)
      return 'Age must be between 8 and 50.';
    if (!form.weightKg || form.weightKg < 30 || form.weightKg > 150)
      return 'Weight must be between 30 and 150 kg.';
    return null;
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fitnessLevel) return setError('Please select your fitness level.');
    if (!form.careerLevel)  return setError('Please select your career level goal.');
    if (!form.priority)     return setError('Please select your top priority.');

    setLoading(true); setError('');
    try {
      const payload = {
        ...form,
        age:      parseInt(form.age),
        weightKg: parseFloat(form.weightKg),
        heightCm: form.heightCm ? parseFloat(form.heightCm) : null,
      };
      const report = await analyzeProfile(payload);
      onReportReady(report);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to connect to server. Make sure Spring Boot is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      {/* ── Left Hero ── */}
      <div className="form-hero">
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80"
          alt="Athletes training"
          className="form-hero-img"
        />
        <div className="form-hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">Sports Career AI</div>
          <h2 className="hero-title">
            Unlock Your
            <span className="hero-accent">Athletic Potential</span>
          </h2>
          <p className="hero-desc">
            Get a personalised career roadmap, training plan,
            diet recommendations, and salary insights — built for champions.
          </p>
          <div className="hero-features">
            {[
              { icon: '🎯', label: 'Career Recommendations' },
              { icon: '🏋️', label: 'Training Roadmap' },
              { icon: '🥗', label: 'Diet Plan' },
              { icon: '💪', label: 'Fitness Score' },
              { icon: '📈', label: 'Growth Path' },
            ].map(f => (
              <div key={f.label} className="hero-feature">
                <span className="check">✓</span>
                <span>{f.icon} {f.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-sports-row">
            {['Cricket','Football','Badminton','Tennis','Athletics'].map(s => (
              <span key={s} className="sport-icon-pill">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Form ── */}
      <div className="form-panel">
        <div className="form-card">
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          </div>

          <h3 className="form-title">
            {step === 1 ? 'Basic Information' : 'Fitness & Goals'}
          </h3>

          {error && <div className="form-error">⚠ {error}</div>}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-step">
                <div className="field-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input type="text" name="name" value={form.name}
                    onChange={handleChange} placeholder="e.g. Rahul Sharma" required />
                </div>
                <div className="field-group">
                  <label>Sport Interest <span className="req">*</span></label>
                  <select name="sportInterest" value={form.sportInterest} onChange={handleChange} required>
                    <option value="">— Select Sport —</option>
                    {sports.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Location (City / District) <span className="req">*</span></label>
                  <input type="text" name="location" value={form.location}
                    onChange={handleChange} placeholder="e.g. Mumbai, Pune, Delhi" required />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>Age <span className="req">*</span></label>
                    <input type="number" name="age" value={form.age}
                      onChange={handleChange} min="8" max="50" placeholder="e.g. 18" required />
                  </div>
                  <div className="field-group">
                    <label>Weight (kg) <span className="req">*</span></label>
                    <input type="number" name="weightKg" value={form.weightKg}
                      onChange={handleChange} step="0.1" min="30" max="150" placeholder="e.g. 68.5" required />
                  </div>
                </div>
                <div className="field-group">
                  <label>Height (cm) <span className="optional">— for BMI</span></label>
                  <input type="number" name="heightCm" value={form.heightCm}
                    onChange={handleChange} step="0.1" min="100" max="250" placeholder="e.g. 175" />
                </div>
                <button type="button" className="btn-primary full-width" onClick={handleNext}>
                  Next Step →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <div className="field-group">
                  <label>Current Fitness Level <span className="req">*</span></label>
                  <div className="radio-group">
                    {['Beginner','Intermediate','Advanced'].map(lvl => (
                      <label key={lvl} className={`radio-card ${form.fitnessLevel === lvl ? 'selected' : ''}`}>
                        <input type="radio" name="fitnessLevel" value={lvl}
                          checked={form.fitnessLevel === lvl} onChange={handleChange} />
                        <span className="radio-label">{lvl}</span>
                        <span className="radio-desc">
                          {lvl === 'Beginner' && 'Just starting out'}
                          {lvl === 'Intermediate' && '1–3 years training'}
                          {lvl === 'Advanced' && '3+ years training'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field-group">
                  <label>Career Level Goal <span className="req">*</span></label>
                  <select name="careerLevel" value={form.careerLevel} onChange={handleChange} required>
                    <option value="">— Select Level —</option>
                    <option value="District">District Level</option>
                    <option value="State">State Level</option>
                    <option value="National">National Level</option>
                    <option value="International">International Level</option>
                  </select>
                </div>
                <div className="field-group">
                  <label>Your Top Priority <span className="req">*</span></label>
                  <div className="priority-grid">
                    {[
                      { key: 'passion',   icon: '❤️',  label: 'Passion',   desc: 'Love the sport' },
                      { key: 'income',    icon: '💰',  label: 'Income',    desc: 'High earnings' },
                      { key: 'stability', icon: '🏠',  label: 'Stability', desc: 'Secure career' },
                      { key: 'fitness',   icon: '💪',  label: 'Fitness',   desc: 'Stay active' },
                    ].map(p => (
                      <label key={p.key} className={`priority-card ${form.priority === p.key ? 'selected' : ''}`}>
                        <input type="radio" name="priority" value={p.key}
                          checked={form.priority === p.key} onChange={handleChange} />
                        <span className="priority-icon">{p.icon}</span>
                        <span className="priority-label">{p.label}</span>
                        <span className="priority-desc">{p.desc}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading
                      ? <span className="loading-spinner">Analysing... ⏳</span>
                      : 'Get My Report 🎯'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default GuidanceForm;

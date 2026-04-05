// src/components/dashboard/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';

// Sport-specific Unsplash images
const SPORT_IMAGES = {
  Cricket:    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80',
  Football:   'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',
  Athletics:  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
  Badminton:  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&q=80',
  Tennis:     'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=1200&q=80',
  Swimming:   'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',
  Basketball: 'https://images.unsplash.com/photo-1546519638405-a4d9e0ade428?w=1200&q=80',
  Kabaddi:    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80',
  default:    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80',
};

function Dashboard({ report, onBack }) {
  const [activeTab, setActiveTab]     = useState('summary');
  const [downloading, setDownloading] = useState(false);

  const tabs = [
    { id: 'summary',  label: '📊 Summary'  },
    { id: 'careers',  label: '🎯 Careers'  },
    { id: 'skills',   label: '💡 Skills'   },
    { id: 'training', label: '🏋️ Training' },
    { id: 'diet',     label: '🥗 Diet Plan'},
  ];

  const scoreColor = (s) => s >= 70 ? '#1a7a4a' : s >= 45 ? '#d4900a' : '#e8430a';
  const bmiColor   = (cat) => ({
    Normal: '#1a7a4a', Underweight: '#d4900a',
    Overweight: '#e8430a', Obese: '#c23508',
  }[cat] || '#7a7a96');

  const bannerImg = SPORT_IMAGES[report.sportInterest] || SPORT_IMAGES.default;

  // ── PDF Download ──────────────────────────────────────────
  const downloadRoadmap = async () => {
    setDownloading(true);
    try {
      // Build HTML content for PDF
      const careers = report.recommendedCareers || [];
      const training = report.trainingRoadmap || [];
      const diet = report.dietPlan || [];
      const skills = report.requiredSkills || [];

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #fff; }
    .page { max-width: 800px; margin: 0 auto; padding: 40px; }

    /* Header */
    .header { background: linear-gradient(135deg, #0f1f3d, #e8430a); color: #fff; padding: 32px 40px; border-radius: 12px; margin-bottom: 32px; }
    .header-brand { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7; margin-bottom: 8px; }
    .header-name { font-size: 28px; font-weight: 900; margin-bottom: 4px; }
    .header-sport { font-size: 14px; opacity: 0.85; margin-bottom: 20px; }
    .header-stats { display: flex; gap: 24px; }
    .h-stat { text-align: center; }
    .h-stat-val { font-size: 22px; font-weight: 900; color: #ffd166; }
    .h-stat-label { font-size: 10px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }

    /* Growth Path */
    .section { margin-bottom: 28px; }
    .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #e8430a; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #f0ede6; }

    .growth-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 12px 16px; background: #fff8f6; border: 1px solid #ffd0c4; border-radius: 8px; }
    .gp-step { padding: 4px 12px; border-radius: 4px; background: #f0ede6; font-size: 12px; font-weight: 700; color: #3d3d5c; }
    .gp-step.current { background: #e8430a; color: #fff; }
    .gp-arrow { color: #e8430a; font-size: 12px; }

    /* Advice */
    .advice-box { padding: 14px 16px; background: #f7f5f0; border-radius: 8px; font-size: 13px; color: #3d3d5c; line-height: 1.7; }

    /* Careers */
    .career-item { padding: 14px 16px; border: 1px solid #e2dfd8; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #e8430a; }
    .career-num { font-size: 11px; font-weight: 800; color: #e8430a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
    .career-title { font-size: 15px; font-weight: 800; color: #0f1f3d; margin-bottom: 4px; }
    .career-salary { font-size: 12px; font-weight: 700; color: #1a7a4a; margin-bottom: 6px; }
    .career-desc { font-size: 12px; color: #7a7a96; line-height: 1.6; }

    /* Training */
    .training-item { display: flex; gap: 12px; margin-bottom: 14px; }
    .t-dot { width: 36px; height: 36px; border-radius: 8px; background: #e8430a; color: #fff; font-weight: 900; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .t-content { flex: 1; padding: 10px 14px; background: #f7f5f0; border-radius: 8px; border: 1px solid #e2dfd8; }
    .t-title { font-size: 13px; font-weight: 800; color: #0f1f3d; margin-bottom: 3px; }
    .t-duration { font-size: 11px; color: #e8430a; font-weight: 700; text-transform: uppercase; margin-bottom: 5px; }
    .t-desc { font-size: 12px; color: #7a7a96; line-height: 1.6; }

    /* Skills */
    .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .skill-item { padding: 10px 12px; background: #f7f5f0; border-radius: 8px; border: 1px solid #e2dfd8; }
    .skill-type { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #e8430a; margin-bottom: 3px; }
    .skill-name { font-size: 12px; font-weight: 700; color: #0f1f3d; }
    .skill-desc { font-size: 11px; color: #7a7a96; margin-top: 2px; }

    /* Diet */
    .diet-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .diet-item { padding: 10px 12px; background: #f7f5f0; border-radius: 8px; border: 1px solid #e2dfd8; }
    .diet-meal { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #1a7a4a; margin-bottom: 4px; }
    .diet-rec { font-size: 11px; color: #3d3d5c; line-height: 1.6; }
    .diet-cal { font-size: 10px; color: #d4900a; font-weight: 700; margin-top: 4px; }

    /* Footer */
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2dfd8; text-align: center; font-size: 11px; color: #ababc4; }
  </style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <div class="header-brand">SportPath Career Guidance System</div>
    <div class="header-name">${report.userName || 'Athlete'}'s Career Roadmap</div>
    <div class="header-sport">${report.sportInterest} · ${report.careerLevel} Level Goal</div>
    <div class="header-stats">
      <div class="h-stat">
        <div class="h-stat-val">${report.fitnessScore}/100</div>
        <div class="h-stat-label">Fitness Score</div>
      </div>
      <div class="h-stat">
        <div class="h-stat-val">${report.bmi > 0 ? report.bmi.toFixed(1) : 'N/A'}</div>
        <div class="h-stat-label">BMI</div>
      </div>
      <div class="h-stat">
        <div class="h-stat-val">${careers.length}</div>
        <div class="h-stat-label">Career Options</div>
      </div>
      <div class="h-stat">
        <div class="h-stat-val">${report.fitnessLevel}</div>
        <div class="h-stat-label">Fitness Level</div>
      </div>
    </div>
  </div>

  <!-- Growth Path -->
  <div class="section">
    <div class="section-title">Growth Path</div>
    <div class="growth-row">
      ${(report.growthPath || '').split('→').map((level, i) =>
        `${i > 0 ? '<span class="gp-arrow">→</span>' : ''}
         <span class="gp-step ${i === 0 ? 'current' : ''}">${level.trim()}</span>`
      ).join('')}
    </div>
  </div>

  <!-- Overall Advice -->
  <div class="section">
    <div class="section-title">Overall Advice</div>
    <div class="advice-box">${(report.overallAdvice || '').replace(/\n/g, '<br/>')}</div>
  </div>

  <!-- Recommended Careers -->
  <div class="section">
    <div class="section-title">Recommended Careers (${careers.length} Options)</div>
    ${careers.map((c, i) => `
      <div class="career-item">
        <div class="career-num">#${i + 1} · ${c.matchScore}% Match · ${c.levelRequired}</div>
        <div class="career-title">${c.title}</div>
        <div class="career-salary">💰 ${c.avgSalaryInr}</div>
        <div class="career-desc">${c.description}</div>
      </div>
    `).join('')}
  </div>

  <!-- Training Roadmap -->
  <div class="section">
    <div class="section-title">Training Roadmap</div>
    ${training.length === 0 ? '<div class="advice-box">No training roadmap available.</div>' :
      training.map(step => `
        <div class="training-item">
          <div class="t-dot">${step.stepNumber}</div>
          <div class="t-content">
            <div class="t-title">${step.stepTitle}</div>
            <div class="t-duration">⏱ ${step.durationEstimate}</div>
            <div class="t-desc">${step.stepDescription}</div>
          </div>
        </div>
      `).join('')}
  </div>

  <!-- Skills Required -->
  <div class="section">
    <div class="section-title">Required Skills</div>
    <div class="skills-grid">
      ${skills.map(s => `
        <div class="skill-item">
          <div class="skill-type">${s.skillType}</div>
          <div class="skill-name">${s.skillName}</div>
          <div class="skill-desc">${s.description}</div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Diet Plan -->
  <div class="section">
    <div class="section-title">Diet Plan</div>
    ${diet.length === 0 ? '<div class="advice-box">No diet plan available.</div>' : `
      <div class="diet-grid">
        ${diet.map(d => `
          <div class="diet-item">
            <div class="diet-meal">${d.mealTime}</div>
            <div class="diet-rec">${d.recommendation}</div>
            ${d.caloriesApprox ? `<div class="diet-cal">~${d.caloriesApprox} kcal</div>` : ''}
          </div>
        `).join('')}
      </div>
    `}
  </div>

  <div class="footer">Generated by SportPath AI Career Guidance System · ${new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</div>

</div>
</body>
</html>`;

      // Open in new window and print as PDF
      const printWin = window.open('', '_blank');
      printWin.document.write(htmlContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        setDownloading(false);
      }, 600);

    } catch (err) {
      console.error(err);
      setDownloading(false);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="dashboard">

      {/* ── Banner with sport image ── */}
      <div className="dash-banner">
        <img src={bannerImg} alt={report.sportInterest} className="dash-banner-img" />
        <div className="dash-banner-overlay" />
        <div className="dash-banner-content">
          <div>
            <div className="dash-sport-badge">{report.sportInterest}</div>
            <h2 className="dash-greeting">
              {report.userName ? `Hello, ${report.userName}!` : 'Your Guidance Report'}
            </h2>
            <p className="dash-sub">Your personalized sports career analysis</p>
          </div>
          <div className="dash-banner-actions">
            <button className="btn-download" onClick={downloadRoadmap} disabled={downloading}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              {downloading ? 'Preparing...' : 'Download Roadmap PDF'}
            </button>
            <button className="btn-secondary" onClick={onBack}
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
              ← New Profile
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-cards">
        <StatCard label="Fitness Score" value={`${report.fitnessScore}/100`}
          sub={report.fitnessLevel} color={scoreColor(report.fitnessScore)} icon="💪" />
        <StatCard label="BMI" value={report.bmi > 0 ? report.bmi.toFixed(1) : 'N/A'}
          sub={report.bmiCategory} color={bmiColor(report.bmiCategory)} icon="⚖️" />
        <StatCard label="Career Goal" value={report.careerLevel}
          sub="Level Target" color="#6366f1" icon="🏆" />
        <StatCard label="Career Matches" value={report.recommendedCareers?.length || 0}
          sub="Options Found" color="#0891b2" icon="🎯" />
      </div>

      {/* ── Growth Path ── */}
      <div className="growth-path">
        <span className="gp-label">Your Growth Path:</span>
        {report.growthPath?.split('→')?.map((level, i, arr) => (
          <React.Fragment key={i}>
            <span className={`gp-step ${i === 0 ? 'gp-current' : ''}`}>{level.trim()}</span>
            {i < arr.length - 1 && <span className="gp-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="dash-tabs">
        {tabs.map(t => (
          <button key={t.id}
            className={`dash-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="tab-content">
        {activeTab === 'summary'  && <SummaryTab  report={report} />}
        {activeTab === 'careers'  && <CareersTab  careers={report.recommendedCareers} />}
        {activeTab === 'skills'   && <SkillsTab   skills={report.requiredSkills} />}
        {activeTab === 'training' && <TrainingTab training={report.trainingRoadmap} centers={report.trainingCenters} location={report.location} />}
        {activeTab === 'diet'     && <DietTab     diet={report.dietPlan} />}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

function SummaryTab({ report }) {
  return (
    <div className="tab-panel summary-tab">
      <div className="summary-grid">
        <div className="summary-block">
          <h4 className="block-title">📋 Profile Snapshot</h4>
          <table className="summary-table">
            <tbody>
              {[
                ['Name',        report.userName || '—'],
                ['Sport',       report.sportInterest],
                ['Age',         `${report.age} years`],
                ['Weight',      `${report.weightKg} kg`],
                ['Height',      report.heightCm ? `${report.heightCm} cm` : 'Not provided'],
                ['BMI',         report.bmi > 0 ? `${report.bmi.toFixed(1)} (${report.bmiCategory})` : 'N/A'],
                ['Fitness Lvl', report.fitnessLevel],
                ['Career Goal', report.careerLevel],
                ['Priority',    report.priority],
              ].map(([k, v]) => (
                <tr key={k}><td className="tbl-key">{k}</td><td className="tbl-val">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="summary-block">
          <h4 className="block-title">💡 Overall Advice</h4>
          <div className="advice-text">
            {report.overallAdvice?.split('\n')?.map((line, i) =>
              line.trim() ? <p key={i}>{line}</p> : null
            )}
          </div>
          <h4 className="block-title" style={{ marginTop: '1.5rem' }}>🔍 Fitness Remarks</h4>
          <div className="remarks-box">
            <div className="remarks-score">{report.fitnessScore}<small>/100</small></div>
            <p>{report.fitnessRemarks}</p>
          </div>
        </div>
      </div>
      {report.recommendedCareers?.[0] && (
        <div className="top-career-block">
          <h4 className="block-title">⭐ Top Recommended Career</h4>
          <div className="top-career-card">
            <div className="tc-title">{report.recommendedCareers[0].title}</div>
            <div className="tc-salary">{report.recommendedCareers[0].avgSalaryInr}</div>
            <p className="tc-desc">{report.recommendedCareers[0].description}</p>
            <div className="tc-badge">{report.recommendedCareers[0].matchScore}% Match</div>
          </div>
        </div>
      )}
    </div>
  );
}

function CareersTab({ careers }) {
  if (!careers?.length) return <EmptyState msg="No career data available." />;
  return (
    <div className="careers-list">
      {careers.map((c, i) => (
        <div key={c.careerId} className="career-card">
          <div className="career-rank">#{i + 1}</div>
          <div className="career-info">
            <div className="career-title">{c.title}</div>
            <div className="career-level-badge">{c.levelRequired}</div>
            <p className="career-desc">{c.description}</p>
            <div className="career-meta">
              <span className="salary-tag">💰 {c.avgSalaryInr}</span>
              <span className="reason-tag">💡 {c.matchReason}</span>
            </div>
          </div>
          <div className="career-score-circle"
            style={{ background: `conic-gradient(#e8430a ${c.matchScore * 3.6}deg, #f0ede6 0deg)` }}>
            <span>{c.matchScore}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsTab({ skills }) {
  if (!skills?.length) return <EmptyState msg="No skills data available." />;
  const grouped = skills.reduce((acc, s) => {
    acc[s.skillType] = acc[s.skillType] || []; acc[s.skillType].push(s); return acc;
  }, {});
  const typeColors = { Physical: '#e8430a', Technical: '#6366f1', Mental: '#1a7a4a' };
  return (
    <div className="skills-container">
      {Object.entries(grouped).map(([type, list]) => (
        <div key={type} className="skill-group">
          <div className="skill-type-header" style={{ color: typeColors[type] || '#7a7a96' }}>
            {type === 'Physical' && '💪 '}{type === 'Technical' && '🎯 '}{type === 'Mental' && '🧠 '}
            {type} Skills
          </div>
          <div className="skill-cards">
            {list.map(skill => (
              <div key={skill.id} className="skill-card"
                style={{ borderLeft: `4px solid ${typeColors[skill.skillType] || '#ababc4'}` }}>
                <div className="skill-name">{skill.skillName}</div>
                <div className="skill-desc">{skill.description}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TrainingTab({ training, centers, location }) {
  if (!training?.length) return <EmptyState msg="No training roadmap available." />;
  return (
    <div className="training-container">
      <div className="training-timeline">
        {training.map((step, i) => (
          <div key={step.id} className="timeline-item">
            <div className="timeline-marker">
              <div className="timeline-dot">{step.stepNumber}</div>
              {i < training.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="timeline-content">
              <div className="timeline-title">{step.stepTitle}</div>
              <div className="timeline-duration">⏱ {step.durationEstimate}</div>
              <p className="timeline-desc">{step.stepDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {centers && centers.length > 0 && (
        <div className="live-centers-section" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #f0ede6' }}>
          <h4 style={{ fontSize: '15px', color: '#0f1f3d', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📍</span> Live Local Academies in {location || 'your area'}
          </h4>
          <div className="centers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
            {centers.map((c, idx) => (
              <div key={c.placeId || idx} className="center-card" style={{ padding: '16px', background: '#fff', border: '1px solid #e2dfd8', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#1a1a2e', marginBottom: '6px' }}>{c.name}</div>
                <div style={{ fontSize: '12px', color: '#7a7a96', marginBottom: '10px', display: 'flex', gap: '6px' }}>
                  <span>📌</span> <span style={{ lineHeight: '1.4' }}>{c.address}</span>
                </div>
                {(c.rating || c.userRatingsTotal) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#d4900a' }}>
                    <span>⭐ {c.rating ? c.rating.toFixed(1) : 'N/A'}</span>
                    <span style={{ color: '#ababc4', fontWeight: '600' }}>({c.userRatingsTotal || 0} reviews)</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DietTab({ diet }) {
  if (!diet?.length) return <EmptyState msg="No diet plan available." />;
  const mealIcons = { Breakfast:'☀️', Lunch:'🌤️', Dinner:'🌙', 'Pre-workout':'⚡', 'Post-workout':'🔋' };
  return (
    <div className="diet-grid">
      {diet.map(d => (
        <div key={d.id} className="diet-card">
          <div className="diet-meal">{mealIcons[d.mealTime] || '🍽️'} {d.mealTime}</div>
          <div className="diet-rec">{d.recommendation}</div>
          {d.caloriesApprox && <div className="diet-cal">~{d.caloriesApprox} kcal</div>}
          {d.notes && <div className="diet-note">💡 {d.notes}</div>}
        </div>
      ))}
    </div>
  );
}

function EmptyState({ msg }) {
  return <div className="empty-msg">{msg}</div>;
}

export default Dashboard;

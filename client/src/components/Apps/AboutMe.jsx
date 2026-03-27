import React from 'react';

const SKILLS = [
  { name: 'Python (Pandas, NumPy)', level: 90, color: '#3776AB' },
  { name: 'SQL (MySQL)', level: 85, color: '#4479A1' },
  { name: 'Power BI / Tableau', level: 90, color: '#F2C811' },
  { name: 'EDA & Hypothesis Test', level: 80, color: '#4CAF50' },
  { name: 'Matplotlib / Seaborn', level: 85, color: '#FF6600' },
  { name: 'Excel', level: 95, color: '#217346' },
];

export default function AboutMe() {
  return (
    <div style={{
      fontFamily: 'Tahoma, sans-serif',
      fontSize: 11,
      background: '#fff',
      height: '100%',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #245EDB 0%, #0A246A 100%)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: 'linear-gradient(135deg, #FFA500, #FF6600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          border: '3px solid rgba(255,255,255,0.4)',
          flexShrink: 0,
        }}>
          <img 
            src="/assets/adi.jpg" 
            alt="Aditya Kaushik Patel" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '👤'; }}
          />
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Aditya Kaushik Patel</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Data Analyst | Product Analyst</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 2 }}>
            📍 Uncovering patterns for data-driven decisions
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px', display: 'flex', gap: 16 }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Section title="About Me">
            <p style={{ lineHeight: 1.7, color: '#333' }}>
              I am a data-driven analyst with experience in exploratory data analysis, dashboarding, and business insights. I specialize in Python (Pandas), SQL, and Power BI to uncover patterns and support data-driven decision making. I have worked on real-world datasets including internship analytics, supermarket performance, and rating bias analysis.
            </p>
          </Section>

          <Section title="Tools">
            <ExpItem role="IDE & Testing" company="Jupyter Notebook, VS Code" period="Daily Use" />
            <ExpItem role="Version Control" company="Git, GitHub" period="Daily Use" />
            <ExpItem role="Office Suite" company="MS Excel (Advanced)" period="Daily Use" />
          </Section>
        </div>

        {/* Right */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <Section title="Skills">
            {SKILLS.map((s) => (
              <div key={s.name} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 11 }}>{s.name}</span>
                  <span style={{ fontSize: 10, color: '#666' }}>{s.level}%</span>
                </div>
                <div style={{ height: 8, background: '#D4D0C8', borderRadius: 2, border: '1px solid #ACA899' }}>
                  <div style={{
                    height: '100%',
                    width: `${s.level}%`,
                    background: s.color,
                    borderRadius: 2,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            ))}
          </Section>

          <Section title="Contact">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <a href="mailto:contact@adityapatel.com" style={{ color: '#0054E3', textDecoration: 'none', fontSize: 11 }}>✉️ Contact Me</a>
              <button className="xp-btn" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'flex-start' }} onClick={() => window.open('https://github.com/adityapatel14', '_blank')}>
                <span>🐙</span> GitHub
              </button>
              <button className="xp-btn" style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'flex-start' }} onClick={() => window.open('https://linkedin.com/in/aditya-kaushik-patel', '_blank')}>
                <span>💼</span> LinkedIn
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0A246A',
        borderBottom: '2px solid #245EDB',
        paddingBottom: 3,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ExpItem({ role, company, period }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontWeight: 'bold', color: '#000', fontSize: 11 }}>{role}</div>
      <div style={{ color: '#245EDB', fontSize: 11 }}>{company}</div>
      <div style={{ color: '#888', fontSize: 10 }}>{period}</div>
    </div>
  );
}

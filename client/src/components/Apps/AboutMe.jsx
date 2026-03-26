import React from 'react';

const SKILLS = [
  { name: 'React / Next.js', level: 95, color: '#61DAFB' },
  { name: 'Node.js / Express', level: 90, color: '#68A063' },
  { name: 'MongoDB', level: 85, color: '#4DB33D' },
  { name: 'TypeScript', level: 88, color: '#3178C6' },
  { name: 'Three.js / R3F', level: 80, color: '#FF6600' },
  { name: 'Docker / DevOps', level: 75, color: '#2496ED' },
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
          👤
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Portfolio Developer</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Full-Stack Developer | Creative Coder</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 2 }}>
            📍 Windows XP Enthusiast Since 2001
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px', display: 'flex', gap: 16 }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Section title="About Me">
            <p style={{ lineHeight: 1.7, color: '#333' }}>
              I'm a passionate full-stack developer who loves building beautiful, 
              performance-driven web applications. From 3D interactive experiences 
              with Three.js to pixel-perfect desktop UIs, I bring creativity and 
              technical depth to every project.
            </p>
          </Section>

          <Section title="Experience">
            <ExpItem role="Senior Frontend Dev" company="TechCorp Inc." period="2023–Present" />
            <ExpItem role="Full-Stack Developer" company="StartupXYZ" period="2021–2023" />
            <ExpItem role="Frontend Intern" company="Agency Co." period="2020–2021" />
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
              <a href="mailto:hello@portfolio.dev" style={{ color: '#0054E3', textDecoration: 'none', fontSize: 11 }}>✉️ hello@portfolio.dev</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#0054E3', textDecoration: 'none', fontSize: 11 }}>🐙 GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#0054E3', textDecoration: 'none', fontSize: 11 }}>💼 LinkedIn</a>
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

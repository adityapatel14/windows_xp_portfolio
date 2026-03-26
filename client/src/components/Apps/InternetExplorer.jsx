import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// URL helpers
// ─────────────────────────────────────────────────────────────────────────────
const HOME_URL = 'portfolio://home';

function toDisplayUrl(url) {
  const map = {
    'portfolio://home': 'http://portfolio.winxp.local/',
    'portfolio://projects': 'http://portfolio.winxp.local/projects',
    'portfolio://projects/Web': 'http://portfolio.winxp.local/projects/web',
    'portfolio://projects/Data': 'http://portfolio.winxp.local/projects/data',
    'portfolio://projects/ML': 'http://portfolio.winxp.local/projects/ml',
  };
  if (map[url]) return map[url];
  if (url.startsWith('portfolio://project/')) {
    const slug = url.replace('portfolio://project/', '');
    return `http://portfolio.winxp.local/projects/${slug}`;
  }
  return url;
}

function isInternal(url) {
  return url.startsWith('portfolio://');
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal pages
// ─────────────────────────────────────────────────────────────────────────────

// ── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ navigate }) {
  return (
    <div style={{ fontFamily: 'Tahoma, Times New Roman, serif', padding: 0, background: '#fff' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #245EDB 0%, #1A45B5 60%, #0A246A 100%)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <div style={{ fontSize: 48 }}>🌐</div>
        <div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
            Welcome to Portfolio XP
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>
            Your personal developer portfolio — Internet Explorer edition
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, textAlign: 'right' }}>
          <div>Microsoft® Internet Explorer</div>
          <div>Version 6.0 (Portfolio Edition)</div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Main */}
        <div style={{ flex: 1, padding: 20 }}>
          <h2 style={{ fontSize: 14, color: '#245EDB', borderBottom: '2px solid #245EDB', paddingBottom: 4, marginBottom: 12 }}>
            📂 My Portfolio
          </h2>
          <p style={{ fontSize: 12, lineHeight: 1.7, color: '#333', marginBottom: 16 }}>
            Hello! I'm a full-stack developer who builds interactive, performant web applications.
            Browse my projects below, or use the links panel to navigate quickly.
          </p>

          {/* Category tiles */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { cat: 'Web', emoji: '🌐', desc: 'React, Next.js, Three.js', color: '#245EDB' },
              { cat: 'Data', emoji: '📊', desc: 'ETL, Spark, Visualization', color: '#1A5C1A' },
              { cat: 'ML', emoji: '🧠', desc: 'PyTorch, NLP, CV', color: '#8B4500' },
            ].map(({ cat, emoji, desc, color }) => (
              <div
                key={cat}
                onClick={() => navigate(`portfolio://projects/${cat}`)}
                style={{
                  border: `2px solid ${color}`,
                  borderRadius: 4,
                  padding: '12px 20px',
                  cursor: 'pointer',
                  width: 160,
                  textAlign: 'center',
                  background: '#FAFAFA',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#EEF4FF'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FAFAFA'}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{emoji}</div>
                <div style={{ fontWeight: 'bold', color, fontSize: 13 }}>{cat} Projects</div>
                <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>

          <Divider />
          <h2 style={{ fontSize: 14, color: '#245EDB', borderBottom: '2px solid #245EDB', paddingBottom: 4, marginBottom: 12 }}>
            🔗 Quick Links
          </h2>
          {[
            { label: 'All Projects', url: 'portfolio://projects' },
            { label: 'GitHub Profile', url: 'https://github.com' },
            { label: 'LinkedIn', url: 'https://linkedin.com' },
            { label: 'My Resume (PDF)', url: 'https://example.com/resume.pdf' },
          ].map(({ label, url }) => (
            <div
              key={label}
              style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}
            >
              <span style={{ fontSize: 12 }}>▶</span>
              <span
                onClick={() => navigate(url)}
                style={{ color: '#0054E3', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{
          width: 180,
          background: '#ECE9D8',
          borderLeft: '1px solid #ACA899',
          padding: 12,
          flexShrink: 0,
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 11, color: '#0A246A', marginBottom: 8 }}>
            FAVORITES
          </div>
          {[
            { label: '🏠 Home', url: HOME_URL },
            { label: '📁 Projects', url: 'portfolio://projects' },
            { label: '🌐 Web Projects', url: 'portfolio://projects/Web' },
            { label: '📊 Data Projects', url: 'portfolio://projects/Data' },
            { label: '🧠 ML Projects', url: 'portfolio://projects/ML' },
            { label: '🐙 GitHub', url: 'https://github.com' },
          ].map(({ label, url }) => (
            <div
              key={label}
              onClick={() => navigate(url)}
              style={{
                padding: '3px 6px',
                fontSize: 11,
                fontFamily: 'Tahoma, sans-serif',
                cursor: 'pointer',
                color: '#0054E3',
                borderRadius: 2,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#316AC5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              {label}
            </div>
          ))}

          <div style={{ marginTop: 14, fontWeight: 'bold', fontSize: 11, color: '#0A246A', marginBottom: 6 }}>
            SITE INFO
          </div>
          <div style={{ fontSize: 10, color: '#555', lineHeight: 1.7 }}>
            <div>📅 Updated: Mar 2026</div>
            <div>🖥️ Best viewed: 1024×768</div>
            <div>🌐 IE 6.0+</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #ACA899',
        background: '#ECE9D8',
        padding: '6px 20px',
        fontSize: 10,
        color: '#666',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>© 2026 Portfolio Dev. All rights reserved.</span>
        <span>Internet Explorer 6 — Portfolio Edition</span>
      </div>
    </div>
  );
}

// ── Project List Page ─────────────────────────────────────────────────────────
function ProjectListPage({ category, navigate }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `/api/projects/category/${category}`
      : '/api/projects';
    axios.get(url)
      .then((r) => setProjects(r.data))
      .catch(() => setError('Cannot connect to server.'))
      .finally(() => setLoading(false));
  }, [category]);

  const CAT_COLOR = { Web: '#245EDB', Data: '#1A5C1A', ML: '#8B4500' };
  const title = category ? `${category} Projects` : 'All Projects';

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', background: '#fff', minHeight: '100%' }}>
      {/* Page heading */}
      <div style={{
        background: 'linear-gradient(180deg, #ECE9D8 0%, #D4D0C8 100%)',
        borderBottom: '1px solid #ACA899',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ fontSize: 24 }}>
          {{ Web: '🌐', Data: '📊', ML: '🧠' }[category] || '📁'}
        </span>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 14, color: '#0A246A' }}>{title}</div>
          <div style={{ fontSize: 11, color: '#555' }}>
            {`http://portfolio.winxp.local/projects${category ? `/${category.toLowerCase()}` : ''}`}
          </div>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 11, marginBottom: 16, color: '#555' }}>
          <span
            style={{ color: '#0054E3', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate(HOME_URL)}
          >Home</span>
          <span> › </span>
          {category ? (
            <>
              <span
                style={{ color: '#0054E3', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => navigate('portfolio://projects')}
              >Projects</span>
              <span> › </span>
              <span>{category}</span>
            </>
          ) : (
            <span>Projects</span>
          )}
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '2px solid #245EDB' }}>
          {[null, 'Web', 'Data', 'ML'].map((cat) => {
            const isActive = cat === category;
            return (
              <div
                key={cat || 'all'}
                onClick={() => navigate(cat ? `portfolio://projects/${cat}` : 'portfolio://projects')}
                style={{
                  padding: '4px 14px',
                  fontSize: 11,
                  cursor: 'pointer',
                  background: isActive ? '#245EDB' : '#ECE9D8',
                  color: isActive ? '#fff' : '#000',
                  border: '1px solid #ACA899',
                  borderBottom: 'none',
                  borderRadius: '3px 3px 0 0',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                {cat || 'All'}
              </div>
            );
          })}
        </div>

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555', fontSize: 12, padding: 20 }}>
            <div className="ie-spinner" />⏳ Loading projects from server...
          </div>
        )}

        {error && (
          <div style={{
            padding: 16,
            background: '#FFF8E1',
            border: '1px solid #F0C040',
            fontSize: 12,
            color: '#5A3A00',
          }}>
            ⚠️ {error} &nbsp;
            <span
              style={{ color: '#0054E3', textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => setProjects(DEMO_PROJECTS.filter(p => !category || p.category === category))}
            >
              Load demo data instead
            </span>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div style={{ fontSize: 12, color: '#888', padding: 20 }}>No projects found.</div>
        )}

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {projects.map((proj) => {
            const catColor = CAT_COLOR[proj.category] || '#245EDB';
            return (
              <div
                key={proj.slug}
                onClick={() => navigate(`portfolio://project/${proj.slug}`)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  padding: '10px 14px',
                  border: '1px solid #D4D0C8',
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: '#FAFAFA',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F0F4FF'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#FAFAFA'}
              >
                <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{proj.icon || '📄'}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 'bold', color: '#0054E3', fontSize: 13 }}>{proj.title}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 2, lineHeight: 1.5 }}>
                    {proj.description?.slice(0, 120)}...
                  </div>
                  <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {(proj.techStack || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: '#E8EFFE',
                          border: `1px solid ${catColor}40`,
                          color: catColor,
                          fontSize: 10,
                          padding: '1px 6px',
                          borderRadius: 2,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ flexShrink: 0, color: '#0054E3', fontSize: 20, alignSelf: 'center' }}>›</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Individual Project Page ───────────────────────────────────────────────────
function ProjectPage({ slug, navigate }) {
  const [proj, setProj] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    axios.get(`/api/projects/${slug}`)
      .then((r) => setProj(r.data))
      .catch(() => {
        // fallback to demo
        const demo = DEMO_PROJECTS.find((p) => p.slug === slug);
        if (demo) setProj(demo);
      });
  }, [slug]);

  if (!proj) return (
    <div style={{ padding: 24, fontSize: 12, fontFamily: 'Tahoma, sans-serif', color: '#555' }}>
      ⏳ Loading project...
    </div>
  );

  const imgs = proj.images || [];

  return (
    <div style={{ fontFamily: 'Tahoma, sans-serif', background: '#fff', minHeight: '100%' }}>
      {/* Breadcrumb */}
      <div style={{
        background: '#ECE9D8',
        borderBottom: '1px solid #ACA899',
        padding: '6px 20px',
        fontSize: 11,
        color: '#555',
      }}>
        <span onClick={() => navigate(HOME_URL)} style={{ color: '#0054E3', cursor: 'pointer', textDecoration: 'underline' }}>Home</span>
        <span> › </span>
        <span onClick={() => navigate('portfolio://projects')} style={{ color: '#0054E3', cursor: 'pointer', textDecoration: 'underline' }}>Projects</span>
        <span> › </span>
        <span onClick={() => navigate(`portfolio://projects/${proj.category}`)} style={{ color: '#0054E3', cursor: 'pointer', textDecoration: 'underline' }}>{proj.category}</span>
        <span> › </span>
        <span>{proj.title}</span>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: 20, minWidth: 0 }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 32 }}>{proj.icon || '📄'}</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 18, color: '#0A246A' }}>{proj.title}</h1>
              <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>
                {`http://portfolio.winxp.local/projects/${slug}`}
              </div>
            </div>
          </div>

          {/* Image carousel */}
          {imgs.length > 0 && (
            <div style={{ marginBottom: 16, position: 'relative', border: '2px inset #808080' }}>
              <img
                src={imgs[imgIdx]?.url}
                alt={imgs[imgIdx]?.caption}
                style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.src = `https://picsum.photos/seed/${slug}/800/450`; }}
              />
              {imgs.length > 1 && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', pointerEvents: 'none' }}>
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + imgs.length) % imgs.length); }}
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, padding: '4px 10px', pointerEvents: 'all', borderRadius: 2 }}
                  >‹</button>
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % imgs.length); }}
                    style={{ background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 18, padding: '4px 10px', pointerEvents: 'all', borderRadius: 2 }}
                  >›</button>
                </div>
              )}
              <div style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 10, padding: '2px 8px', textAlign: 'right' }}>
                {imgs[imgIdx]?.caption} ({imgIdx + 1}/{imgs.length})
              </div>
            </div>
          )}

          {/* Description */}
          <div style={{ fontSize: 12, lineHeight: 1.7, color: '#333', marginBottom: 16 }}>
            {proj.description}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {proj.liveUrl ? (
              <button
                className="xp-btn"
                onClick={() => navigate(proj.liveUrl)}
                style={{ background: 'linear-gradient(180deg,#FFE066,#FFB800)', border: '1px solid #806000', fontWeight: 'bold', padding: '4px 16px', fontSize: 11 }}
              >
                🌐 View Live Demo
              </button>
            ) : (
              <button className="xp-btn" disabled style={{ opacity: 0.5, padding: '4px 16px', fontSize: 11 }}>
                🌐 Live Demo (N/A)
              </button>
            )}
            {proj.githubUrl && (
              <button
                className="xp-btn"
                onClick={() => navigate(proj.githubUrl)}
                style={{ padding: '4px 16px', fontSize: 11 }}
              >
                🐙 View on GitHub
              </button>
            )}
            <button
              className="xp-btn"
              onClick={() => navigate(`portfolio://projects/${proj.category}`)}
              style={{ padding: '4px 16px', fontSize: 11 }}
            >
              ← Back to {proj.category}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{
          width: 170,
          background: '#ECE9D8',
          borderLeft: '1px solid #ACA899',
          padding: 12,
          flexShrink: 0,
        }}>
          <div style={{ fontWeight: 'bold', fontSize: 11, color: '#0A246A', marginBottom: 8 }}>TECH STACK</div>
          {(proj.techStack || []).map((tech) => (
            <div key={tech} style={{ fontSize: 11, padding: '2px 0', borderBottom: '1px dotted #ACA899', color: '#333' }}>
              ▪ {tech}
            </div>
          ))}

          <div style={{ fontWeight: 'bold', fontSize: 11, color: '#0A246A', marginTop: 14, marginBottom: 8 }}>DETAILS</div>
          <div style={{ fontSize: 11, color: '#555', lineHeight: 1.9 }}>
            <div><b>Category:</b> {proj.category}</div>
            <div><b>Status:</b> {proj.liveUrl ? '🟢 Live' : '⚫ Portfolio'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── External iframe page ───────────────────────────────────────────────────────
function ExternalPage({ url }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!loaded && (
        <div style={{
          padding: '6px 12px',
          background: '#FFF8DC',
          borderBottom: '1px solid #D4C000',
          fontSize: 11,
          fontFamily: 'Tahoma, sans-serif',
          color: '#555',
        }}>
          ⚠️ Some content may be blocked by the browser's iframe security policy.
        </div>
      )}
      <iframe
        src={url}
        style={{ flex: 1, border: 'none' }}
        onLoad={() => setLoaded(true)}
        title="External content"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}

// ── 404 page ──────────────────────────────────────────────────────────────────
function NotFoundPage({ url, navigate }) {
  return (
    <div style={{ padding: 40, fontFamily: 'Tahoma, sans-serif', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🚫</div>
      <h2 style={{ color: '#CC0000', fontSize: 16, marginBottom: 8 }}>
        The page cannot be displayed
      </h2>
      <p style={{ fontSize: 12, color: '#555', marginBottom: 16 }}>
        Internet Explorer cannot display the webpage: <br />
        <code style={{ background: '#F5F5F5', padding: '2px 6px', fontSize: 11 }}>{url}</code>
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        <button className="xp-btn" onClick={() => navigate(HOME_URL)} style={{ fontSize: 11, padding: '4px 16px' }}>
          🏠 Go to Home Page
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Demo projects (shown when API is offline)
// ─────────────────────────────────────────────────────────────────────────────
const DEMO_PROJECTS = [
  { slug: 'winxp-portfolio', title: 'WinXP Portfolio', category: 'Web', icon: '🖥️', description: 'A full-stack portfolio website that replicates the Windows XP desktop experience.', techStack: ['React', 'Vite', 'Zustand', 'Express', 'MongoDB'], liveUrl: 'https://example.com', githubUrl: 'https://github.com', images: [{ url: 'https://picsum.photos/seed/winxp1/800/450', caption: 'Desktop View' }] },
  { slug: 'zero-g', title: 'Zero-G Atrium', category: 'Web', icon: '🚀', description: 'React Three Fiber portfolio with orbital satellites and mouse repulsion physics.', techStack: ['React', 'Three.js', 'GSAP'], liveUrl: null, githubUrl: 'https://github.com', images: [{ url: 'https://picsum.photos/seed/zerog/800/450', caption: 'Orbital View' }] },
  { slug: 'nlp-engine', title: 'NLP Sentiment Engine', category: 'ML', icon: '🧠', description: 'BERT-based sentiment analysis microservice with Redis caching and K8s.', techStack: ['PyTorch', 'FastAPI', 'Redis'], liveUrl: null, githubUrl: 'https://github.com', images: [{ url: 'https://picsum.photos/seed/nlp/800/450', caption: 'Architecture' }] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────────────────────────────
function renderPage(url, navigate) {
  if (url === HOME_URL || url === 'portfolio://home')
    return <HomePage navigate={navigate} />;
  if (url === 'portfolio://projects')
    return <ProjectListPage category={null} navigate={navigate} />;
  if (url.startsWith('portfolio://projects/')) {
    const cat = url.replace('portfolio://projects/', '');
    return <ProjectListPage category={cat} navigate={navigate} />;
  }
  if (url.startsWith('portfolio://project/')) {
    const slug = url.replace('portfolio://project/', '');
    return <ProjectPage slug={slug} navigate={navigate} />;
  }
  if (url.startsWith('http') || url.startsWith('//'))
    return <ExternalPage url={url} />;
  return <NotFoundPage url={url} navigate={navigate} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Divider helper
// ─────────────────────────────────────────────────────────────────────────────
function Divider() {
  return <div style={{ height: 1, background: '#ACA899', margin: '12px 0' }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// IE Toolbar button
// ─────────────────────────────────────────────────────────────────────────────
function IEBtn({ onClick, disabled, title, children }) {
  return (
    <button
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      disabled={disabled}
      title={title}
      style={{
        background: 'none',
        border: '1px solid transparent',
        padding: '3px 8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: 11,
        color: disabled ? '#999' : '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        minWidth: 38,
        opacity: disabled ? 0.5 : 1,
        borderRadius: 2,
        userSelect: 'none',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = '#D4D0C8'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function InternetExplorer() {
  // ── History stack ─────────────────────────────────────
  const [history, setHistory] = useState([HOME_URL]);
  const [histIdx, setHistIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [throbber, setThrobber] = useState(false);
  const [addressInput, setAddressInput] = useState(toDisplayUrl(HOME_URL));
  const [addressFocused, setAddressFocused] = useState(false);
  const loadTimer = useRef(null);

  const currentUrl = history[histIdx];
  const canBack = histIdx > 0;
  const canFwd = histIdx < history.length - 1;

  // ── Simulate page load ────────────────────────────────
  const simulateLoad = useCallback((cb) => {
    clearTimeout(loadTimer.current);
    setLoading(true);
    setThrobber(true);
    setLoadPct(0);

    let pct = 0;
    const tick = () => {
      pct = Math.min(pct + Math.random() * 28 + 8, 95);
      setLoadPct(Math.floor(pct));
      if (pct < 95) {
        loadTimer.current = setTimeout(tick, 80 + Math.random() * 120);
      } else {
        loadTimer.current = setTimeout(() => {
          setLoadPct(100);
          setLoading(false);
          setThrobber(false);
          cb?.();
        }, 200);
      }
    };
    loadTimer.current = setTimeout(tick, 60);
  }, []);

  useEffect(() => () => clearTimeout(loadTimer.current), []);

  // ── Navigate ──────────────────────────────────────────
  const navigate = useCallback((url) => {
    if (!url) return;
    const resolved = url.trim();

    simulateLoad(() => {
      setHistory((h) => {
        const newH = [...h.slice(0, histIdx + 1), resolved];
        setHistIdx(newH.length - 1);
        return newH;
      });
      setAddressInput(toDisplayUrl(resolved));
    });
  }, [histIdx, simulateLoad]);

  // Start initial load animation
  useEffect(() => { simulateLoad(); }, []); // eslint-disable-line

  // ── Back / Forward ────────────────────────────────────
  const goBack = () => {
    if (!canBack) return;
    const newIdx = histIdx - 1;
    simulateLoad(() => {
      setHistIdx(newIdx);
      setAddressInput(toDisplayUrl(history[newIdx]));
    });
  };

  const goFwd = () => {
    if (!canFwd) return;
    const newIdx = histIdx + 1;
    simulateLoad(() => {
      setHistIdx(newIdx);
      setAddressInput(toDisplayUrl(history[newIdx]));
    });
  };

  const refresh = () => simulateLoad();

  const goHome = () => navigate(HOME_URL);

  // ── Address bar submit ────────────────────────────────
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    let url = addressInput.trim();
    // Convert display URL back to internal if applicable
    if (url === 'http://portfolio.winxp.local/' || url === 'http://portfolio.winxp.local') url = HOME_URL;
    else if (url === 'http://portfolio.winxp.local/projects') url = 'portfolio://projects';
    else if (url.startsWith('http://portfolio.winxp.local/projects/')) {
      const rest = url.replace('http://portfolio.winxp.local/projects/', '');
      // Could be a category or slug
      const cat = rest.charAt(0).toUpperCase() + rest.slice(1);
      url = ['Web', 'Data', 'ML'].includes(cat)
        ? `portfolio://projects/${cat}`
        : `portfolio://project/${rest}`;
    }
    navigate(url);
  };

  // ── IE menus ──────────────────────────────────────────
  const IE_MENUS = ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'Tahoma, sans-serif' }}>

      {/* ── IE Menu bar ─────────────────────────── */}
      <div style={{
        background: '#ECE9D8',
        borderBottom: '1px solid #ACA899',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        userSelect: 'none',
      }}>
        {IE_MENUS.map((m) => (
          <div
            key={m}
            style={{ padding: '2px 8px', fontSize: 11, cursor: 'default' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#316AC5'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            {m}
          </div>
        ))}
      </div>

      {/* ── IE Toolbar ──────────────────────────── */}
      <div style={{
        background: 'linear-gradient(180deg, #F5F5F5 0%, #E8E4DC 100%)',
        borderBottom: '1px solid #ACA899',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: '2px 4px',
        flexShrink: 0,
      }}>
        {/* Navigation buttons */}
        <IEBtn onClick={goBack} disabled={!canBack || loading} title="Back">
          <span style={{ fontSize: 14 }}>◀</span>
          <span style={{ fontSize: 9 }}>Back</span>
        </IEBtn>

        <IEBtn onClick={goFwd} disabled={!canFwd || loading} title="Forward">
          <span style={{ fontSize: 14 }}>▶</span>
          <span style={{ fontSize: 9 }}>Forward</span>
        </IEBtn>

        <IEBtn onClick={loading ? () => { } : refresh} title={loading ? 'Stop' : 'Refresh'}>
          <span style={{ fontSize: 14 }}>{loading ? '✖' : '🔄'}</span>
          <span style={{ fontSize: 9 }}>{loading ? 'Stop' : 'Refresh'}</span>
        </IEBtn>

        <IEBtn onClick={goHome} disabled={loading} title="Home">
          <span style={{ fontSize: 14 }}>🏠</span>
          <span style={{ fontSize: 9 }}>Home</span>
        </IEBtn>

        {/* Separator */}
        <div style={{ width: 1, height: 32, background: '#ACA899', margin: '0 4px' }} />

        <IEBtn title="Search" onClick={() => navigate('portfolio://projects')}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <span style={{ fontSize: 9 }}>Search</span>
        </IEBtn>

        <IEBtn title="Favorites" onClick={() => navigate(HOME_URL)}>
          <span style={{ fontSize: 14 }}>⭐</span>
          <span style={{ fontSize: 9 }}>Favorites</span>
        </IEBtn>

        <IEBtn title="History">
          <span style={{ fontSize: 14 }}>📋</span>
          <span style={{ fontSize: 9 }}>History</span>
        </IEBtn>

        {/* Separator */}
        <div style={{ width: 1, height: 32, background: '#ACA899', margin: '0 4px' }} />

        {/* Flex spacer */}
        <div style={{ flex: 1 }} />

        {/* Throbber */}
        <div style={{
          width: 28,
          height: 28,
          border: '2px solid #ACA899',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 4,
          background: '#fff',
          fontSize: 16,
        }}>
          {throbber ? (
            <span style={{
              display: 'inline-block',
              animation: 'spin 1s linear infinite',
            }}>🌐</span>
          ) : '🌐'}
        </div>
      </div>

      {/* ── Address bar ─────────────────────────── */}
      <div style={{
        background: '#ECE9D8',
        borderBottom: '1px solid #ACA899',
        display: 'flex',
        alignItems: 'center',
        padding: '2px 6px',
        gap: 6,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 11, color: '#444', whiteSpace: 'nowrap', flexShrink: 0 }}>Address</span>
        <div style={{
          flex: 1,
          background: '#fff',
          border: '2px inset #808080',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2px',
          height: 22,
        }}>
          {/* Lock/page icon */}
          <span style={{ fontSize: 12, marginRight: 3, color: '#555' }}>
            {currentUrl.startsWith('https') ? '🔒' : '🌐'}
          </span>
          <form onSubmit={handleAddressSubmit} style={{ flex: 1, display: 'flex' }}>
            <input
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onFocus={() => { setAddressFocused(true); }}
              onBlur={() => setAddressFocused(false)}
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontFamily: 'Tahoma, sans-serif',
                fontSize: 11,
                background: 'transparent',
                color: '#000',
              }}
            />
          </form>
        </div>
        <button
          className="xp-btn"
          onClick={handleAddressSubmit}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ fontSize: 11, padding: '1px 10px', flexShrink: 0 }}
        >
          Go
        </button>
        {/* Links bar dropdown */}
        <span style={{ fontSize: 11, color: '#444', flexShrink: 0, cursor: 'default' }}>Links »</span>
      </div>

      {/* ── Links bar ───────────────────────────── */}
      <div style={{
        background: '#ECE9D8',
        borderBottom: '1px solid #ACA899',
        display: 'flex',
        alignItems: 'center',
        padding: '1px 6px',
        gap: 2,
        flexShrink: 0,
        overflowX: 'auto',
      }}>
        <span style={{ fontSize: 10, color: '#444', marginRight: 4, flexShrink: 0 }}>Links:</span>
        {[
          { label: '🏠 Home', url: HOME_URL },
          { label: '🌐 Web Projects', url: 'portfolio://projects/Web' },
          { label: '📊 Data Projects', url: 'portfolio://projects/Data' },
          { label: '🧠 ML Projects', url: 'portfolio://projects/ML' },
          { label: '📁 All Projects', url: 'portfolio://projects' },
        ].map(({ label, url }) => (
          <button
            key={label}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => navigate(url)}
            style={{
              background: '#ECE9D8',
              border: '1px solid #ACA899',
              fontSize: 10,
              fontFamily: 'Tahoma, sans-serif',
              padding: '1px 8px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#D4D0C8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#ECE9D8'}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Loading progress bar ─────────────────── */}
      {loading && (
        <div style={{
          height: 3,
          background: '#D4D0C8',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${loadPct}%`,
            background: 'linear-gradient(90deg, #245EDB, #4A90FF)',
            transition: 'width 0.08s ease',
          }} />
        </div>
      )}

      {/* ── Content area ────────────────────────── */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        background: loading ? '#ECE9D8' : '#fff',
      }}>
        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 16,
          }}>
            <div style={{ fontSize: 48, animation: 'pulse 1s ease-in-out infinite' }}>🌐</div>
            <div style={{ fontFamily: 'Tahoma, sans-serif', fontSize: 13, color: '#333' }}>
              Opening page…
            </div>
            <div style={{ fontSize: 11, color: '#888' }}>{toDisplayUrl(currentUrl)}</div>
          </div>
        ) : (
          renderPage(currentUrl, navigate)
        )}
      </div>

      {/* ── Status bar ──────────────────────────── */}
      <div style={{
        background: '#ECE9D8',
        borderTop: '1px solid #ACA899',
        padding: '1px 0',
        display: 'flex',
        fontSize: 11,
        fontFamily: 'Tahoma, sans-serif',
        flexShrink: 0,
      }}>
        <div style={{ flex: 1, padding: '0 8px', borderRight: '1px solid #ACA899', color: '#444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {loading ? `Opening ${toDisplayUrl(currentUrl)}...` : 'Done'}
        </div>
        <div style={{ padding: '0 8px', borderRight: '1px solid #ACA899', color: '#666' }}>
          {loading ? `${loadPct}%` : ''}
        </div>
        <div style={{ padding: '0 48px 0 8px', color: '#666' }}>
          🌐 portfolio.winxp.local
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}

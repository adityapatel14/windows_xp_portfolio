import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ── Image Carousel ────────────────────────────────────────────────────────────
function Carousel({ images }) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{
        height: 200,
        background: '#D4D0C8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        color: '#666',
        border: '2px inset #808080',
      }}>
        No preview images available
      </div>
    );
  }

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div style={{ position: 'relative', background: '#000', border: '2px inset #808080' }}>
      <img
        src={images[idx].url}
        alt={images[idx].caption || `Screenshot ${idx + 1}`}
        style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${idx}/800/450`; }}
      />

      {/* Caption strip */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.6)',
        color: '#fff',
        fontSize: 10,
        padding: '3px 8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>{images[idx].caption || `Image ${idx + 1}`}</span>
        <span style={{ color: 'rgba(255,255,255,0.6)' }}>{idx + 1} / {images.length}</span>
      </div>

      {/* Nav buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: 'absolute',
              left: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 2,
              color: '#fff',
              cursor: 'pointer',
              padding: '2px 8px',
              fontSize: 14,
            }}
          >‹</button>
          <button
            onClick={next}
            style={{
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 2,
              color: '#fff',
              cursor: 'pointer',
              padding: '2px 8px',
              fontSize: 14,
            }}
          >›</button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: 28,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
        }}>
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: i === idx ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Category badge color map ──────────────────────────────────────────────────
const CATEGORY_COLORS = {
  Web:  { bg: '#E3EDFF', color: '#245EDB', border: '#90B8F8' },
  Data: { bg: '#E7F7E7', color: '#1A5C1A', border: '#7EC87E' },
  ML:   { bg: '#FFF3E0', color: '#8B4500', border: '#FFAA44' },
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function ProjectViewer({ windowId }) {
  // windowId format: "project-<slug>"
  const slug = windowId ? windowId.replace(/^project-/, '') : null;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    axios.get(`/api/projects/${slug}`)
      .then((r) => setProject(r.data))
      .catch(() => setError('Could not load project details.'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontFamily: 'Tahoma, sans-serif', fontSize: 11 }}>
        ⏳ Loading project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{ padding: 16, fontFamily: 'Tahoma, sans-serif', fontSize: 11, color: '#a00' }}>
        ⚠️ {error || 'Project not found.'}
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[project.category] || CATEGORY_COLORS.Web;

  return (
    <div style={{
      fontFamily: 'Tahoma, sans-serif',
      fontSize: 11,
      height: '100%',
      overflowY: 'auto',
      background: '#fff',
    }}>
      {/* ── Header ─────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #245EDB 0%, #0A246A 100%)',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 14,
      }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          flexShrink: 0,
        }}>
          {project.icon || '📄'}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 3 }}>
            {project.title}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{
              background: catStyle.bg,
              color: catStyle.color,
              border: `1px solid ${catStyle.border}`,
              borderRadius: 10,
              padding: '1px 8px',
              fontSize: 10,
              fontWeight: 'bold',
            }}>
              {project.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10 }}>
              {project.techStack?.length} technologies
            </span>
          </div>
        </div>
      </div>

      {/* ── Images carousel ────────────────────── */}
      <Carousel images={project.images} />

      {/* ── Body ───────────────────────────────── */}
      <div style={{ padding: '12px 16px', display: 'flex', gap: 16 }}>

        {/* Left column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Section title="Description">
            <p style={{ lineHeight: 1.7, color: '#222', whiteSpace: 'pre-wrap' }}>
              {project.description}
            </p>
          </Section>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="xp-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  textDecoration: 'none',
                  color: '#000',
                  background: 'linear-gradient(180deg,#FFE066 0%,#FFB800 100%)',
                  border: '1px solid #806000',
                  fontWeight: 'bold',
                  padding: '4px 14px',
                  fontSize: 11,
                }}
              >
                🌐 View Live
              </a>
            ) : (
              <button
                disabled
                className="xp-btn"
                style={{ opacity: 0.5, padding: '4px 14px', fontSize: 11 }}
              >
                🌐 View Live (N/A)
              </button>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="xp-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  textDecoration: 'none',
                  color: '#000',
                  padding: '4px 14px',
                  fontSize: 11,
                }}
              >
                🐙 GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: 160, flexShrink: 0 }}>
          <Section title="Tech Stack">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {(project.techStack || []).map((tech) => (
                <div
                  key={tech}
                  style={{
                    background: '#ECE9D8',
                    border: '1px solid #ACA899',
                    borderRadius: 2,
                    padding: '2px 6px',
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span style={{ color: '#245EDB' }}>▪</span>
                  {tech}
                </div>
              ))}
            </div>
          </Section>

          <Section title="Properties">
            <div style={{ color: '#555', lineHeight: 1.8, fontSize: 11 }}>
              <div><b>Category:</b> {project.category}</div>
              <div><b>Stack:</b> {project.techStack?.length} tools</div>
              <div>
                <b>Status:</b>{' '}
                <span style={{ color: project.liveUrl ? '#1A5C1A' : '#888' }}>
                  {project.liveUrl ? '🟢 Live' : '⚫ Offline'}
                </span>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontWeight: 'bold',
        color: '#0A246A',
        borderBottom: '2px solid #245EDB',
        paddingBottom: 2,
        marginBottom: 6,
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

import React, { useState, lazy, Suspense } from "react";

// Lazy-load the heavy dashboard to avoid slowing initial bundle
const InternshipDashboard = lazy(() =>
  import("./Dashboard/InternshipDashboard")
);

// ── Image Carousel ─────────────────────────────────────────
function Carousel({ images }) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{
        height: 200,
        background: "#D4D0C8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        color: "#666",
        border: "2px inset #808080",
      }}>
        No preview images available
      </div>
    );
  }

  return (
    <div style={{ position: "relative", border: "2px inset #808080" }}>
      <img
        src={images[idx]}
        alt=""
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      {images.length > 1 && (
        <>
          <button onClick={() => setIdx((idx - 1 + images.length) % images.length)}>‹</button>
          <button onClick={() => setIdx((idx + 1) % images.length)}>›</button>
        </>
      )}
    </div>
  );
}

// ── Loading fallback (XP style) ───────────────────────────
function DashboardLoading() {
  return (
    <div style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#D4D0C8",
      fontFamily: "Tahoma",
      fontSize: 12,
      color: "#444",
      gap: 8,
    }}>
      <span>⏳</span> Loading dashboard...
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────
export default function ProjectViewer({ data }) {
  if (!data) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        ⚠️ No project data received
      </div>
    );
  }

  // ── Data-analysis projects → show interactive dashboard ──
  if (data.type === "data-analysis") {
    return (
      <div style={{ height: "100%", overflow: "hidden" }}>
        <Suspense fallback={<DashboardLoading />}>
          <InternshipDashboard data={data} />
        </Suspense>
      </div>
    );
  }

  // ── All other projects → original card view ───────────────
  return (
    <div style={{ padding: 16, fontFamily: "Tahoma", fontSize: 12 }}>
      {/* HEADER */}
      <div style={{
        background: "#245EDB",
        color: "#fff",
        padding: 10,
        marginBottom: 10,
      }}>
        <b>{data.title}.exe</b>
      </div>

      <Carousel images={data.images} />

      <p style={{ marginTop: 10 }}>{data.description}</p>

      {data.your_work && (
        <div>
          <b>Your Work:</b>
          <p>{data.your_work}</p>
        </div>
      )}

      <div>
        <b>Tech Stack:</b> {data.tech?.join(", ")}
      </div>

      <div style={{ marginTop: 15, display: "flex", gap: 10 }}>
        {data.github && (
          <button onClick={() => window.open(data.github, "_blank")}>
            🔗 GitHub
          </button>
        )}
        {data.live && (
          <button onClick={() => window.open(data.live, "_blank")}>
            🌐 Live
          </button>
        )}
      </div>
    </div>
  );
}
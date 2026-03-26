import React, { useState } from "react";

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

// ── MAIN COMPONENT ─────────────────────────────────────────
export default function ProjectViewer({ data }) {

  // ❗ DIRECTLY USE DATA (NO SERVICE, NO SLUG)
  if (!data) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        ⚠️ No project data received
      </div>
    );
  }

  return (
    <div style={{ padding: 16, fontFamily: "Tahoma", fontSize: 12 }}>

      {/* HEADER */}
      <div style={{
        background: "#245EDB",
        color: "#fff",
        padding: 10,
        marginBottom: 10
      }}>
        <b>{data.title}.exe</b>
      </div>

      {/* IMAGE */}
      <Carousel images={data.images} />

      {/* DESCRIPTION */}
      <p style={{ marginTop: 10 }}>{data.description}</p>

      {/* YOUR WORK */}
      {data.your_work && (
        <div>
          <b>Your Work:</b>
          <p>{data.your_work}</p>
        </div>
      )}

      {/* TECH */}
      <div>
        <b>Tech Stack:</b> {data.tech?.join(", ")}
      </div>

      {/* BUTTONS */}
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
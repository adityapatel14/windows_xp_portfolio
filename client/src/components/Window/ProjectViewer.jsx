import React from "react";

export default function ProjectViewer({ data }) {
  if (!data) {
    return <div style={{ padding: 20 }}>No data</div>;
  }

  return (
    <div style={{
      padding: 16,
      fontFamily: "Tahoma",
      fontSize: 12,
      background: "#fff",
      height: "100%",
      overflow: "auto"
    }}>

      {/* Title */}
      <h2 style={{ marginBottom: 10 }}>
        {data.title}.exe
      </h2>

      {/* Description */}
      <p style={{ marginBottom: 10 }}>
        {data.description}
      </p>

      {/* Tech Stack */}
      <div style={{ marginBottom: 10 }}>
        <b>Tech Stack:</b>
        <div>{data.tech?.join(", ")}</div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, marginTop: 15 }}>

        {data.github && (
          <button
            onClick={() => window.open(data.github, "_blank")}
            className="xp-btn"
          >
            🔗 View Code
          </button>
        )}

        <button
          onClick={() => window.open('https://linkedin.com/in/aditya-kaushik-patel', '_blank')}
          className="xp-btn"
        >
          💼 View Profile
        </button>

        {data.live && (
          <button
            onClick={() => window.open(data.live, "_blank")}
            className="xp-btn"
          >
            🌐 Live Demo
          </button>
        )}

      </div>
    </div>
  );
}
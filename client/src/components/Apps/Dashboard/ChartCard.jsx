import React from "react";

export default function ChartCard({ title, children, style }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "2px solid #808080",
        boxShadow: "inset -1px -1px 0 #dfdfdf, inset 1px 1px 0 #fff",
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          background: "#D4D0C8",
          borderBottom: "1px solid #808080",
          padding: "4px 8px",
          fontSize: 10,
          fontWeight: "bold",
          fontFamily: "Tahoma, sans-serif",
          color: "#000",
          flexShrink: 0,
        }}
      >
        {title}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", padding: "6px 4px 4px" }}>
        {children}
      </div>
    </div>
  );
}

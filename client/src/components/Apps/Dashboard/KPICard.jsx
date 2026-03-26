import React from "react";

export default function KPICard({ label, value, sub, dark }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 110,
        background: dark ? "#8B1A1A" : "#D4D0C8",
        border: dark ? "2px solid #5a0000" : "2px solid #808080",
        boxShadow: dark
          ? "inset 1px 1px 0 rgba(255,255,255,0.15)"
          : "inset -1px -1px 0 #808080, inset 1px 1px 0 #fff",
        padding: "10px 12px",
        textAlign: "center",
        fontFamily: "Tahoma, sans-serif",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: "bold",
          color: dark ? "rgba(255,255,255,0.75)" : "#444",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: dark ? "#ffffff" : "#8B1A1A",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 9,
            color: dark ? "rgba(255,255,255,0.6)" : "#666",
            marginTop: 3,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

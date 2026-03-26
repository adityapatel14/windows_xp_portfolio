import React from "react";

const BTN_GROUPS = [
  { section: "YEAR", items: ["ALL", "FY", "LY", "SY", "TY"] },
  { section: "TYPE", items: ["ALL_TYPE", "External", "In-house"] },
  { section: "SEM", items: ["EVEN", "ODD"] },
];

// Display labels
const LABELS = {
  ALL: "Select all",
  ALL_TYPE: "Select all",
  FY: "FY", LY: "LY", SY: "SY", TY: "TY",
  External: "External",
  "In-house": "In-house",
  EVEN: "EVEN",
  ODD: "ODD",
};

export default function FilterPanel({ filters, onToggle }) {
  const activeSet = new Set(Object.keys(filters).filter((k) => filters[k]));

  return (
    <div
      style={{
        width: 100,
        flexShrink: 0,
        background: "#8B1A1A",
        borderRight: "2px solid #5a0000",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        overflowY: "auto",
        padding: "8px 6px",
      }}
    >
      {/* Logo area */}
      <div
        style={{
          textAlign: "center",
          padding: "6px 4px 10px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          marginBottom: 8,
        }}
      >
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "Tahoma", lineHeight: 1.3 }}>
          INTERNSHIP
        </div>
        <div style={{ fontSize: 11, color: "#fff", fontFamily: "Tahoma", fontWeight: "bold" }}>
          FILTER
        </div>
      </div>

      {BTN_GROUPS.map(({ section, items }) => (
        <div key={section} style={{ marginBottom: 6 }}>
          {items.map((key) => {
            const isActive = activeSet.has(key);
            return (
              <button
                key={key}
                onClick={() => onToggle(key, section)}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: 3,
                  padding: "5px 4px",
                  fontFamily: "Tahoma, sans-serif",
                  fontSize: 10,
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "center",
                  border: isActive
                    ? "2px inset #3a0000"
                    : "2px outset #c07070",
                  background: isActive
                    ? "#5a0000"
                    : "#D4D0C8",
                  color: isActive ? "#fff" : "#333",
                  borderRadius: 1,
                  transition: "all 0.1s",
                }}
              >
                {LABELS[key]}
              </button>
            );
          })}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.2)",
              margin: "6px 0",
            }}
          />
        </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";

// No external dependencies for this tokeniser

const THEMES = {
  dark: {
    bg: "#1e1e1e", lineNumBg: "#252526", lineNumColor: "#858585",
    commentColor: "#6a9955", keywordColor: "#569cd6", stringColor: "#ce9178",
    numberColor: "#b5cea8", funcColor: "#dcdcaa", defaultColor: "#d4d4d4",
    punctColor: "#569cd6", headerBg: "#007acc",
  },
  light: {
    bg: "#ffffff", lineNumBg: "#f3f3f3", lineNumColor: "#999",
    commentColor: "#008000", keywordColor: "#0000ff", stringColor: "#a31515",
    numberColor: "#098658", funcColor: "#795e26", defaultColor: "#000",
    punctColor: "#0000ff", headerBg: "#2196f3",
  },
};

const SQL_KEYWORDS = new Set([
  "SELECT","FROM","WHERE","GROUP","BY","ORDER","HAVING","JOIN","LEFT","RIGHT","INNER",
  "ON","AS","AND","OR","NOT","IN","LIKE","BETWEEN","LIMIT","DISTINCT","COUNT","SUM",
  "AVG","MAX","MIN","ROUND","USE","INSERT","UPDATE","DELETE","CREATE","TABLE","DATABASE",
  "DROP","ALTER","SET","NULL","IS","ASC","DESC","UNION","ALL","CASE","WHEN","THEN","END",
  "ELSE","WITH","EXISTS","INTO","VALUES",
]);

const PY_KEYWORDS = new Set([
  "import","from","as","def","class","return","if","elif","else","for","while","in",
  "not","and","or","True","False","None","print","range","len","type","pass","break",
  "continue","lambda","yield","try","except","finally","with","global","nonlocal",
  "assert","del","raise",
]);

function highlightSQL(line) {
  // Comments
  if (/^\s*(--|\/\*)/.test(line)) {
    return <span style={{ color: THEMES.dark.commentColor }}>{line}</span>;
  }
  // Tokenise word by word
  const parts = line.split(/(\b\w+\b|'[^']*'|"[^"]*"|\d+\.?\d*|[^\w\s])/);
  return parts.map((tok, i) => {
    if (SQL_KEYWORDS.has(tok.toUpperCase()))
      return <span key={i} style={{ color: THEMES.dark.keywordColor, fontWeight: "bold" }}>{tok}</span>;
    if (/^'.*'$/.test(tok) || /^".*"$/.test(tok))
      return <span key={i} style={{ color: THEMES.dark.stringColor }}>{tok}</span>;
    if (/^\d+\.?\d*$/.test(tok))
      return <span key={i} style={{ color: THEMES.dark.numberColor }}>{tok}</span>;
    return <span key={i} style={{ color: THEMES.dark.defaultColor }}>{tok}</span>;
  });
}

function highlightPython(line) {
  if (/^\s*#/.test(line))
    return <span style={{ color: THEMES.dark.commentColor }}>{line}</span>;
  if (/^\s*"""/.test(line) || /^\s*'''/.test(line))
    return <span style={{ color: THEMES.dark.commentColor }}>{line}</span>;

  const parts = line.split(/(\b\w+\b|'[^']*'|"[^"]*"|\d+\.?\d*|[^\w\s])/);
  return parts.map((tok, i) => {
    if (PY_KEYWORDS.has(tok))
      return <span key={i} style={{ color: THEMES.dark.keywordColor, fontWeight: "bold" }}>{tok}</span>;
    if (/^'.*'$|^".*"$/.test(tok))
      return <span key={i} style={{ color: THEMES.dark.stringColor }}>{tok}</span>;
    if (/^\d+\.?\d*$/.test(tok))
      return <span key={i} style={{ color: THEMES.dark.numberColor }}>{tok}</span>;
    if (i > 0 && /\($/.test(parts[i - 1]))
      return <span key={i} style={{ color: THEMES.dark.funcColor }}>{tok}</span>;
    return <span key={i} style={{ color: THEMES.dark.defaultColor }}>{tok}</span>;
  });
}

export default function CodeViewer({ data }) {
  const { code = "", language = "sql", filename = "file.sql" } = data || {};
  const [wrapLines, setWrapLines] = useState(false);
  const [copied, setCopied]       = useState(false);

  const lines = code.split("\n");
  const t     = THEMES.dark;

  const langIcon  = language === "sql" ? "🗄️" : "🐍";
  const langLabel = language === "sql" ? "SQL" : "Python";

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", background: t.bg,
      fontFamily: "'Courier New', Courier, monospace",
    }}>
      {/* ── Header ──────────────────────────────── */}
      <div style={{
        background: t.headerBg, color: "#fff",
        padding: "5px 10px", display: "flex",
        alignItems: "center", gap: 8, flexShrink: 0,
        fontFamily: "Tahoma, sans-serif", fontSize: 11,
      }}>
        <span style={{ fontSize: 16 }}>{langIcon}</span>
        <span style={{ fontWeight: "bold", flex: 1 }}>{filename}</span>
        <span style={{
          background: "rgba(255,255,255,0.2)", padding: "1px 6px",
          borderRadius: 2, fontSize: 10,
        }}>{langLabel}</span>
        <span style={{ opacity: 0.8, fontSize: 10 }}>{lines.length} lines</span>
      </div>

      {/* ── Toolbar ─────────────────────────────── */}
      <div style={{
        background: "#252526", borderBottom: "1px solid #333",
        padding: "3px 8px", display: "flex", gap: 8,
        alignItems: "center", flexShrink: 0,
        fontFamily: "Tahoma, sans-serif", fontSize: 10,
      }}>
        <button
          onClick={() => setWrapLines((w) => !w)}
          style={{
            background: wrapLines ? "#3c3c8d" : "#3c3c3c",
            color: "#ccc", border: "1px solid #555", padding: "1px 6px",
            cursor: "pointer", fontSize: 10, fontFamily: "Tahoma",
          }}
        >
          {wrapLines ? "Wrap: ON" : "Wrap: OFF"}
        </button>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? "#1e7145" : "#3c3c3c",
            color: copied ? "#fff" : "#ccc",
            border: "1px solid #555", padding: "1px 6px",
            cursor: "pointer", fontSize: 10, fontFamily: "Tahoma",
          }}
        >
          {copied ? "✓ Copied!" : "📋 Copy"}
        </button>
        <span style={{ marginLeft: "auto", color: "#858585" }}>
          Read-only
        </span>
      </div>

      {/* ── Code area ───────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", display: "flex" }}>
        {/* Line numbers */}
        <div style={{
          background: t.lineNumBg, color: t.lineNumColor,
          padding: "8px 0", textAlign: "right",
          userSelect: "none", flexShrink: 0,
          borderRight: "1px solid #333",
          minWidth: 42,
        }}>
          {lines.map((_, i) => (
            <div key={i} style={{ padding: "0 8px", lineHeight: "20px", fontSize: 12 }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code lines */}
        <div style={{
          flex: 1, padding: "8px 12px",
          overflowX: wrapLines ? "visible" : "auto",
        }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                lineHeight: "20px", fontSize: 12,
                whiteSpace: wrapLines ? "pre-wrap" : "pre",
                minHeight: 20,
              }}
            >
              {language === "sql" ? highlightSQL(line) : highlightPython(line)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Status bar ──────────────────────────── */}
      <div style={{
        background: t.headerBg, color: "#fff",
        padding: "1px 10px", fontSize: 10,
        fontFamily: "Tahoma, sans-serif", display: "flex", gap: 12,
      }}>
        <span>{langLabel} — Read-only</span>
        <span style={{ marginLeft: "auto" }}>{lines.length} lines</span>
      </div>
    </div>
  );
}

import React, { useState } from "react";

const ROWS_PER_PAGE = 15;

export default function ExcelViewer({ data }) {
  const { columns = [], rows = [], filename = "spreadsheet.xlsx", meta = {} } = data || {};
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  // ── Filter ────────────────────────────────────────────────────
  const filtered = rows.filter((row) =>
    search === "" ||
    Object.values(row).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  // ── Sort ──────────────────────────────────────────────────────
  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey]; const bv = b[sortKey];
        const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      })
    : filtered;

  // ── Pagination ────────────────────────────────────────────────
  const totalPages = Math.ceil(sorted.length / ROWS_PER_PAGE);
  const pageRows   = sorted.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(0);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      fontFamily: "Tahoma, sans-serif", fontSize: 11, background: "#fff",
    }}>
      {/* ── Header bar ─────────────────────────── */}
      <div style={{
        background: "linear-gradient(180deg,#1e7145 0%,#217346 100%)",
        color: "#fff", padding: "6px 10px",
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
      }}>
        <span style={{ fontSize: 18 }}>📊</span>
        <span style={{ fontWeight: "bold", flex: 1 }}>{filename}</span>
        {meta.rows && <span style={{ opacity: 0.8, fontSize: 10 }}>{meta.rows} rows</span>}
      </div>

      {/* ── Toolbar ────────────────────────────── */}
      <div style={{
        background: "#f2f2f2", borderBottom: "1px solid #ccc",
        padding: "4px 8px", display: "flex", gap: 6, alignItems: "center", flexShrink: 0,
      }}>
        <span style={{ color: "#555" }}>🔍</span>
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          placeholder="Search…"
          style={{
            border: "1px inset #999", padding: "1px 4px", fontSize: 11,
            fontFamily: "Tahoma", width: 160,
          }}
        />
        <span style={{ marginLeft: "auto", color: "#666", fontSize: 10 }}>
          {filtered.length} of {rows.length} rows
        </span>
      </div>

      {/* ── Table ──────────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <table style={{
          borderCollapse: "collapse", width: "100%",
          fontSize: 11, fontFamily: "Tahoma",
        }}>
          <thead>
            <tr style={{ position: "sticky", top: 0, zIndex: 2 }}>
              {/* Row number column */}
              <th style={{
                background: "#e8e8e8", border: "1px solid #bbb",
                padding: "2px 6px", width: 36, color: "#666", userSelect: "none",
              }}>#</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{
                    background: sortKey === col.key ? "#d0e8f0" : "#e8e8e8",
                    border: "1px solid #bbb",
                    padding: "3px 8px", whiteSpace: "nowrap",
                    cursor: "pointer", userSelect: "none",
                    color: "#000", fontWeight: "bold", textAlign: "left",
                  }}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span style={{ marginLeft: 4, color: "#317d40" }}>
                      {sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} style={{
                  padding: 20, textAlign: "center", color: "#888",
                }}>
                  No matching records
                </td>
              </tr>
            ) : pageRows.map((row, ri) => (
              <tr
                key={ri}
                style={{ background: ri % 2 === 0 ? "#fff" : "#f5f9f6" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#e0f0e8"}
                onMouseLeave={(e) => e.currentTarget.style.background = ri % 2 === 0 ? "#fff" : "#f5f9f6"}
              >
                <td style={{
                  border: "1px solid #ddd", padding: "2px 6px",
                  color: "#888", textAlign: "center", background: "#f2f2f2",
                }}>
                  {page * ROWS_PER_PAGE + ri + 1}
                </td>
                {columns.map((col) => (
                  <td key={col.key} style={{
                    border: "1px solid #ddd", padding: "2px 8px",
                    whiteSpace: "nowrap",
                    textAlign: typeof row[col.key] === "number" ? "right" : "left",
                  }}>
                    {typeof row[col.key] === "number"
                      ? Number.isInteger(row[col.key])
                        ? row[col.key].toLocaleString()
                        : row[col.key].toFixed(2)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ─────────────────────────── */}
      <div style={{
        borderTop: "1px solid #ccc", background: "#f2f2f2",
        padding: "3px 8px", display: "flex", gap: 4,
        alignItems: "center", flexShrink: 0,
      }}>
        <button
          className="xp-btn"
          onClick={() => setPage(0)} disabled={page === 0}
          style={{ fontSize: 10, padding: "1px 5px", opacity: page === 0 ? 0.4 : 1 }}
        >«</button>
        <button
          className="xp-btn"
          onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}
          style={{ fontSize: 10, padding: "1px 5px", opacity: page === 0 ? 0.4 : 1 }}
        >‹ Prev</button>
        <span style={{ flex: 1, textAlign: "center", color: "#555" }}>
          Page {page + 1} of {Math.max(1, totalPages)}
        </span>
        <button
          className="xp-btn"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
          style={{ fontSize: 10, padding: "1px 5px", opacity: page >= totalPages - 1 ? 0.4 : 1 }}
        >Next ›</button>
        <button
          className="xp-btn"
          onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}
          style={{ fontSize: 10, padding: "1px 5px", opacity: page >= totalPages - 1 ? 0.4 : 1 }}
        >»</button>
      </div>
    </div>
  );
}

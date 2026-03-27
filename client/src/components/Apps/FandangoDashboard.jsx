import React, { useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from "recharts";
import {
  ratingDistribution,
  platformAverages,
  allSitesData,
} from "../../data/fandangoData";

// ── Platform colors ────────────────────────────────────────────
const PLATFORM_COLORS = {
  Fandango:         "#E84142",
  IMDB:             "#F5C518",
  RT:               "#FA320A",
  Metacritic:       "#6EBF00",
};

// ── XP-style GitHub button ─────────────────────────────────────
function GithubButton({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 12px",
        fontFamily: "Tahoma, sans-serif",
        fontSize: 11,
        fontWeight: "bold",
        color: "#000",
        textDecoration: "none",
        background: "linear-gradient(180deg, #f4f3ee 0%, #d8d3c0 100%)",
        border: "2px solid #888",
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderBottomColor: "#555",
        borderRightColor: "#555",
        cursor: "pointer",
        userSelect: "none",
        boxShadow: "1px 1px 0 #fff inset",
      }}
    >
      🔗 View Code on GitHub
    </a>
  );
}

// ── Custom Tooltip ─────────────────────────────────────────────
const DistTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(20,20,20,0.9)", color: "#fff",
      padding: "6px 10px", borderRadius: 3, fontSize: 10,
      fontFamily: "Tahoma, sans-serif", border: "1px solid #555",
    }}>
      <div style={{ fontWeight: "bold", marginBottom: 3 }}>Rating: {label}★</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: {p.value.toFixed(1)}% of films
        </div>
      ))}
    </div>
  );
};

// ── KPI tile ──────────────────────────────────────────────────
function AvgTile({ platform, avg, color }) {
  return (
    <div style={{
      flex: "1 1 110px",
      background: "#fff",
      border: `2px solid ${color}`,
      borderTop: `4px solid ${color}`,
      padding: "8px 12px",
      minWidth: 90,
    }}>
      <div style={{ fontSize: 10, color: "#555", fontWeight: "bold", marginBottom: 2 }}>
        {platform}
      </div>
      <div style={{ fontSize: 22, fontWeight: "bold", color }}>
        {avg.toFixed(2)}★
      </div>
      <div style={{ fontSize: 9, color: "#888" }}>avg / 5.0</div>
    </div>
  );
}

// ── Film comparison bar ────────────────────────────────────────
function FilmBar({ film }) {
  const platforms = [
    { key: "Fandango", color: "#E84142" },
    { key: "IMDB",     color: "#F5C518" },
    { key: "RT",       color: "#FA320A" },
    { key: "Metacritic", color: "#6EBF00" },
  ];
  return (
    <div style={{ marginBottom: 4, fontSize: 10 }}>
      <div style={{ color: "#333", marginBottom: 2, fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>
        {film.FILM}
      </div>
      {platforms.map(({ key, color }) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
          <div style={{ width: 60, fontSize: 9, color: "#666" }}>{key}</div>
          <div style={{ flex: 1, background: "#eee", height: 8, borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              width: `${(film[key] / 5) * 100}%`,
              height: "100%",
              background: color,
              borderRadius: 2,
            }} />
          </div>
          <div style={{ width: 28, textAlign: "right", color: "#333" }}>{film[key].toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
export default function FandangoDashboard() {
  const [activeFilm, setActiveFilm] = useState(null);

  return (
    <div style={{
      height: "100%", overflow: "auto",
      background: "#f0f0f0",
      fontFamily: "Tahoma, sans-serif",
      fontSize: 11,
    }}>
      {/* ── Header ─────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #8B0000 0%, #C0392B 60%, #E84142 100%)",
        color: "#fff", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 22 }}>🎬</span>
        <div>
          <div style={{ fontWeight: "bold", fontSize: 14 }}>Fandango Rating Bias Analysis</div>
          <div style={{ opacity: 0.8, fontSize: 10 }}>146 films · 2015 · Inspired by FiveThirtyEight</div>
        </div>
      </div>

      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>

        {/* ── Avg rating KPIs ──────────────────────── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {platformAverages.map((p) => (
            <AvgTile key={p.platform} platform={p.platform} avg={p.avg} color={p.color} />
          ))}
        </div>

        {/* ── Distribution chart ───────────────────── */}
        <div style={{
          background: "#fff", border: "1px solid #d0d0d0",
          padding: "8px 10px", boxShadow: "1px 1px 4px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: "bold", color: "#8B0000",
            borderBottom: "2px solid #E84142", paddingBottom: 2, marginBottom: 6,
          }}>
            Rating Distribution by Platform (% of films at each star rating)
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={ratingDistribution}
              margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="stars" tick={{ fontSize: 9 }} label={{ value: "Stars (0–5 scale)", position: "insideBottom", offset: -2, fontSize: 9 }} />
              <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `${v}%`} width={38} />
              <Tooltip content={<DistTip />} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              <Bar dataKey="Fandango"   fill={PLATFORM_COLORS.Fandango}   name="Fandango"           maxBarSize={22} />
              <Bar dataKey="IMDB"       fill={PLATFORM_COLORS.IMDB}       name="IMDB"               maxBarSize={22} />
              <Bar dataKey="RT"         fill={PLATFORM_COLORS.RT}         name="Rotten Tomatoes"    maxBarSize={22} />
              <Bar dataKey="Metacritic" fill={PLATFORM_COLORS.Metacritic} name="Metacritic"         maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Film-by-film comparison ──────────────── */}
        <div style={{
          background: "#fff", border: "1px solid #d0d0d0",
          padding: "8px 10px", boxShadow: "1px 1px 4px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: "bold", color: "#8B0000",
            borderBottom: "2px solid #E84142", paddingBottom: 2, marginBottom: 8,
          }}>
            Film-by-Film Rating Comparison (normalized to 5★ scale)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px 20px" }}>
            {allSitesData.map((film) => (
              <FilmBar key={film.FILM} film={film} />
            ))}
          </div>
        </div>

        {/* ── Insight box ───────────────────────────── */}
        <div style={{
          background: "#FFF5F5",
          border: "1px solid #E84142",
          borderLeft: "4px solid #E84142",
          padding: "10px 14px",
          fontSize: 11,
          lineHeight: 1.7,
          color: "#1a1a1a",
        }}>
          <div style={{ fontWeight: "bold", color: "#8B0000", marginBottom: 6, fontSize: 12 }}>
            📌 Analysis Insight: Fandango Inflates Ratings
          </div>
          <p style={{ margin: "0 0 6px" }}>
            Fandango assigns an average star rating of <b>4.09★</b> versus <b>3.53★</b> (IMDB), <b>3.10★</b> (Rotten Tomatoes), and <b>3.15★</b> (Metacritic) for the same films — all normalized to a 5-star scale.
          </p>
          <p style={{ margin: "0 0 6px" }}>
            The distribution chart reveals the key bias: <b>67% of films on Fandango receive 4.5★ or 5.0★</b>, while Rotten Tomatoes and Metacritic show a balanced spread across the full rating scale.
          </p>
          <p style={{ margin: 0 }}>
            Investigation of the raw data shows that Fandango systematically <b>rounds up</b> the stored numerical rating to the nearest half-star for display — artificially inflating perceived quality to encourage ticket purchases.
          </p>
        </div>

        {/* ── Footer ───────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
          padding: "6px 0", borderTop: "1px solid #ccc",
        }}>
          <div style={{ fontSize: 10, color: "#888" }}>
            Data: fandango_scrape.csv + all_sites_scores.csv · Analysis inspired by FiveThirtyEight · Built with React + Recharts
          </div>
          <GithubButton url="https://github.com/adityapatel14/movie-ratings-bias-study" />
        </div>

      </div>
    </div>
  );
}

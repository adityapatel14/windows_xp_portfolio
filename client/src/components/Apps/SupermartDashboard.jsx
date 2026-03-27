import React, { useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ReferenceLine,
} from "recharts";
import {
  supermartKPIs,
  salesByYearMonth,
  salesByRegionSegment,
  salesByCategory,
  topProducts,
  profitVsDiscount,
  CATEGORY_COLORS,
  SEGMENT_COLORS,
} from "../../data/supermartData";

// ── Helpers ────────────────────────────────────────────────────
const fmt$ = (v) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M`
  : v >= 1_000    ? `$${(v / 1_000).toFixed(1)}K`
  : `$${v}`;

const fmtNum = (v) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M`
  : v >= 1_000    ? `${(v / 1_000).toFixed(0)}K`
  : String(v);

// ── KPI Card ───────────────────────────────────────────────────
function KPI({ label, value, icon, accent }) {
  return (
    <div style={{
      flex: "1 1 130px",
      background: "#fff",
      border: `2px solid ${accent}`,
      borderTop: `4px solid ${accent}`,
      padding: "8px 12px",
      minWidth: 100,
    }}>
      <div style={{ fontSize: 10, color: "#666", fontWeight: "bold", marginBottom: 2 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: "bold", color: "#1a1a1a" }}>
        {value}
      </div>
    </div>
  );
}

// ── Custom dark tooltip ────────────────────────────────────────
const DarkTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(20,20,20,0.92)", color: "#fff",
      padding: "6px 10px", borderRadius: 3, fontSize: 10,
      fontFamily: "Tahoma, sans-serif", border: "1px solid #555",
    }}>
      {label && <div style={{ fontWeight: "bold", marginBottom: 2 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || "#adf" }}>
          {p.name}: {typeof p.value === "number" && p.value > 100 ? fmt$(p.value) : p.value}
        </div>
      ))}
    </div>
  );
};

// ── Section header ─────────────────────────────────────────────
function SectionHeader({ children }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: "bold", color: "#1f497d",
      borderBottom: "2px solid #4472c4", paddingBottom: 2, marginBottom: 6,
      fontFamily: "Tahoma, sans-serif",
    }}>
      {children}
    </div>
  );
}

// ── Chart card wrapper ─────────────────────────────────────────
function ChartCard({ title, children, flex = "1 1 45%", minW = 180 }) {
  return (
    <div style={{
      flex, minWidth: minW,
      background: "#fff", border: "1px solid #d0d0d0",
      padding: "8px 10px", boxShadow: "1px 1px 4px rgba(0,0,0,0.08)",
    }}>
      <SectionHeader>{title}</SectionHeader>
      {children}
    </div>
  );
}

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
      onMouseDown={(e) => {
        e.currentTarget.style.borderTopColor = "#555";
        e.currentTarget.style.borderLeftColor = "#555";
        e.currentTarget.style.borderBottomColor = "#fff";
        e.currentTarget.style.borderRightColor = "#fff";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.borderTopColor = "#fff";
        e.currentTarget.style.borderLeftColor = "#fff";
        e.currentTarget.style.borderBottomColor = "#555";
        e.currentTarget.style.borderRightColor = "#555";
      }}
    >
      🔗 View Code on GitHub
    </a>
  );
}

// ── Region filter ──────────────────────────────────────────────
const REGIONS  = ["All", "West", "East", "Central", "South"];
const SEGMENTS = ["Consumer", "Corporate", "HomeOffice"];
const SEG_LABELS = { Consumer: "Consumer", Corporate: "Corporate", HomeOffice: "Home Office" };

export default function SupermartDashboard() {
  const [regionFilter, setRegionFilter] = useState("All");

  const filteredRegionData = regionFilter === "All"
    ? salesByRegionSegment
    : salesByRegionSegment.filter((d) => d.region === regionFilter);

  return (
    <div style={{
      height: "100%", overflow: "auto",
      background: "#f0f0f0",
      fontFamily: "Tahoma, sans-serif",
      fontSize: 11,
    }}>
      {/* ── Dashboard header ─────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1f497d 0%, #2e75b6 60%, #4472c4 100%)",
        color: "#fff", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
      }}>
        <span style={{ fontSize: 22 }}>📈</span>
        <div>
          <div style={{ fontWeight: "bold", fontSize: 14 }}>Supermart Sales Dashboard</div>
          <div style={{ opacity: 0.8, fontSize: 10 }}>Jan 2014 – Dec 2017 · Power BI Replica · 9,994 rows</div>
        </div>
        {/* Region filter */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ opacity: 0.8, fontSize: 10 }}>Region:</span>
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              style={{
                background: regionFilter === r ? "#fff" : "rgba(255,255,255,0.15)",
                color: regionFilter === r ? "#1f497d" : "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "2px 7px", cursor: "pointer",
                fontFamily: "Tahoma", fontSize: 10, fontWeight: "bold",
                borderRadius: 2,
              }}
            >{r}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* ── KPI row ──────────────────────────── */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <KPI label="Sum of Sales"     value={fmt$(supermartKPIs.totalSales)}     icon="💰" accent="#4472C4" />
          <KPI label="Sum of Profit"    value={fmt$(supermartKPIs.totalProfit)}    icon="📈" accent="#ED7D31" />
          <KPI label="Profit Margin %"  value={`${supermartKPIs.profitMargin}%`}   icon="📊" accent="#A9D18E" />
          <KPI label="Total Orders"     value={fmtNum(supermartKPIs.totalOrders)}  icon="🛒" accent="#FFC000" />
          <KPI label="Sum of Quantity"  value={fmtNum(supermartKPIs.totalQuantity)}icon="📦" accent="#70AD47" />
        </div>

        {/* ── Row 1: Line chart + Region/Segment bar ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChartCard title="Sum of Sales by Year and Month" flex="1 1 55%" minW={260}>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={salesByYearMonth} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="period" tick={{ fontSize: 9 }} interval={3} />
                <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} width={44} />
                <Tooltip content={<DarkTip />} />
                <Line type="monotone" dataKey="Sales" stroke="#4472C4" strokeWidth={2} dot={false} name="Sales" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sales by Region and Segment" flex="1 1 38%" minW={220}>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={filteredRegionData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="region" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} width={44} />
                <Tooltip content={<DarkTip />} />
                <Legend wrapperStyle={{ fontSize: 9 }} />
                {SEGMENTS.map((seg) => (
                  <Bar key={seg} dataKey={seg} name={SEG_LABELS[seg]}
                    fill={SEGMENT_COLORS[seg]} stackId="a" maxBarSize={40} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ── Row 2: Category pie + Top Products bar + Scatter ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChartCard title="Sales Share by Category" flex="0 1 200px" minW={160}>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={salesByCategory} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" innerRadius={45} outerRadius={75}
                  paddingAngle={2}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false} style={{ fontSize: 9 }}
                >
                  {salesByCategory.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, name) => [fmt$(v), name]}
                  contentStyle={{ fontSize: 10, fontFamily: "Tahoma" }}
                />
                <Legend wrapperStyle={{ fontSize: 9 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top 10 Products by Sales" flex="1 1 42%" minW={240}>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 9 }}
                  tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="ProductName"
                  tick={{ fontSize: 8 }} width={95} />
                <Tooltip content={<DarkTip />} />
                <Bar dataKey="Sales" name="Sales" maxBarSize={14}>
                  {topProducts.map((entry, i) => (
                    <Cell key={i} fill={CATEGORY_COLORS[entry.Category] || "#4472C4"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Profit vs Discount scatter */}
          <ChartCard title="Profit vs Discount by Category" flex="1 1 28%" minW={190}>
            <ResponsiveContainer width="100%" height={190}>
              <ScatterChart margin={{ top: 4, right: 8, left: 0, bottom: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="Discount" type="number" name="Discount"
                  tick={{ fontSize: 9 }} domain={[0, 0.6]}
                  label={{ value: "Discount", position: "insideBottom", offset: -10, fontSize: 9 }} />
                <YAxis dataKey="Profit" type="number" name="Profit"
                  tick={{ fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} width={44} />
                <ReferenceLine y={0} stroke="#ccc" strokeDasharray="3 3" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div style={{
                        background: "rgba(20,20,20,0.9)", color: "#fff",
                        padding: "5px 8px", fontSize: 10, fontFamily: "Tahoma",
                        border: "1px solid #555",
                      }}>
                        <div>{d?.Category}</div>
                        <div>Discount: {(d?.Discount * 100).toFixed(0)}%</div>
                        <div>Profit: {fmt$(d?.Profit)}</div>
                      </div>
                    );
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 9 }} />
                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                  <Scatter
                    key={cat} name={cat}
                    data={profitVsDiscount.filter((d) => d.Category === cat)}
                    fill={color} opacity={0.75}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ── Insight box ───────────────────────────────── */}
        <div style={{
          background: "#EFF3FF",
          border: "1px solid #4472C4",
          borderLeft: "4px solid #4472C4",
          padding: "8px 12px",
          fontSize: 11,
          color: "#1a1a1a",
          lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: "bold", color: "#1f497d", marginBottom: 4 }}>📌 Key Insights</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><b>Technology</b> drives 50% of total revenue ($1.16M), led by printers and copiers.</li>
            <li><b>Discounts above 30%</b> consistently produce <b>negative profit</b> across all categories — especially Furniture.</li>
            <li><b>West & East regions</b> account for 60%+ of total sales; South is the weakest performer.</li>
            <li>Sales show a clear <b>upward trend</b> from 2014 to 2017, with Q4 spikes each year (holiday buying).</li>
          </ul>
        </div>

        {/* ── Footer row ────────────────────────────────── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 8,
          padding: "6px 0", borderTop: "1px solid #ccc",
        }}>
          <div style={{ fontSize: 10, color: "#888" }}>
            Data source: Supermart Sales Dataset (2014–2017) · 9,994 rows · Built with React + Recharts
          </div>
          <GithubButton url="https://github.com/adityapatel14/Supermart" />
        </div>
      </div>
    </div>
  );
}

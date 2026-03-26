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
      flex: "1 1 140px",
      background: "#fff",
      border: `2px solid ${accent}`,
      borderTop: `4px solid ${accent}`,
      padding: "8px 12px",
      minWidth: 110,
    }}>
      <div style={{ fontSize: 10, color: "#666", fontWeight: "bold", marginBottom: 2 }}>
        {icon} {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: "bold", color: "#1a1a1a" }}>
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
function ChartCard({ title, children, flex = "1 1 45%", minW = 200 }) {
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

// ── Region filter ──────────────────────────────────────────────
const REGIONS = ["All", "West", "East", "Central", "South"];
const SEGMENTS = ["Consumer", "Corporate", "HomeOffice"];
const SEG_LABELS = { Consumer: "Consumer", Corporate: "Corporate", HomeOffice: "Home Office" };

export default function SupermartDashboard() {
  const [regionFilter, setRegionFilter] = useState("All");

  const filteredRegionData = regionFilter === "All"
    ? salesByRegionSegment
    : salesByRegionSegment.filter((d) => d.region === regionFilter);

  const filteredTopProducts = regionFilter === "All"
    ? topProducts
    : topProducts.slice(0, 7);

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
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 22 }}>📈</span>
        <div>
          <div style={{ fontWeight: "bold", fontSize: 14 }}>Supermart Sales Dashboard</div>
          <div style={{ opacity: 0.8, fontSize: 10 }}>Jan 2014 – Dec 2017 · All Regions</div>
        </div>
        {/* Region filter */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4, alignItems: "center" }}>
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
          <KPI label="Sum of Sales"     value={fmt$(supermartKPIs.totalSales)}    icon="💰" accent="#4472C4" />
          <KPI label="Sum of Profit"    value={fmt$(supermartKPIs.totalProfit)}   icon="📈" accent="#ED7D31" />
          <KPI label="Profit Margin %"  value={`${supermartKPIs.profitMargin}%`}  icon="📊" accent="#A9D18E" />
          <KPI label="Total Orders"     value={fmtNum(supermartKPIs.totalOrders)} icon="🛒" accent="#FFC000" />
          <KPI label="Sum of Quantity"  value={fmtNum(supermartKPIs.totalQuantity)}icon="📦" accent="#70AD47" />
        </div>

        {/* ── Row 1: Line chart + Region/Segment bar ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChartCard title="Sum of Sales by Year and Month" flex="1 1 55%" minW={280}>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={salesByYearMonth} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="period" tick={{ fontSize: 9 }} interval={3} />
                <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<DarkTip />} />
                <Line type="monotone" dataKey="Sales" stroke="#4472C4" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sales and Profit Margin % by Region and Segment" flex="1 1 40%" minW={240}>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={filteredRegionData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="region" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
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

        {/* ── Row 2: Category pie + Top Products bar ── */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <ChartCard title="Count of Category and Sum of Sales by Segment" flex="0 1 220px" minW={200}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={salesByCategory} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" innerRadius={45} outerRadius={80}
                  paddingAngle={2} label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={false} style={{ fontSize: 9 }}
                >
                  {salesByCategory.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => fmt$(v)}
                  contentStyle={{ fontSize: 10, fontFamily: "Tahoma" }}
                />
                <Legend wrapperStyle={{ fontSize: 9 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sum of Sales by ProductName and Category" flex="1 1 45%" minW={260}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={filteredTopProducts}
                layout="vertical"
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 9 }}
                  tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="ProductName"
                  tick={{ fontSize: 8 }} width={90} />
                <Tooltip content={<DarkTip />} />
                <Bar dataKey="Sales" maxBarSize={14}>
                  {filteredTopProducts.map((entry, i) => (
                    <Cell key={i} fill={CATEGORY_COLORS[entry.Category] || "#4472C4"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Profit vs Discount scatter */}
          <ChartCard title="Category: Profit vs Discount" flex="1 1 30%" minW={200}>
            <ResponsiveContainer width="100%" height={180}>
              <ScatterChart margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="Discount" type="number" name="Discount"
                  tick={{ fontSize: 9 }} domain={[0, 0.85]}
                  label={{ value: "Discount", position: "insideBottom", offset: -2, fontSize: 9 }} />
                <YAxis dataKey="Profit" type="number" name="Profit"
                  tick={{ fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
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
                        <div>Discount: {d?.Discount}</div>
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

        {/* ── Footer ───────────────────────────────── */}
        <div style={{
          textAlign: "center", fontSize: 10, color: "#888",
          padding: "4px 0", borderTop: "1px solid #ccc",
        }}>
          Data source: Supermart Sales Dataset (2014–2017) · Built with React + Recharts
        </div>
      </div>
    </div>
  );
}

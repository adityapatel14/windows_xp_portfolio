import React, { useState, useMemo, useCallback } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
  ComposedChart,
} from "recharts";

import FilterPanel from "./FilterPanel";
import KPICard from "./KPICard";
import ChartCard from "./ChartCard";
import {
  kpiData,
  proportionByYear,
  monthlyTrends,
  durationDistribution,
  yearWiseData,
  oddEvenData,
  yearMultipliers,
  typeMultipliers,
  semesterMultipliers,
  YEAR_COLORS,
  STIPEND_COLOR,
} from "../../../data/internshipData";

// ── Initial filter state ───────────────────────────────────────
const INITIAL_FILTERS = {
  ALL: true, FY: false, LY: false, SY: false, TY: false,
  ALL_TYPE: true, External: false, "In-house": false,
  EVEN: false, ODD: false,
};

// XP Button style
const xpBtn = {
  fontFamily: "Tahoma, sans-serif",
  fontSize: 11,
  padding: "4px 14px",
  background: "#D4D0C8",
  border: "2px outset #dfdfdf",
  cursor: "pointer",
  borderRadius: 1,
  color: "#000",
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
};

// Custom tooltip for all charts
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#FFFDE7",
      border: "1px solid #888",
      padding: "6px 10px",
      fontFamily: "Tahoma",
      fontSize: 10,
      boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
    }}>
      {label && <div style={{ fontWeight: "bold", marginBottom: 4 }}>{label}</div>}
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <b>{typeof p.value === "number"
            ? p.value >= 100000
              ? `₹${(p.value / 100000).toFixed(2)}L`
              : p.value.toLocaleString()
            : p.value}</b>
        </div>
      ))}
    </div>
  );
};

// Donut centre label
const DonutLabel = ({ cx, cy, innerRadius, outerRadius, midAngle, percent, name, value }) => {
  return null; // handled by Tooltip
};

// Donut custom label outside
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, name, value, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = outerRadius + 18;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#333" textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central" style={{ fontSize: 9, fontFamily: "Tahoma" }}>
      {`${value} (${percent.toFixed(2)}%)`}
    </text>
  );
};

// ── Compute multiplier from active filters ─────────────────────
function getMultiplier(filters) {
  // Year multiplier
  const years = ["FY", "LY", "SY", "TY"].filter((k) => filters[k]);
  let yearMult = years.length === 0
    ? yearMultipliers.ALL
    : years.reduce((acc, y) => acc + yearMultipliers[y], 0);

  // Type multiplier
  const types = ["External", "In-house"].filter((k) => filters[k]);
  let typeMult = types.length === 0 ? typeMultipliers.ALL
    : types.reduce((acc, t) => acc + typeMultipliers[t], 0);

  // Semester multiplier
  const sems = ["EVEN", "ODD"].filter((k) => filters[k]);
  let semMult = sems.length === 0 ? semesterMultipliers.ALL
    : sems.reduce((acc, s) => acc + semesterMultipliers[s], 0);

  return Math.min(yearMult * typeMult * semMult, 1);
}

// Which year columns to show based on year filter
function activeYears(filters) {
  const picked = ["FY", "LY", "SY", "TY"].filter((k) => filters[k]);
  return picked.length > 0 ? picked : ["FY", "LY", "SY", "TY"];
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function InternshipDashboard({ data }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const onToggle = useCallback((key, section) => {
    setFilters((prev) => {
      const next = { ...prev };
      if (key === "ALL") {
        ["FY", "LY", "SY", "TY"].forEach((k) => (next[k] = false));
        next.ALL = true;
      } else if (key === "ALL_TYPE") {
        ["External", "In-house"].forEach((k) => (next[k] = false));
        next.ALL_TYPE = true;
      } else {
        // Toggle item, clear "ALL" for its group
        const wasOn = prev[key];
        next[key] = !wasOn;
        if (section === "YEAR") {
          next.ALL = !["FY", "LY", "SY", "TY"].some((k) => next[k]);
        } else if (section === "TYPE") {
          next.ALL_TYPE = !["External", "In-house"].some((k) => next[k]);
        }
      }
      return next;
    });
  }, []);

  // ── Derived data (memoised) ──────────────────────────────────
  const mult = useMemo(() => getMultiplier(filters), [filters]);
  const years = useMemo(() => activeYears(filters), [filters]);

  const kpis = useMemo(() => ({
    total: Math.round(kpiData.totalInternships * mult),
    month: kpiData.favouriteMonth,
    monthCount: Math.round(kpiData.favouriteMonthCount * mult),
    duration: kpiData.mostChosenDuration,
  }), [mult]);

  const donutData = useMemo(() =>
    proportionByYear
      .filter((d) => years.includes(d.name))
      .map((d) => ({ ...d, value: Math.round(d.value * mult / (mult < 1 ? 1 : 1)) })),
    [years, mult]);

  const lineData = useMemo(() =>
    monthlyTrends.map((row) => {
      const out = { month: row.month };
      years.forEach((y) => { out[y] = Math.round(row[y] * mult); });
      return out;
    }), [years, mult]);

  const barData = useMemo(() =>
    durationDistribution.map((row) => {
      const out = { period: row.period };
      years.forEach((y) => { out[y] = Math.round(row[y] * mult); });
      return out;
    }), [years, mult]);

  const composedData = useMemo(() =>
    yearWiseData.map((row) => {
      const out = { year: row.year, stipend: Math.round(row.stipend * mult) };
      years.forEach((y) => { out[y] = Math.round(row[y] * mult); });
      return out;
    }), [years, mult]);

  const oddEven = useMemo(() => {
    const sems = ["EVEN", "ODD"].filter((k) => filters[k]);
    const rows = sems.length > 0
      ? oddEvenData.filter((d) => sems.includes(d.type))
      : oddEvenData;
    const types = ["External", "In-house"].filter((k) => filters[k]);
    return rows.map((row) => {
      const out = { type: row.type };
      const cols = types.length > 0 ? types : ["External", "InHouse"];
      if (cols.includes("External")) out.External = Math.round(row.External * mult);
      if (cols.includes("In-house") || cols.includes("InHouse"))
        out.InHouse = Math.round(row.InHouse * mult);
      return out;
    });
  }, [filters, mult]);

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <div style={{
      display: "flex",
      height: "100%",
      fontFamily: "Tahoma, sans-serif",
      background: "#D4D0C8",
      overflow: "hidden",
    }}>

      {/* ── LEFT FILTER PANEL ─────────────────────────────── */}
      <FilterPanel filters={filters} onToggle={onToggle} />

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>

        {/* ── ROW 1: KPI + Title Banner ──────────────────── */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {/* KPI cards */}
          <div style={{ display: "flex", gap: 6, flex: 1 }}>
            <KPICard dark label="TOTAL INTERNSHIP" value={kpis.total.toLocaleString()} />
            <KPICard label="FAVOURITE MONTH" value={kpis.month} sub={`(${kpis.monthCount})`} />
            <KPICard label="Most Chosen Duration (Days)" value={kpis.duration} />
          </div>

          {/* Internship Overview Banner */}
          <div style={{
            background: "#2d2d2d",
            color: "#fff",
            border: "2px solid #000",
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minWidth: 140,
            textAlign: "center",
            flexShrink: 0,
          }}>
            <div style={{ fontSize: 13, fontWeight: "bold", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: 1 }}>
              INTERNSHIP<br />OVERVIEW
            </div>
          </div>
        </div>

        {/* ── ROW 2: Donut + Line ─────────────────────────── */}
        <div style={{ display: "flex", gap: 6, flex: "1 1 200px" }}>
          {/* Donut */}
          <ChartCard title="Proportion of Internships by Year of Study" style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height={185}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="43%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {donutData.map((entry) => (
                    <Cell key={entry.name} fill={YEAR_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconSize={8}
                  wrapperStyle={{ fontSize: 9, fontFamily: "Tahoma" }}
                  formatter={(v) => `Year of S... ● ${v}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Line */}
          <ChartCard title="Internship Trends Across Months (by Study Year)" style={{ flex: 1.3 }}>
            <ResponsiveContainer width="100%" height={185}>
              <LineChart data={lineData} margin={{ top: 4, right: 12, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" tick={{ fontSize: 8, fontFamily: "Tahoma" }} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 8, fontFamily: "Tahoma" }} width={28} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 9, fontFamily: "Tahoma", paddingTop: 4 }} />
                {years.map((y) => (
                  <Line key={y} type="monotone" dataKey={y} name={y}
                    stroke={YEAR_COLORS[y]} strokeWidth={1.5} dot={false} activeDot={{ r: 3 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ── ROW 3: Bar Distribution + Composed + OddEven ── */}
        <div style={{ display: "flex", gap: 6, flex: "1 1 200px" }}>
          {/* Horizontal Bar: Distribution */}
          <ChartCard title="Internship Distribution by Academic Year" style={{ flex: 1.1 }}>
            <div style={{ fontSize: 8, fontFamily: "Tahoma", marginBottom: 2, color: "#555", paddingLeft: 4 }}>
              YEAR OF STU... {years.map((y) => (
                <span key={y} style={{ color: YEAR_COLORS[y], marginRight: 4 }}>● {y}</span>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={barData} layout="vertical"
                margin={{ top: 0, right: 8, bottom: 4, left: 42 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e0e0e0" />
                <XAxis type="number" tick={{ fontSize: 7, fontFamily: "Tahoma" }} />
                <YAxis dataKey="period" type="category" tick={{ fontSize: 7, fontFamily: "Tahoma" }} width={42} />
                <Tooltip content={<CustomTooltip />} />
                {years.map((y) => (
                  <Bar key={y} dataKey={y} name={y} stackId="a" fill={YEAR_COLORS[y]} barSize={8} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Composed: Count + Stipend */}
          <ChartCard title="Internship Sum with Respect to Year and Stipend" style={{ flex: 1.3 }}>
            <div style={{ fontSize: 8, fontFamily: "Tahoma", marginBottom: 2, color: "#555", paddingLeft: 4 }}>
              Year of study...{" "}
              {years.map((y) => (
                <span key={y} style={{ color: YEAR_COLORS[y], marginRight: 4 }}>● {y}</span>
              ))}
              <span style={{ color: STIPEND_COLOR }}>● Stipend</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <ComposedChart data={composedData} margin={{ top: 4, right: 30, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="year" tick={{ fontSize: 7, fontFamily: "Tahoma" }} angle={-30} textAnchor="end" interval={0} />
                <YAxis yAxisId="left" tick={{ fontSize: 7, fontFamily: "Tahoma" }} width={28}
                  label={{ value: "Count", angle: -90, position: "insideLeft", fontSize: 8, dx: 8 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 7, fontFamily: "Tahoma" }} width={36}
                  tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`}
                  label={{ value: "Stipend", angle: 90, position: "insideRight", fontSize: 8, dx: -4 }} />
                <Tooltip content={<CustomTooltip />} />
                {years.map((y) => (
                  <Bar key={y} yAxisId="left" dataKey={y} name={y}
                    fill={YEAR_COLORS[y]} barSize={10} stackId="count" />
                ))}
                <Line yAxisId="right" type="monotone" dataKey="stipend" name="Sum of stipend"
                  stroke={STIPEND_COLOR} strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Grouped Bar: ODD/EVEN × Type */}
          <ChartCard title="Sum of Internship Count by ODD / EVEN and TYPE" style={{ flex: 0.9 }}>
            <div style={{ fontSize: 8, fontFamily: "Tahoma", marginBottom: 2, color: "#555", paddingLeft: 4 }}>
              TYPE <span style={{ color: "#888" }}>● External</span>{" "}
              <span style={{ color: "#c0392b" }}>● In-house</span>
            </div>
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={oddEven} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="type" tick={{ fontSize: 9, fontFamily: "Tahoma" }} />
                <YAxis tick={{ fontSize: 8, fontFamily: "Tahoma" }} width={32} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="External" name="External" stackId="s" fill="#888888" barSize={40} />
                <Bar dataKey="InHouse" name="In-house" stackId="s" fill="#c0392b" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ── FOOTER: GitHub button ──────────────────────── */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingTop: 2,
          paddingRight: 4,
          flexShrink: 0,
          gap: 8,
        }}>
          <span style={{ fontSize: 9, fontFamily: "Tahoma", color: "#555" }}>
            Source: Student Internship Research Dataset
          </span>
          <button
            style={{ ...xpBtn, background: "#D4D0C8" }}
            onClick={() => window.open(data?.github || "https://github.com/adityapatel14/students_internship_research", "_blank")}
            onMouseEnter={(e) => { e.currentTarget.style.border = "2px inset #808080"; }}
            onMouseLeave={(e) => { e.currentTarget.style.border = "2px outset #dfdfdf"; }}
          >
            🔗 View Code on GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Internship Dashboard Data
//  Values derived from the actual Power BI dashboard screenshot
// ─────────────────────────────────────────────────────────────

// ── KPIs ──────────────────────────────────────────────────────
export const kpiData = {
  totalInternships: 2004,
  favouriteMonth: "June",
  favouriteMonthCount: 392,
  mostChosenDuration: 61,
};

// ── Donut: Proportion by Year of Study ────────────────────────
export const proportionByYear = [
  { name: "FY", value: 651,  percent: 32.49 },
  { name: "LY", value: 959,  percent: 47.85 },
  { name: "SY", value: 220,  percent: 10.98 },
  { name: "TY", value: 174,  percent: 8.68  },
];

// ── Line: Monthly Trends by Year of Study ─────────────────────
export const monthlyTrends = [
  { month: "Jun",  FY: 98,  SY: 32,  LY: 200, TY: 62 },
  { month: "Jul",  FY: 82,  SY: 28,  LY: 185, TY: 54 },
  { month: "Aug",  FY: 75,  SY: 22,  LY: 158, TY: 45 },
  { month: "Sep",  FY: 60,  SY: 18,  LY: 120, TY: 34 },
  { month: "Oct",  FY: 40,  SY: 14,  LY:  88, TY: 20 },
  { month: "Nov",  FY: 25,  SY: 10,  LY:  52, TY: 14 },
  { month: "Dec",  FY: 20,  SY:  8,  LY:  42, TY: 10 },
  { month: "Jan",  FY: 28,  SY: 12,  LY:  58, TY: 14 },
  { month: "Feb",  FY: 32,  SY: 15,  LY:  70, TY: 16 },
  { month: "Mar",  FY: 38,  SY: 18,  LY:  82, TY: 18 },
  { month: "Apr",  FY: 42,  SY: 22,  LY:  95, TY: 20 },
  { month: "May",  FY: 55,  SY: 26,  LY: 110, TY: 28 },
];

// ── Bar: Duration Distribution by Academic Period ─────────────
export const durationDistribution = [
  { period: "JUN-JUL", FY: 60,  SY: 24,  LY: 135, TY: 24 },
  { period: "JUN-AUG", FY: 46,  SY: 18,  LY: 88,  TY: 18 },
  { period: "JUL-AUG", FY: 22,  SY: 10,  LY: 38,  TY: 10 },
  { period: "DEC-JAN", FY: 20,  SY:  8,  LY: 36,  TY:  10 },
  { period: "MAY-JUL", FY: 18,  SY:  8,  LY: 34,  TY: 10 },
  { period: "JAN-MAR", FY: 14,  SY:  6,  LY: 22,  TY:  6 },
  { period: "JUN-SEP", FY: 12,  SY:  5,  LY: 22,  TY:  7 },
  { period: "JAN-APR", FY: 12,  SY:  5,  LY: 20,  TY:  6 },
  { period: "JUL-APR", FY: 12,  SY:  5,  LY: 20,  TY:  6 },
  { period: "JUL-OCT", FY:  8,  SY:  4,  LY: 14,  TY:  4 },
  { period: "FEB-APR", FY:  8,  SY:  4,  LY: 13,  TY:  4 },
  { period: "JAN-FEB", FY:  8,  SY:  4,  LY: 13,  TY:  4 },
  { period: "JUN-JUN", FY:  8,  SY:  4,  LY: 13,  TY:  4 },
  { period: "APR-MAY", FY:  7,  SY:  4,  LY: 12,  TY:  4 },
];

// ── Combined: Count + Stipend by Academic Year ────────────────
export const yearWiseData = [
  { year: "2020-21", FY: 185, SY: 60, LY: 0,   TY: 0,  stipend: 1850000 },
  { year: "2021-22", FY: 190, SY: 62, LY: 0,   TY: 0,  stipend: 1950000 },
  { year: "2022-23", FY: 160, SY: 55, LY: 210, TY: 80, stipend: 1650000 },
  { year: "2023-24", FY: 55,  SY: 22, LY: 320, TY: 60, stipend: 800000  },
  { year: "2019-20", FY: 38,  SY: 16, LY: 200, TY: 20, stipend: 520000  },
  { year: "2018-19", FY: 18,  SY: 5,  LY: 160, TY: 10, stipend: 280000  },
  { year: "2024-25", FY: 5,   SY: 0,  LY: 69,  TY: 4,  stipend: 120000  },
];

// ── Grouped Bar: Odd/Even × External/In-house ─────────────────
export const oddEvenData = [
  { type: "EVEN", External: 1320, InHouse: 368 },
  { type: "ODD",  External: 640,  InHouse: 276 },
];

// ── Filter-aware data selector ─────────────────────────────────
// Multipliers to scale base totals when a single year filter is active
export const yearMultipliers = {
  ALL: 1,
  FY:  0.3249,
  SY:  0.1098,
  LY:  0.4785,
  TY:  0.0868,
};

// Multipliers for type filter
export const typeMultipliers = {
  ALL:       1,
  External:  0.774,  // (1320+640)/2534
  "In-house": 0.226,
};

// Multipliers for odd/even filter
export const semesterMultipliers = {
  ALL:  1,
  EVEN: 0.836,  // (1320+368)/2018 ≈ 83.6% of internships are even-sem
  ODD:  0.457,
};

export const YEAR_COLORS = {
  FY: "#2d2d2d",
  SY: "#888888",
  LY: "#c0392b",
  TY: "#7B1818",
};

export const STIPEND_COLOR = "#2980b9";

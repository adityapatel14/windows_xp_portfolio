const PROJECTS = [
  {
    id: 1,

    // 🔑 IMPORTANT (used internally)
    slug: "internship-research",

    // 🖥️ UI
    title: "Student Internship Research",
    icon: "📊",
    category: "Data",

    // 📄 Content
    description:
      "Analyzed student internship data to identify patterns, trends, and insights across various domains.",

    your_work:
      "Performed data cleaning, exploratory data analysis (EDA), and built meaningful insights using Pandas and SQL. Designed visualizations to communicate results effectively.",

    // ⚙️ Tech
    tech: ["Python", "Pandas", "SQL"],

    // 🔗 Links
    github: "https://github.com/adityapatel14/students_internship_research",
    live: null,

    // 🖼️ Images (VERY IMPORTANT FOR UI NEXT STEP)
    images: [
      "/projects/internship/chart1.png",
      "/projects/internship/chart2.png"
    ],

    // 📊 Extra (future use)
    type: "data-analysis",
    status: "completed"
  }
];

export default PROJECTS;
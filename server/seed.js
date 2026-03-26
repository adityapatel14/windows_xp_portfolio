require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/winxp';

const SEED_DATA = [
  // ── WEB ──────────────────────────────────────────────────
  {
    slug: 'winxp-portfolio',
    title: 'WinXP Portfolio',
    description: 'A full-stack portfolio website that authentically replicates the Windows XP desktop experience. Features draggable/resizable windows, a taskbar with Start menu, persistent state via MongoDB, and multiple interactive apps including Notepad, Terminal, and Internet Explorer.',
    category: 'Web',
    techStack: ['React', 'Vite', 'Zustand', 'react-rnd', 'Framer Motion', 'Express', 'MongoDB'],
    icon: '🖥️',
    liveUrl: 'https://winxp-portfolio.vercel.app',
    githubUrl: 'https://github.com/portfolio/winxp-portfolio',
    images: [
      { url: 'https://picsum.photos/seed/winxp1/800/450', caption: 'Desktop View' },
      { url: 'https://picsum.photos/seed/winxp2/800/450', caption: 'Start Menu Open' },
      { url: 'https://picsum.photos/seed/winxp3/800/450', caption: 'Multiple Windows' },
    ],
  },
  {
    slug: 'zero-g-atrium',
    title: 'Zero-G Atrium',
    description: 'A high-performance React Three Fiber portfolio section with a central nucleus surrounded by 10 floating orbital satellites. Features Euclidean mouse repulsion physics, InstancedMesh optimization, iridescent glassmorphism aesthetics, and GSAP-driven camera animations.',
    category: 'Web',
    techStack: ['React', 'Three.js', 'React Three Fiber', 'GSAP', 'TypeScript'],
    icon: '🚀',
    liveUrl: 'https://zero-g-atrium.vercel.app',
    githubUrl: 'https://github.com/portfolio/zero-g-atrium',
    images: [
      { url: 'https://picsum.photos/seed/zerog1/800/450', caption: 'Orbital View' },
      { url: 'https://picsum.photos/seed/zerog2/800/450', caption: 'Mouse Repulsion Demo' },
    ],
  },
  {
    slug: 'ai-hud-dashboard',
    title: 'AI Analytics HUD',
    description: 'A futuristic Tony Stark-inspired analytics dashboard with circular HUD rings, neon scanning lines, particle effects, and holographic data visualizations. Implements KPI, line, and bar charts styled with a blue/cyan neon color scheme.',
    category: 'Web',
    techStack: ['Next.js', 'Recharts', 'Three.js', 'Framer Motion', 'TailwindCSS'],
    icon: '📊',
    liveUrl: 'https://ai-hud.vercel.app',
    githubUrl: 'https://github.com/portfolio/ai-hud',
    images: [
      { url: 'https://picsum.photos/seed/hud1/800/450', caption: 'Main Dashboard' },
      { url: 'https://picsum.photos/seed/hud2/800/450', caption: 'Analytics Panel' },
    ],
  },

  // ── DATA ─────────────────────────────────────────────────
  {
    slug: 'sales-pipeline-etl',
    title: 'Sales Pipeline ETL',
    description: 'An end-to-end data engineering pipeline that ingests raw CRM data, performs multi-stage transformations using Apache Spark, and loads clean aggregated data into a PostgreSQL data warehouse. Includes automated scheduling via Airflow and real-time monitoring dashboards.',
    category: 'Data',
    techStack: ['Apache Spark', 'Airflow', 'PostgreSQL', 'Python', 'Docker'],
    icon: '🔄',
    liveUrl: '',
    githubUrl: 'https://github.com/portfolio/sales-etl',
    images: [
      { url: 'https://picsum.photos/seed/etl1/800/450', caption: 'Pipeline DAG' },
      { url: 'https://picsum.photos/seed/etl2/800/450', caption: 'Monitoring Dashboard' },
    ],
  },
  {
    slug: 'market-trend-viz',
    title: 'Market Trend Visualizer',
    description: 'An interactive data visualization tool for exploring financial market trends. Integrates live market data feeds, renders multi-dimensional candlestick charts and correlation matrices, and provides annotated event overlays for key market events.',
    category: 'Data',
    techStack: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'yfinance'],
    icon: '📈',
    liveUrl: 'https://market-viz.streamlit.app',
    githubUrl: 'https://github.com/portfolio/market-viz',
    images: [
      { url: 'https://picsum.photos/seed/mkt1/800/450', caption: 'Candlestick Chart' },
      { url: 'https://picsum.photos/seed/mkt2/800/450', caption: 'Correlation Matrix' },
    ],
  },

  // ── ML ───────────────────────────────────────────────────
  {
    slug: 'nlp-sentiment-engine',
    title: 'NLP Sentiment Engine',
    description: 'A production-ready NLP microservice for multi-label sentiment analysis. Fine-tuned a BERT transformer model on domain-specific customer review data, achieving 94% accuracy. Deployed as a FastAPI REST service with Redis caching and Kubernetes auto-scaling.',
    category: 'ML',
    techStack: ['Python', 'PyTorch', 'HuggingFace', 'FastAPI', 'Redis', 'Kubernetes'],
    icon: '🧠',
    liveUrl: 'https://sentiment-api.fly.dev',
    githubUrl: 'https://github.com/portfolio/sentiment-engine',
    images: [
      { url: 'https://picsum.photos/seed/nlp1/800/450', caption: 'Model Architecture' },
      { url: 'https://picsum.photos/seed/nlp2/800/450', caption: 'Inference API Demo' },
    ],
  },
  {
    slug: 'cv-object-detector',
    title: 'Real-Time Object Detector',
    description: 'A real-time computer vision system using a custom YOLOv8 model trained on a proprietary manufacturing defect dataset. Processes webcam/video stream at 30fps, draws bounding boxes with confidence scores, and logs detected anomalies to a PostgreSQL database.',
    category: 'ML',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'PostgreSQL'],
    icon: '👁️',
    liveUrl: '',
    githubUrl: 'https://github.com/portfolio/cv-detector',
    images: [
      { url: 'https://picsum.photos/seed/cv1/800/450', caption: 'Live Detection Feed' },
      { url: 'https://picsum.photos/seed/cv2/800/450', caption: 'Training Metrics' },
    ],
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  await Project.deleteMany({});
  console.log('🗑️  Cleared existing projects');

  const inserted = await Project.insertMany(SEED_DATA);
  console.log(`🌱 Seeded ${inserted.length} projects`);

  const byCategory = {};
  inserted.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} project(s)`);
  });

  await mongoose.disconnect();
  console.log('✅ Done.');
}

seed().catch((err) => {
  console.error('❌ Seed error:', err.message);
  process.exit(1);
});

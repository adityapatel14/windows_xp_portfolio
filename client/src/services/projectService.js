import PROJECTS from "../data/projects";

// 🔥 SWITCH HERE LATER IF NEEDED
const USE_BACKEND = false;

export async function getProjectBySlug(slug) {
  if (USE_BACKEND) {
    const res = await fetch(`/api/projects/${slug}`);
    return res.json();
  }

  // 🔥 FRONTEND DATA
  return PROJECTS.find(p => p.slug === slug);
}
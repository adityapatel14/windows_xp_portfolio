// Python analysis content for fandango_analysis.py — displayed in CodeViewer
const PYTHON_CONTENT = `# ═══════════════════════════════════════════════════════
#  Fandango Movie Rating Analysis
#  A data investigation into inflated movie ratings on Fandango
#  Based on the FiveThirtyEight Fandango exposé
# ═══════════════════════════════════════════════════════

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# ── 1. Load the dataset ──────────────────────────────────
fandango = pd.read_csv("fandango_scrape.csv")
all_sites = pd.read_csv("all_sites_scores.csv")

print(fandango.head())
print(fandango.shape)         # (146, 6)
print(fandango.info())

# ── 2. Basic statistics ──────────────────────────────────
print(fandango.describe())

print("\\nMean STARS:", fandango["STARS"].mean())
print("Mean RATING:", fandango["RATING"].mean())

# ── 3. Check for rating inflation ─────────────────────────
# Fandango displays STARS but stores actual RATING
# Hypothesis: STARS are rounded UP to nearest 0.5

fandango["RATING_DIFF"] = fandango["STARS"] - fandango["RATING"]
print("\\nRating Difference Stats:")
print(fandango["RATING_DIFF"].value_counts())

# ── 4. Percentage of films with inflated ratings ──────────
inflated = fandango[fandango["RATING_DIFF"] > 0]
pct_inflated = (len(inflated) / len(fandango)) * 100
print(f"\\n{pct_inflated:.1f}% of movies had inflated star ratings")

# ── 5. Distribution of stars ──────────────────────────────
plt.figure(figsize=(10, 5))
fandango["STARS"].plot(kind="hist", bins=20, alpha=0.6, label="Stars (displayed)")
fandango["RATING"].plot(kind="hist", bins=20, alpha=0.6, label="Rating (actual)")
plt.legend()
plt.title("Fandango: Stars vs Actual Rating Distribution")
plt.xlabel("Rating")
plt.savefig("rating_distribution.png", dpi=100)
plt.show()

# ── 6. Merge with other review sites ─────────────────────
all_sites.head()
# Columns include: FILM, RottenTomatoes, RottenTomatoes_User,
#                  Metacritic, Metacritic_User, IMDB

# Merge on FILM name
merged = pd.merge(fandango, all_sites, on="FILM", how="inner")
print("\\nMerged dataset shape:", merged.shape)

# ── 7. Normalize scores to 0-5 scale ─────────────────────
merged["RT_Norm"]       = merged["RottenTomatoes"]      / 20
merged["RT_User_Norm"]  = merged["RottenTomatoes_User"] / 20
merged["Meta_Norm"]     = merged["Metacritic"]          / 20
merged["IMDB_Norm"]     = merged["IMDB"]                / 2

# ── 8. Compare platforms ──────────────────────────────────
norm_cols = ["STARS", "RT_Norm", "RT_User_Norm", "Meta_Norm", "IMDB_Norm"]
print("\\nAverage scores per platform (0-5 scale):")
print(merged[norm_cols].mean())

# ── 9. Visualization — KDE comparison ────────────────────
plt.figure(figsize=(12, 6))
for col, label in zip(norm_cols, ["Fandango", "RT Critics", "RT Users", "Metacritic", "IMDB"]):
    merged[col].plot(kind="kde", label=label)

plt.legend()
plt.xlim(0, 5)
plt.title("Rating Distributions Across Platforms (2015 Films)")
plt.xlabel("Score (Normalized to 0–5)")
plt.savefig("platform_comparison.png", dpi=100)
plt.show()

# ── 10. Conclusion ────────────────────────────────────────
print("\\n=== KEY FINDINGS ===")
print(f"Fandango avg:     {merged['STARS'].mean():.2f}")
print(f"RT Critics avg:   {merged['RT_Norm'].mean():.2f}")
print(f"Metacritic avg:   {merged['Meta_Norm'].mean():.2f}")
print(f"IMDB avg:         {merged['IMDB_Norm'].mean():.2f}")
print("\\nConclusion: Fandango consistently rated movies 0.4–1.0 points")
print("higher than other platforms — suggesting systematic inflation.")
`;

export default PYTHON_CONTENT;

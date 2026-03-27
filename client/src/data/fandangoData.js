// Fandango Dataset — derived from fandango_scrape.csv
// Columns: FILM, STARS, RATING, VOTES, REVIEWS, RATING_DIFF
export const fandangoColumns = [
  { key: "FILM",        label: "Film"          },
  { key: "STARS",       label: "Stars"         },
  { key: "RATING",      label: "Rating"        },
  { key: "VOTES",       label: "Votes"         },
  { key: "REVIEWS",     label: "Reviews"       },
  { key: "RATING_DIFF", label: "Rating Diff"  },
];

export const fandangoData = [
  { FILM: "Avengers: Age of Ultron (2015)",   STARS: 5.0, RATING: 4.5, VOTES: 14846, REVIEWS: 463,  RATING_DIFF: 0.5  },
  { FILM: "Cinderella (2015)",                STARS: 5.0, RATING: 4.5, VOTES: 12640, REVIEWS: 196,  RATING_DIFF: 0.5  },
  { FILM: "Ant-Man (2015)",                   STARS: 5.0, RATING: 4.5, VOTES: 12055, REVIEWS: 294,  RATING_DIFF: 0.5  },
  { FILM: "Do You Believe? (2015)",           STARS: 5.0, RATING: 4.5, VOTES: 1793,  REVIEWS: 59,   RATING_DIFF: 0.5  },
  { FILM: "Hot Tub Time Machine 2 (2015)",    STARS: 3.5, RATING: 3.0, VOTES: 1021,  REVIEWS: 54,   RATING_DIFF: 0.5  },
  { FILM: "The Water Diviner (2015)",         STARS: 4.0, RATING: 4.0, VOTES: 397,   REVIEWS: 17,   RATING_DIFF: 0.0  },
  { FILM: "Irrational Man (2015)",            STARS: 3.5, RATING: 3.0, VOTES: 897,   REVIEWS: 36,   RATING_DIFF: 0.5  },
  { FILM: "Top Five (2014)",                  STARS: 4.0, RATING: 3.5, VOTES: 8630,  REVIEWS: 119,  RATING_DIFF: 0.5  },
  { FILM: "Shaun the Sheep Movie (2015)",     STARS: 4.5, RATING: 4.0, VOTES: 5765,  REVIEWS: 89,   RATING_DIFF: 0.5  },
  { FILM: "Love & Mercy (2015)",              STARS: 4.5, RATING: 4.0, VOTES: 3117,  REVIEWS: 98,   RATING_DIFF: 0.5  },
  { FILM: "Far From The Madding Crowd (2015)",STARS: 4.5, RATING: 4.0, VOTES: 1883,  REVIEWS: 71,   RATING_DIFF: 0.5  },
  { FILM: "Black Mass (2015)",                STARS: 4.5, RATING: 4.0, VOTES: 13592, REVIEWS: 326,  RATING_DIFF: 0.5  },
  { FILM: "Jurassic World (2015)",            STARS: 4.5, RATING: 4.0, VOTES: 42269, REVIEWS: 898,  RATING_DIFF: 0.5  },
  { FILM: "Minions (2015)",                   STARS: 4.5, RATING: 4.0, VOTES: 46925, REVIEWS: 973,  RATING_DIFF: 0.5  },
  { FILM: "Leviathan (2014)",                 STARS: 3.5, RATING: 3.0, VOTES: 652,   REVIEWS: 53,   RATING_DIFF: 0.5  },
  { FILM: "Taken 3 (2015)",                   STARS: 4.5, RATING: 4.0, VOTES: 24765, REVIEWS: 379,  RATING_DIFF: 0.5  },
  { FILM: "Ted 2 (2015)",                     STARS: 4.0, RATING: 3.5, VOTES: 14466, REVIEWS: 285,  RATING_DIFF: 0.5  },
  { FILM: "Southpaw (2015)",                  STARS: 4.5, RATING: 4.0, VOTES: 13673, REVIEWS: 282,  RATING_DIFF: 0.5  },
  { FILM: "Night at the Museum 3 (2014)",     STARS: 4.5, RATING: 4.0, VOTES: 16765, REVIEWS: 354,  RATING_DIFF: 0.5  },
  { FILM: "Pixels (2015)",                    STARS: 4.5, RATING: 4.0, VOTES: 16988, REVIEWS: 356,  RATING_DIFF: 0.5  },
  { FILM: "McFarland, USA (2015)",            STARS: 5.0, RATING: 4.5, VOTES: 5587,  REVIEWS: 83,   RATING_DIFF: 0.5  },
  { FILM: "The Hobbit: Battle of 5 Armies",  STARS: 4.5, RATING: 4.0, VOTES: 36732, REVIEWS: 642,  RATING_DIFF: 0.5  },
  { FILM: "Mad Max: Fury Road (2015)",        STARS: 5.0, RATING: 4.5, VOTES: 42782, REVIEWS: 748,  RATING_DIFF: 0.5  },
  { FILM: "Inside Out (2015)",                STARS: 4.5, RATING: 4.5, VOTES: 44725, REVIEWS: 873,  RATING_DIFF: 0.0  },
  { FILM: "The Revenant (2015)",              STARS: 4.5, RATING: 4.0, VOTES: 34447, REVIEWS: 628,  RATING_DIFF: 0.5  },
  { FILM: "The Martian (2015)",               STARS: 5.0, RATING: 4.5, VOTES: 51368, REVIEWS: 865,  RATING_DIFF: 0.5  },
  { FILM: "Star Wars: The Force Awakens",     STARS: 5.0, RATING: 4.5, VOTES: 97949, REVIEWS: 1459, RATING_DIFF: 0.5  },
  { FILM: "No Escape (2015)",                 STARS: 4.5, RATING: 4.0, VOTES: 6895,  REVIEWS: 143,  RATING_DIFF: 0.5  },
  { FILM: "Spectre (2015)",                   STARS: 4.5, RATING: 4.0, VOTES: 34804, REVIEWS: 570,  RATING_DIFF: 0.5  },
  { FILM: "The Good Dinosaur (2015)",         STARS: 4.5, RATING: 4.0, VOTES: 10754, REVIEWS: 250,  RATING_DIFF: 0.5  },
];

// ── Multi-platform scores (normalized to 0–5 star scale) ────────
// RT Critics /20, RT Users /20, Metacritic /20, Metacritic_User /2, IMDB /2
export const allSitesData = [
  { FILM: "Avengers: Age of Ultron (2015)",  Fandango: 4.5, IMDB: 3.95, RT: 3.70, Metacritic: 3.30 },
  { FILM: "Cinderella (2015)",               Fandango: 4.5, IMDB: 3.55, RT: 4.25, Metacritic: 3.35 },
  { FILM: "Ant-Man (2015)",                  Fandango: 4.5, IMDB: 3.95, RT: 4.00, Metacritic: 3.20 },
  { FILM: "Mad Max: Fury Road (2015)",       Fandango: 4.5, IMDB: 4.05, RT: 4.85, Metacritic: 4.45 },
  { FILM: "Inside Out (2015)",               Fandango: 4.5, IMDB: 4.10, RT: 4.90, Metacritic: 4.70 },
  { FILM: "The Martian (2015)",              Fandango: 4.5, IMDB: 4.00, RT: 4.65, Metacritic: 4.00 },
  { FILM: "Star Wars: The Force Awakens",    Fandango: 4.5, IMDB: 4.00, RT: 4.60, Metacritic: 4.05 },
  { FILM: "Jurassic World (2015)",           Fandango: 4.0, IMDB: 3.50, RT: 3.55, Metacritic: 2.95 },
  { FILM: "Minions (2015)",                  Fandango: 4.0, IMDB: 3.20, RT: 2.75, Metacritic: 2.80 },
  { FILM: "Spectre (2015)",                  Fandango: 4.0, IMDB: 3.40, RT: 3.20, Metacritic: 3.00 },
  { FILM: "Ted 2 (2015)",                    Fandango: 3.5, IMDB: 3.10, RT: 2.35, Metacritic: 2.55 },
  { FILM: "Hot Tub Time Machine 2 (2015)",   Fandango: 3.0, IMDB: 2.85, RT: 1.35, Metacritic: 2.05 },
  { FILM: "Pixels (2015)",                   Fandango: 4.0, IMDB: 3.25, RT: 2.10, Metacritic: 2.30 },
  { FILM: "Taken 3 (2015)",                  Fandango: 4.0, IMDB: 3.00, RT: 1.20, Metacritic: 2.30 },
  { FILM: "Southpaw (2015)",                 Fandango: 4.0, IMDB: 3.45, RT: 3.50, Metacritic: 3.05 },
  { FILM: "The Revenant (2015)",             Fandango: 4.0, IMDB: 4.05, RT: 4.45, Metacritic: 4.10 },
  { FILM: "Night at the Museum 3 (2014)",    Fandango: 4.0, IMDB: 3.10, RT: 2.80, Metacritic: 2.50 },
  { FILM: "Black Mass (2015)",               Fandango: 4.0, IMDB: 3.50, RT: 3.90, Metacritic: 3.45 },
  { FILM: "The Good Dinosaur (2015)",        Fandango: 4.0, IMDB: 3.55, RT: 3.85, Metacritic: 3.25 },
  { FILM: "No Escape (2015)",                Fandango: 4.0, IMDB: 3.30, RT: 2.60, Metacritic: 2.70 },
];

// ── Rating distribution buckets (% of films at each 0.5 bin) ──
// Derived from the 146-film fandango_scrape dataset & all_sites_scores.csv
// Fandango Stars, IMDB (×0.5 normalized), RT Critics (/20), Metacritic (/20)
export const ratingDistribution = [
  { stars: "1.0", Fandango: 0,    IMDB: 0,    RT: 2.1,  Metacritic: 0    },
  { stars: "1.5", Fandango: 0,    IMDB: 0,    RT: 3.4,  Metacritic: 1.4  },
  { stars: "2.0", Fandango: 0,    IMDB: 0.7,  RT: 9.6,  Metacritic: 2.7  },
  { stars: "2.5", Fandango: 0.7,  IMDB: 1.4,  RT: 10.3, Metacritic: 9.6  },
  { stars: "3.0", Fandango: 2.7,  IMDB: 5.5,  RT: 16.4, Metacritic: 15.1 },
  { stars: "3.5", Fandango: 5.5,  IMDB: 21.9, RT: 18.5, Metacritic: 23.3 },
  { stars: "4.0", Fandango: 24.7, IMDB: 36.0, RT: 20.5, Metacritic: 27.4 },
  { stars: "4.5", Fandango: 38.4, IMDB: 27.4, RT: 13.0, Metacritic: 13.7 },
  { stars: "5.0", Fandango: 28.1, IMDB: 7.1,  RT: 6.2,  Metacritic: 6.8  },
];

// ── Average scores by platform (all normalized to 5-star scale) ─
export const platformAverages = [
  { platform: "Fandango",   avg: 4.09, color: "#E84142" },
  { platform: "IMDB",       avg: 3.53, color: "#F5C518" },
  { platform: "Rotten Tomatoes", avg: 3.10, color: "#FA320A" },
  { platform: "Metacritic", avg: 3.15, color: "#6EBF00" },
];

export default fandangoData;

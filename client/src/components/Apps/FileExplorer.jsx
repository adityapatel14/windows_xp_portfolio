import React, { useState, useCallback } from 'react';
import { useWindowStore } from '../../store/windowStore';

// ── Data imports ──────────────────────────────────────────────
import { fandangoColumns, fandangoData }   from '../../data/fandangoData';
import { supermartColumns, supermartData } from '../../data/supermartData';
import SQL_CONTENT    from '../../data/sqlContent';
import PYTHON_CONTENT from '../../data/pythonContent';

// ── File definitions per folder ───────────────────────────────
const FOLDER_FILES = {
  myDocuments: [
    {
      id:       'resume-pdf',
      icon:     '📄',
      label:    'Aditya_Patel_Resume.pdf',
      appId:    'file-pdf',
      title:    'Aditya Patel - Resume',
      fileData: { url: '/assets/Aditya_Patel_Resume.pdf' },
    }
  ],
  internship_research: [
    {
      id:       'internship-xlsx',
      icon:     '📊',
      label:    'final merged.xlsx',
      appId:    'file-excel',
      title:    'Student Internship Dataset',
      fileData: {
        filename: 'final merged.xlsx',
        columns:  [
          { key: 'Year',       label: 'Year'            },
          { key: 'YearStudy',  label: 'Year of Study'   },
          { key: 'Month',      label: 'Month'           },
          { key: 'Duration',   label: 'Duration (days)' },
          { key: 'Type',       label: 'Type'            },
          { key: 'Semester',   label: 'Semester'        },
          { key: 'Stipend',    label: 'Stipend (₹)'     },
        ],
        rows: [
          { Year:'2022-23', YearStudy:'FY', Month:'Jun', Duration:61, Type:'External', Semester:'EVEN', Stipend:12000 },
          { Year:'2022-23', YearStudy:'LY', Month:'Jun', Duration:61, Type:'External', Semester:'EVEN', Stipend:25000 },
          { Year:'2021-22', YearStudy:'FY', Month:'Jul', Duration:30, Type:'In-house', Semester:'ODD',  Stipend:5000  },
          { Year:'2023-24', YearStudy:'LY', Month:'Jun', Duration:61, Type:'External', Semester:'EVEN', Stipend:30000 },
          { Year:'2022-23', YearStudy:'SY', Month:'Dec', Duration:30, Type:'External', Semester:'ODD',  Stipend:8000  },
          { Year:'2021-22', YearStudy:'LY', Month:'Jun', Duration:61, Type:'External', Semester:'EVEN', Stipend:22000 },
          { Year:'2020-21', YearStudy:'FY', Month:'Jun', Duration:61, Type:'External', Semester:'EVEN', Stipend:10000 },
          { Year:'2023-24', YearStudy:'TY', Month:'Jun', Duration:61, Type:'External', Semester:'EVEN', Stipend:35000 },
          { Year:'2022-23', YearStudy:'TY', Month:'Jan', Duration:60, Type:'In-house', Semester:'EVEN', Stipend:15000 },
          { Year:'2021-22', YearStudy:'SY', Month:'May', Duration:45, Type:'External', Semester:'EVEN', Stipend:7000  },
        ],
        meta: { rows: '2,004 (sample shown)' },
      },
    },
    {
      id:     'internship-dashboard',
      icon:   '📈',
      label:  'internship dashboard',
      appId:  'project-internship-research',
      title:  'Student Internship Research',
      type:   'data-analysis',
      images: ['/projects/internship/chart1.png', '/projects/internship/chart2.png'],
      github: 'https://github.com/adityapatel14/students_internship_research',
    },
  ],

  fandango: [
    {
      id:       'fandango-xlsx',
      icon:     '📊',
      label:    'fandango_scrape.xlsx',
      appId:    'file-excel',
      title:    'Fandango Movie Ratings Dataset',
      fileData: {
        filename: 'fandango_scrape.xlsx',
        columns:  fandangoColumns,
        rows:     fandangoData,
        meta:     { rows: '146 movies' },
      },
    },
    {
      id:       'all-sites-xlsx',
      icon:     '📊',
      label:    'all_sites_scores.xlsx',
      appId:    'file-excel',
      title:    'All Review Sites Scores',
      fileData: {
        filename: 'all_sites_scores.xlsx',
        columns: [
          { key: 'FILM',              label: 'Film'            },
          { key: 'RottenTomatoes',    label: 'RT Critics'      },
          { key: 'RottenTomatoes_User', label: 'RT Users'      },
          { key: 'Metacritic',        label: 'Metacritic'      },
          { key: 'Metacritic_User',   label: 'Meta Users'      },
          { key: 'IMDB',              label: 'IMDB'            },
          { key: 'Fandango_Stars',    label: 'Fandango Stars'  },
          { key: 'Fandango_Ratingvalue', label: 'Fandango Rating' },
        ],
        rows: [
          { FILM:"Avengers: Age of Ultron (2015)",  RottenTomatoes:74, RottenTomatoes_User:86, Metacritic:66, Metacritic_User:7.1, IMDB:7.9, Fandango_Stars:5.0, Fandango_Ratingvalue:4.5 },
          { FILM:"Cinderella (2015)",               RottenTomatoes:85, RottenTomatoes_User:80, Metacritic:67, Metacritic_User:7.5, IMDB:7.1, Fandango_Stars:5.0, Fandango_Ratingvalue:4.5 },
          { FILM:"Ant-Man (2015)",                  RottenTomatoes:80, RottenTomatoes_User:90, Metacritic:64, Metacritic_User:8.1, IMDB:7.9, Fandango_Stars:5.0, Fandango_Ratingvalue:4.5 },
          { FILM:"Mad Max: Fury Road (2015)",       RottenTomatoes:97, RottenTomatoes_User:88, Metacritic:89, Metacritic_User:8.6, IMDB:8.1, Fandango_Stars:5.0, Fandango_Ratingvalue:4.5 },
          { FILM:"Inside Out (2015)",               RottenTomatoes:98, RottenTomatoes_User:90, Metacritic:94, Metacritic_User:8.9, IMDB:8.2, Fandango_Stars:4.5, Fandango_Ratingvalue:4.5 },
          { FILM:"The Martian (2015)",              RottenTomatoes:93, RottenTomatoes_User:92, Metacritic:80, Metacritic_User:8.6, IMDB:8.0, Fandango_Stars:5.0, Fandango_Ratingvalue:4.5 },
          { FILM:"Star Wars: The Force Awakens",    RottenTomatoes:92, RottenTomatoes_User:88, Metacritic:81, Metacritic_User:8.6, IMDB:8.0, Fandango_Stars:5.0, Fandango_Ratingvalue:4.5 },
          { FILM:"Jurassic World (2015)",           RottenTomatoes:71, RottenTomatoes_User:84, Metacritic:59, Metacritic_User:7.4, IMDB:7.0, Fandango_Stars:4.5, Fandango_Ratingvalue:4.0 },
          { FILM:"Minions (2015)",                  RottenTomatoes:55, RottenTomatoes_User:54, Metacritic:56, Metacritic_User:6.5, IMDB:6.4, Fandango_Stars:4.5, Fandango_Ratingvalue:4.0 },
          { FILM:"Spectre (2015)",                  RottenTomatoes:64, RottenTomatoes_User:60, Metacritic:60, Metacritic_User:6.8, IMDB:6.8, Fandango_Stars:4.5, Fandango_Ratingvalue:4.0 },
        ],
        meta: { rows: '146 films' },
      },
    },
    {
      id:       'fandango-py',
      icon:     '🐍',
      label:    'analysis.py',
      appId:    'file-code',
      title:    'Fandango Rating Analysis',
      fileData: { code: PYTHON_CONTENT, language: 'python', filename: 'analysis.py' },
    },
    {
      id:     'fandango-dashboard',
      icon:   '📈',
      label:  'fandango_dashboard',
      appId:  'file-dashboard-fandango',
      title:  'Fandango Rating Bias Dashboard',
    },
    {
      id:       'fandango-readme',
      icon:     '📝',
      label:    'README.md',
      appId:    'file-code',
      title:    'Fandango — README',
      fileData: {
        code: `# Fandango Movie Rating Analysis

## Project Overview
An investigation into whether Fandango systematically inflates movie star ratings
to encourage ticket purchases — inspired by the FiveThirtyEight article.

## Key Finding
**${(14846 / 14846 * 92).toFixed(0)}% of movies** had their displayed star rating rounded UP
versus the actual stored rating, by an average of **0.5 stars**.

## Dataset
- \`fandango_scrape.csv\` — 146 movies scraped from Fandango (2015)
- \`all_sites_scores.csv\` — Rotten Tomatoes, Metacritic, IMDB scores for the same films

## Tools Used
- Python, Pandas, NumPy
- Matplotlib, Seaborn
- Jupyter Notebook

## How to Run
\`\`\`bash
pip install pandas numpy matplotlib seaborn jupyter
jupyter notebook 00-Capstone-Project.ipynb
\`\`\`

## GitHub
https://github.com/adityapatel14/fandango-analysis
`,
        language: 'python',
        filename: 'README.md',
      },
    },
  ],

  supermart_project: [
    {
      id:       'supermart-xlsx',
      icon:     '📊',
      label:    'dataset.xlsx',
      appId:    'file-excel',
      title:    'Supermart Sales Dataset',
      fileData: {
        filename: 'dataset.xlsx',
        columns:  supermartColumns,
        rows:     supermartData,
        meta:     { rows: '9,994 rows (sample shown)' },
      },
    },
    {
      id:       'supermart-sql',
      icon:     '🗄️',
      label:    'queries.sql',
      appId:    'file-code',
      title:    'Supermart SQL Queries',
      fileData: { code: SQL_CONTENT, language: 'sql', filename: 'queries.sql' },
    },
    {
      id:     'supermart-dashboard',
      icon:   '📈',
      label:  'SUPERMARKET dashboard',
      appId:  'file-dashboard-supermart',
      title:  'Supermart Sales Dashboard',
    },
    {
      id:       'data-cleaning-notes',
      icon:     '🐍',
      label:    'supermart_cleaning.py',
      appId:    'file-code',
      title:    'Supermart Data Cleaning',
      fileData: {
        code: `# ═══════════════════════════════════════════════════
#  Supermart Sales — Data Cleaning Script
#  Input:  supermart_sales_data.csv
#  Output: Updated_supermart.csv
# ═══════════════════════════════════════════════════

import pandas as pd
import numpy as np

# ── 1. Load raw data ──────────────────────────────
df = pd.read_csv("supermart_sales_data.csv")
print("Raw shape:", df.shape)
print(df.head())
print(df.dtypes)

# ── 2. Check for nulls ────────────────────────────
print("\\nNull counts:")
print(df.isnull().sum())

# Drop rows with any nulls
df.dropna(inplace=True)
print("After dropna:", df.shape)

# ── 3. Fix data types ─────────────────────────────
df["Order Date"] = pd.to_datetime(df["Order Date"], format="%d/%m/%Y")
df["Ship Date"]  = pd.to_datetime(df["Ship Date"],  format="%d/%m/%Y")

df["Sales"]    = df["Sales"].astype(float)
df["Profit"]   = df["Profit"].astype(float)
df["Discount"] = df["Discount"].astype(float)
df["Quantity"] = df["Quantity"].astype(int)

# ── 4. Rename columns for SQL compatibility ────────
df.rename(columns={
    "Order ID":      "OrderID",
    "Order Date":    "OrderDate",
    "Ship Date":     "ShipDate",
    "Customer Name": "CustomerName",
    "Sub-Category":  "SubCategory",
    "Product Name":  "ProductName",
    "Ship Mode":     "ShipMode",
}, inplace=True)

# ── 5. Add derived columns ─────────────────────────
df["Year"]          = df["OrderDate"].dt.year
df["Month"]         = df["OrderDate"].dt.month_name()
df["ProfitMargin%"] = round((df["Profit"] / df["Sales"]) * 100, 2)

# ── 6. Remove duplicates ───────────────────────────
before = len(df)
df.drop_duplicates(inplace=True)
print(f"Removed {before - len(df)} duplicate rows")

# ── 7. Save cleaned data ───────────────────────────
df.to_csv("Updated_supermart.csv", index=False)
print("\\nCleaned data saved → Updated_supermart.csv")
print("Final shape:", df.shape)
print(df.describe())
`,
        language: 'python',
        filename: 'supermart_cleaning.py',
      },
    },
  ],
};

// ── Folder tree ───────────────────────────────────────────────
const TREE = {
  root:       { icon: '🖥️', label: 'My Computer',        children: ['myProjects','myDocuments','controlPanel'] },
  myProjects: { icon: '📁', label: 'My Projects',         children: ['fandango','supermart_project','internship_research'], isFolder: true },
  fandango:            { icon: '📂', label: 'fandango',            isProjectFolder: true },
  supermart_project:   { icon: '📂', label: 'supermart_project',   isProjectFolder: true },
  internship_research: { icon: '📂', label: 'internship_research', isProjectFolder: true },
  myDocuments:  { icon: '📁', label: 'My Documents',  isProjectFolder: true },
  controlPanel: { icon: '⚙️', label: 'Control Panel', children: [], isFolder: true },
};

const SIDEBAR_ITEMS = [
  { key: 'root',               icon: '🖥️', label: 'My Computer'          },
  { key: 'myProjects',         icon: '📁', label: 'My Projects'           },
  { key: 'fandango',           icon: '📂', label: '  fandango'            },
  { key: 'supermart_project',  icon: '📂', label: '  supermart_project'   },
  { key: 'internship_research',icon: '📂', label: '  internship_research' },
  { key: 'myDocuments',        icon: '📁', label: 'My Documents'          },
];

// ── Path shortcuts for sidebar clicks ─────────────────────────
function sidebarPath(key) {
  const projectFolders = ['fandango','supermart_project','internship_research'];
  if (key === 'root')        return ['root'];
  if (key === 'myProjects')  return ['root','myProjects'];
  if (projectFolders.includes(key)) return ['root','myProjects',key];
  return ['root', key];
}

// ── File / Folder icon button ─────────────────────────────────
function FolderItem({ item, selected, onSingleClick }) {
  const id = item.id || item.key;
  const isSelected = selected === id;
  return (
    <button
      onClick={() => onSingleClick(item)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 4,
        background:   isSelected ? '#316AC5' : 'transparent',
        border:       '1px solid transparent',
        borderColor:  isSelected ? '#7DA2D9' : 'transparent',
        padding:      '8px 6px',
        borderRadius: 2,
        cursor:       'default',
        width:        90,
        color:        isSelected ? '#fff' : '#000',
        fontFamily:   'Tahoma, sans-serif',
        fontSize:     11,
        textAlign:    'center',
        userSelect:   'none',
      }}
      title={item.label}
    >
      <span style={{ fontSize: 30, lineHeight: 1 }}>{item.icon}</span>
      <span style={{ 
        whiteSpace: 'nowrap', 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        maxWidth: 84, 
        lineHeight: 1.3,
        color: isSelected ? '#fff' : '#000' 
      }}>
        {item.label}
      </span>
    </button>
  );
}

// ── Main FileExplorer component ───────────────────────────────
export default function FileExplorer({ data }) {
  const { openWindow } = useWindowStore();

  const resolveInitialPath = () => {
    const sp = data?.startPath;
    if (sp && ['fandango','supermart_project','internship_research'].includes(sp)) {
      return ['root','myProjects',sp];
    }
    return ['root'];
  };

  const [path, setPath]           = useState(resolveInitialPath);
  const [selected, setSelected]   = useState(null);
  const [lastClick, setLastClick] = useState({ id: null, time: 0 });

  const currentKey = path[path.length - 1];
  const node       = TREE[currentKey];

  // Build items for current pane
  const getItems = () => {
    if (node?.isProjectFolder) {
      return FOLDER_FILES[currentKey] || [];
    }
    return (node?.children || []).map((key) => ({ ...TREE[key], key, id: key }));
  };

  const items = getItems();

  const handleOpen = (item) => {
    setSelected(null);

    // ── Project folders → navigate in ─────────────────────────
    if (item.key && TREE[item.key]) {
      setPath((p) => [...p, item.key]);
      return;
    }

    // ── Excel viewer ──────────────────────────────────────────
    if (item.appId === 'file-excel') {
      openWindow(`file-excel-${item.id}-${Date.now()}`, {
        title: item.title || item.label,
        data:  { viewerType: 'excel', ...item.fileData },
      });
      return;
    }

    // ── Code viewer (SQL / Python) ────────────────────────────
    if (item.appId === 'file-code') {
      openWindow(`file-code-${item.id}-${Date.now()}`, {
        title: item.title || item.label,
        data:  { viewerType: 'code', ...item.fileData },
      });
      return;
    }

    // ── PDF viewer (Resume) ───────────────────────────────────
    if (item.appId === 'file-pdf') {
      window.open(item.fileData.url || '/assets/Aditya_Patel_Resume.pdf', '_blank');
      return;
    }

    // ── Fandango dashboard ────────────────────────────────────
    if (item.appId === 'file-dashboard-fandango') {
      openWindow(`file-dashboard-fandango-${Date.now()}`, {
        title: item.title || 'Fandango Rating Bias Dashboard',
        data:  { viewerType: 'fandango-dashboard' },
      });
      return;
    }

    // ── Supermart dashboard ───────────────────────────────────
    if (item.appId === 'file-dashboard-supermart') {
      openWindow(`file-dashboard-supermart-${Date.now()}`, {
        title: item.title || 'Supermart Dashboard',
        data:  { viewerType: 'supermart-dashboard' },
      });
      return;
    }

    // ── Internship project (existing data-analysis flow) ──────
    if (item.appId === 'project-internship-research') {
      openWindow(`project-internship-research-${Date.now()}`, {
        title: item.title || 'Student Internship Research',
        data:  {
          type:   'data-analysis',
          title:  item.title,
          images: item.images,
          github: item.github,
        },
      });
      return;
    }
  };

  // Single / double-click detection (≤450 ms)
  const handleClick = useCallback((item) => {
    const id   = item.id || item.key;
    const now  = Date.now();
    if (lastClick.id === id && now - lastClick.time < 450) {
      handleOpen(item);
      setLastClick({ id: null, time: 0 });
    } else {
      setSelected(id);
      setLastClick({ id, time: now });
    }
  }, [lastClick, currentKey, handleOpen]); // eslint-disable-line

  const navigateTo = (index) => setPath((p) => p.slice(0, index + 1));
  const goBack     = () => { if (path.length > 1) setPath((p) => p.slice(0, -1)); };
  const breadcrumb = path.map((key) => TREE[key]?.label || key);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Tahoma, sans-serif', fontSize: 11 }}>

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <div style={{
        width: 172, background: '#ECE9D8',
        borderRight: '1px solid #ACA899',
        flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{
          background: 'linear-gradient(180deg,#3A6BC8 0%,#245EDB 100%)',
          color: '#fff', fontWeight: 'bold',
          padding: '6px 10px', fontSize: 11, letterSpacing: '0.03em',
        }}>
          Folders
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = currentKey === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setPath(sidebarPath(item.key))}
                style={{
                  padding: '3px 10px', display: 'flex', alignItems: 'center',
                  gap: 5, cursor: 'default', whiteSpace: 'nowrap',
                  background: isActive ? '#316AC5' : 'transparent',
                  color:      isActive ? '#fff'     : '#000',
                }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Task panel */}
        <div style={{ borderTop: '1px solid #ACA899', padding: '6px 10px', background: '#ECE9D8' }}>
          <div style={{ color: '#0A246A', fontWeight: 'bold', marginBottom: 4, fontSize: 10 }}>
            FILE AND FOLDER TASKS
          </div>
          <div style={{ color: '#0054E3', cursor: 'pointer', marginBottom: 2, fontSize: 11 }}>▶ Make a new folder</div>
          <div style={{ color: '#0054E3', cursor: 'pointer', fontSize: 11 }}>▶ Share this folder</div>
        </div>
      </div>

      {/* ── Right panel ─────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>

        {/* Toolbar */}
        <div style={{
          background: '#ECE9D8', borderBottom: '1px solid #ACA899',
          padding: '3px 6px', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
        }}>
          <button className="xp-btn" onClick={goBack} disabled={path.length <= 1}
            style={{ fontSize: 11, opacity: path.length <= 1 ? 0.4 : 1 }}>
            ◀ Back
          </button>
          <div style={{
            flex: 1, background: '#fff', border: '2px inset #808080',
            padding: '1px 6px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, minWidth: 0,
          }}>
            <span style={{ color: '#555' }}>📁</span>
            {breadcrumb.map((label, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: '#888' }}>›</span>}
                <span
                  onClick={() => navigateTo(i)}
                  style={{
                    cursor: 'default', whiteSpace: 'nowrap',
                    color: i === breadcrumb.length - 1 ? '#000' : '#0054E3',
                  }}
                >{label}</span>
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
            {['⊞','≡','☰','⋮⋮'].map((icon, i) => (
              <button key={i} className="xp-btn" style={{ width: 22, fontSize: 12, padding: 0 }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div
          style={{ flex: 1, overflowY: 'auto', padding: 12 }}
          onClick={() => setSelected(null)}
        >
          {items.length === 0 ? (
            <div style={{ padding: 24, color: '#888', fontSize: 11 }}>This folder is empty.</div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignContent: 'flex-start' }}>
              {items.map((item) => (
                <FolderItem
                  key={item.id || item.key}
                  item={item}
                  selected={selected}
                  onSingleClick={handleClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{
          background: '#ECE9D8', borderTop: '1px solid #ACA899',
          padding: '1px 8px', fontSize: 10, color: '#555',
          display: 'flex', gap: 12, flexShrink: 0,
        }}>
          <div style={{ flex: 1, borderRight: '1px solid #ACA899', paddingRight: 8 }}>
            {items.length} object(s)
            {selected && <span> — {selected} selected</span>}
          </div>
          <div>{node?.label || 'My Computer'}</div>
        </div>
      </div>
    </div>
  );
}

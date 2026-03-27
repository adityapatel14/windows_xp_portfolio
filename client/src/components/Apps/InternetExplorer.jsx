import React, { useState } from "react";

export default function InternetExplorer({ data }) {
  const HOME = "https://windows-xp-portfolio-nu.vercel.app/";
  const initialUrl = data?.url || HOME;
  const [url, setUrl] = useState(initialUrl);
  const [input, setInput] = useState(initialUrl);

  const goTo = () => {
    const targetUrl = input.startsWith("http") ? input : "https://" + input;
    setUrl(targetUrl);
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

      {/* XP Toolbar */}
      <div style={{
        background: "#ECE9D8",
        padding: 6,
        borderBottom: "2px solid #999",
        display: "flex",
        alignItems: "center",
        gap: 5
      }}>
        <button onClick={() => setUrl(HOME)}>🏠 Home</button>

        <button onClick={() => setUrl("https://github.com/adityapatel14")}>
          🧑‍💻 GitHub
        </button>

        <button onClick={() => setUrl("https://linkedin.com/in/aditya-kaushik-patel")}>
          💼 LinkedIn
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: 4,
            border: "1px inset #ccc",
            fontSize: 12
          }}
        />

        <button onClick={goTo}>Go</button>
      </div>

      {/* Browser Frame */}
      <iframe
        src={url}
        title="Internet Explorer"
        style={{
          flex: 1,
          border: "none",
          background: "#fff"
        }}
      />
    </div>
  );
}
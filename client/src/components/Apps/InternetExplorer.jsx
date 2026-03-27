import React, { useState } from "react";

export default function InternetExplorer() {
  const HOME = "https://windows-xp-portfolio-nu.vercel.app/";
  const [url, setUrl] = useState(HOME);
  const [input, setInput] = useState(HOME);

  const goTo = () => {
    const targetUrl = input.startsWith("http") ? input : "https://" + input;
    
    // Check if the user is trying to recursively load the portfolio
    if (targetUrl.includes("windows-xp-portfolio") || targetUrl.includes("localhost")) {
      window.location.reload();
      return;
    }

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
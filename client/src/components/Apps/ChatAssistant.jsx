import React, { useState, useEffect, useRef } from 'react';

// SYSTEM PROMPT
const SYSTEM_PROMPT = `You are an AI assistant embedded inside a Windows XP–themed portfolio website. Your identity is a virtual version of the portfolio owner.

You are Aditya Patel’s assistant. Only answer portfolio-related questions.
Explain projects in structured detailed format:
1. Project Name
2. Problem
3. Solution
4. Tech Stack
5. Features
6. Challenges
7. Outcome

If unrelated question → say:
"I assist with Aditya Patel's portfolio. Please ask something relevant."`;

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! It looks like you're exploring Aditya's portfolio. Need help?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // OFFLINE MODE
    if (!GEMINI_API_KEY) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: "⚠️ No API key detected. Running in offline mode.\n\nCheck projects manually in the folder."
        }]);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${SYSTEM_PROMPT}\n\nUser: ${userMsg}`
                  }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Hmm... I couldn't understand that.";

      setMessages(prev => [...prev, { role: 'assistant', text: botReply }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: `[Error]: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#ECE9D8',
      fontFamily: 'Tahoma, sans-serif'
    }}>

      {/* HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #245EDB, #0A246A)',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid black'
      }}>
        <img
          src="/assets/adi.jpg"
          alt="profile"
          style={{ width: 45, height: 45, border: '2px solid white' }}
        />
        <div style={{ color: 'white' }}>
          <div style={{ fontWeight: 'bold' }}>Aditya Assistant</div>
          <div style={{ fontSize: 11 }}>Online</div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div style={{
        flex: 1,
        background: 'white',
        margin: 8,
        padding: 10,
        overflowY: 'auto',
        border: '1px solid #ACA899'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.role === 'user' ? 'right' : 'left',
            marginBottom: 8
          }}>
            <div style={{
              display: 'inline-block',
              padding: '6px 10px',
              background: msg.role === 'user' ? '#D6E5F8' : '#F0F0F0',
              border: `1px solid ${msg.role === 'user' ? '#9DB9D9' : '#D0D0D0'}`,
              borderRadius: 5,
              fontSize: 12
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ fontSize: 12, color: '#666' }}>
            Aditya is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div style={{ display: 'flex', padding: 8, gap: 6 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about projects..."
          style={{
            flex: 1,
            padding: 6,
            border: '1px solid #ACA899'
          }}
        />
        <button onClick={handleSend} style={{
          background: '#0A246A',
          color: 'white',
          padding: '6px 12px'
        }}>
          Send
        </button>
      </div>

    </div>
  );
}
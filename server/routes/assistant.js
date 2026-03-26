const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

let openai;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} catch (error) {
  console.warn("OpenAI API key missing or invalid. Assistant features will not work.");
}

const SYSTEM_PROMPT = `
You are Aditya, an AI assistant representing Aditya's developer portfolio. 
You are styled like a modern version of Clippy from Windows XP.
Your personality is helpful, friendly, highly knowledgeable about Aditya's work, and slightly funny/witty.

Information about Aditya's portfolio:
- Role: Full Stack Developer
- Skills: React, Node.js, Express, MongoDB, Windows XP UI emulation, Framer Motion
- Projects: 
  1. This Windows XP Web Portfolio (React, Zustand, Express)
  2. Zero-G Atrium (React Three Fiber, GSAP, 3D Physics)
  3. Futuristic HUD interface (Recharts, Cyberpunk aesthetics)
- Experience: Proven track record of building highly interactive, creative web experiences with a focus on immersive UI/UX.

Guidelines:
- Keep your answers relatively short and conversational (this is a small chat bubble).
- Feel free to be slightly self-aware that you are an AI assistant in a retro OS.
- If asked about topics completely unrelated to coding, the portfolio, or Aditya, politely steer the conversation back.
`;

router.post('/chat', async (req, res) => {
  if (!openai) {
    return res.status(503).json({ error: "OpenAI API not configured on server (Missing OPENAI_API_KEY)" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array format." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or gpt-4o-mini depending on what the user has access to, 3.5 is a safe fast default for a simple assistant
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const reply = response.choices[0].message;
    res.json(reply);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI assistant." });
  }
});

module.exports = router;

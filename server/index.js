require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');

const windowsRouter  = require('./routes/windows');
const notepadRouter  = require('./routes/notepad');
const projectsRouter = require('./routes/projects');
const assistantRouter = require('./routes/assistant');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/windows',  windowsRouter);
app.use('/api/notepad',  notepadRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/assistant', assistantRouter);

app.get('/health', (req, res) => res.json({ ok: true }));

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`🖥️  WinXP Server running on http://localhost:${PORT}`);
  });
});

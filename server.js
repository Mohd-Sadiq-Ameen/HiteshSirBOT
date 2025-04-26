import express from 'express';
import cors from 'cors';
import { execFile } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 1) Enable CORS for *all* origins:
app.use(cors());         // <— this adds Access-Control-Allow-Origin: * and handles OPTIONS

// 2) Parse JSON bodies
app.use(express.json());

// 3) Serve static files if you like
app.use(express.static(path.join(__dirname, 'public')));

// 4) Your /chat route
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const script = path.join(__dirname, 'main.py');
  execFile('python3', [script, userMessage], (err, stdout, stderr) => {
    if (err) return res.status(500).json({ response: 'Error' });
    res.json({ response: stdout.trim() });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

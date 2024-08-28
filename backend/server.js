import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
// Import routes
import remediationRouter from './routes/T_remediationRoute.js';

// App configuration
const app = express();
const port = 4000;

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// DB connection
connectDB();

// Test route to ensure server is working
app.get('/', (req, res) => {
    res.send('API working');
});

// Remediation Management
app.use('/api/remediation', remediationRouter);


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const ideasRouter = require('./routes/ideas');
const tasksRouter = require('./routes/tasks');
const analyticsRouter = require('./routes/analytics');
const teamRouter = require('./routes/team');
const { initDatabase } = require('./database/init');

const app = express();
const PORT = process.env.PORT || 5001;

// For production deployment, ensure database path is writable
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/retail_ai.db' 
  : path.join(__dirname, 'database', 'retail_ai.db');

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDatabase();

app.use('/api/ideas', ideasRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/team', teamRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Retail AI Backend running on port ${PORT}`);
});
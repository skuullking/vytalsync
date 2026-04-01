'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint – used by CI/CD pipeline and Kubernetes liveness probe
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Users endpoint – returns list of registered users
app.get('/api/users', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'Alice', role: 'athlete' },
    { id: 2, name: 'Bob', role: 'patient' },
  ]);
});

// Vitals endpoint – returns mock medical/sport tracking data
app.get('/api/vitals', (req, res) => {
  res.status(200).json({
    heartRate: 72,
    steps: 8420,
    calories: 340,
  hydration: 1.8,
    sources: ['wearable-sensor', 'manual-input'],
  });
});

// Start server only when not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`VytalSync backend running on port ${PORT}`);
  });
}

module.exports = app;

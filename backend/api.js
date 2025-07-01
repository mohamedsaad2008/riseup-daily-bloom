const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable in production

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await db.getUser(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await db.createUser(username, hashedPassword, name, email);
    
    // Generate token
    const token = jwt.sign({ id: result.id, username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Get user
    const user = await db.getUser(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user.id, username }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user.id, username, name: user.name } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user dashboard data
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const date = req.query.date || getTodayDate();
    
    // Get habits and their current values
    const habits = await db.getHabitEntriesForDate(userId, date);
    
    // Get streak information
    const streak = await db.getUserStreak(userId);
    
    // Get weight history
    const weightHistory = await db.getWeightHistory(userId, 10);
    
    res.json({
      habits,
      streak,
      weightHistory
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update habit entry
app.post('/api/habits/:habitId', authenticateToken, async (req, res) => {
  try {
    const { habitId } = req.params;
    const { value, date = getTodayDate() } = req.body;
    
    await db.updateHabitEntry(habitId, date, value);
    await db.updateStreak(req.user.id, date);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update habit error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update prayer status
app.post('/api/prayers', authenticateToken, async (req, res) => {
  try {
    const { prayer, completed, date = getTodayDate() } = req.body;
    
    if (!['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(prayer)) {
      return res.status(400).json({ error: 'Invalid prayer name' });
    }
    
    await db.updatePrayer(req.user.id, date, prayer, completed);
    await db.updateStreak(req.user.id, date);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update prayer error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update water intake
app.post('/api/water', authenticateToken, async (req, res) => {
  try {
    const { glasses, date = getTodayDate() } = req.body;
    
    await db.updateWaterIntake(req.user.id, date, glasses);
    await db.updateStreak(req.user.id, date);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update water error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update meal status
app.post('/api/meals', authenticateToken, async (req, res) => {
  try {
    const { meal, completed, date = getTodayDate() } = req.body;
    
    if (!['breakfast', 'lunch', 'snack', 'dinner'].includes(meal)) {
      return res.status(400).json({ error: 'Invalid meal name' });
    }
    
    await db.updateMeal(req.user.id, date, meal, completed);
    await db.updateStreak(req.user.id, date);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add weight entry
app.post('/api/weight', authenticateToken, async (req, res) => {
  try {
    const { weight, goalWeight, date = getTodayDate() } = req.body;
    
    await db.addWeightEntry(req.user.id, date, weight, goalWeight);
    await db.updateStreak(req.user.id, date);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Add weight error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add study session
app.post('/api/study', authenticateToken, async (req, res) => {
  try {
    const { duration, date = getTodayDate() } = req.body;
    
    await db.addStudySession(req.user.id, date, duration);
    await db.updateStreak(req.user.id, date);
    
    // Get total study time for the day
    const totalStudyTime = await db.getTotalStudyTime(req.user.id, date);
    
    res.json({ success: true, totalStudyTime });
  } catch (error) {
    console.error('Add study session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add workout session
app.post('/api/workout', authenticateToken, async (req, res) => {
  try {
    const { duration, type, date = getTodayDate() } = req.body;
    
    await db.addWorkoutSession(req.user.id, date, duration, type);
    await db.updateStreak(req.user.id, date);
    
    // Get total workout time for the day
    const totalWorkoutTime = await db.getTotalWorkoutTime(req.user.id, date);
    
    res.json({ success: true, totalWorkoutTime });
  } catch (error) {
    console.error('Add workout session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  db.closeDatabase();
  process.exit(0);
});

module.exports = app;
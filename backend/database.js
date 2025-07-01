const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure the data directory exists
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Create or open the SQLite database
const dbPath = path.join(dataDir, 'riseup.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Create Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      email TEXT UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Habits table
  db.run(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      goal INTEGER NOT NULL,
      unit TEXT,
      emoji TEXT,
      color TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Create HabitEntries table for daily tracking
  db.run(`
    CREATE TABLE IF NOT EXISTS habit_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      value INTEGER NOT NULL,
      completed BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE CASCADE,
      UNIQUE(habit_id, date)
    )
  `);

  // Create Prayer tracking table
  db.run(`
    CREATE TABLE IF NOT EXISTS prayers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      fajr BOOLEAN DEFAULT 0,
      dhuhr BOOLEAN DEFAULT 0,
      asr BOOLEAN DEFAULT 0,
      maghrib BOOLEAN DEFAULT 0,
      isha BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(user_id, date)
    )
  `);

  // Create Water tracking table
  db.run(`
    CREATE TABLE IF NOT EXISTS water_intake (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      glasses INTEGER DEFAULT 0,
      goal INTEGER DEFAULT 8,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(user_id, date)
    )
  `);

  // Create Meal tracking table
  db.run(`
    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      breakfast BOOLEAN DEFAULT 0,
      lunch BOOLEAN DEFAULT 0,
      snack BOOLEAN DEFAULT 0,
      dinner BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(user_id, date)
    )
  `);

  // Create Weight tracking table
  db.run(`
    CREATE TABLE IF NOT EXISTS weight_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      weight REAL NOT NULL,
      goal_weight REAL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Create Study sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL, /* in minutes */
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Create Workout sessions table
  db.run(`
    CREATE TABLE IF NOT EXISTS workout_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      duration INTEGER NOT NULL, /* in minutes */
      type TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Create Streaks table to track user streaks
  db.run(`
    CREATE TABLE IF NOT EXISTS streaks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      current_streak INTEGER DEFAULT 0,
      longest_streak INTEGER DEFAULT 0,
      last_active_date TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(user_id)
    )
  `);

  // Insert default habits for new users
  db.run(`
    CREATE TRIGGER IF NOT EXISTS create_default_habits AFTER INSERT ON users
    BEGIN
      INSERT INTO habits (user_id, name, goal, unit, emoji, color) VALUES 
        (NEW.id, 'Study', 120, 'min', '📖', 'from-blue-500 to-indigo-600'),
        (NEW.id, 'Workout', 30, 'min', '💪', 'from-green-500 to-emerald-600'),
        (NEW.id, 'Prayers', 5, '', '🕋', 'from-purple-500 to-violet-600'),
        (NEW.id, 'Water', 8, 'glasses', '💧', 'from-cyan-500 to-blue-500'),
        (NEW.id, 'Meals', 4, '', '🍽️', 'from-orange-500 to-red-500');
    END;
  `);

  console.log('Database tables initialized successfully.');
}

// Helper functions for database operations

// Get a user by username
function getUser(username) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Create a new user
function createUser(username, password, name, email) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)',
      [username, password, name, email],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Get habits for a user
function getUserHabits(userId) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM habits WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Get habit entries for a specific date
function getHabitEntriesForDate(userId, date) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT h.name, h.goal, h.unit, h.emoji, h.color, COALESCE(he.value, 0) as current
      FROM habits h
      LEFT JOIN habit_entries he ON h.id = he.habit_id AND he.date = ?
      WHERE h.user_id = ?
    `;
    
    db.all(query, [date, userId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Update habit entry for a specific date
function updateHabitEntry(habitId, date, value) {
  return new Promise((resolve, reject) => {
    const completed = value >= getHabitGoal(habitId) ? 1 : 0;
    
    db.run(
      `INSERT INTO habit_entries (habit_id, date, value, completed, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(habit_id, date) 
       DO UPDATE SET value = ?, completed = ?, updated_at = CURRENT_TIMESTAMP`,
      [habitId, date, value, completed, value, completed],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Helper function to get a habit's goal
function getHabitGoal(habitId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT goal FROM habits WHERE id = ?', [habitId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row ? row.goal : 0);
      }
    });
  });
}

// Update prayer status for a specific date
function updatePrayer(userId, date, prayer, completed) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO prayers (user_id, date, ${prayer}, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, date) 
       DO UPDATE SET ${prayer} = ?, updated_at = CURRENT_TIMESTAMP`,
      [userId, date, completed ? 1 : 0, completed ? 1 : 0],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Update water intake for a specific date
function updateWaterIntake(userId, date, glasses) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO water_intake (user_id, date, glasses, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, date) 
       DO UPDATE SET glasses = ?, updated_at = CURRENT_TIMESTAMP`,
      [userId, date, glasses, glasses],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Update meal status for a specific date
function updateMeal(userId, date, meal, completed) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO meals (user_id, date, ${meal}, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, date) 
       DO UPDATE SET ${meal} = ?, updated_at = CURRENT_TIMESTAMP`,
      [userId, date, completed ? 1 : 0, completed ? 1 : 0],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Add weight entry
function addWeightEntry(userId, date, weight, goalWeight = null) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO weight_entries (user_id, date, weight, goal_weight) VALUES (?, ?, ?, ?)',
      [userId, date, weight, goalWeight],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Get weight history for a user
function getWeightHistory(userId, limit = 10) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT date, weight FROM weight_entries WHERE user_id = ? ORDER BY date DESC LIMIT ?',
      [userId, limit],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

// Add study session
function addStudySession(userId, date, duration) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO study_sessions (user_id, date, duration) VALUES (?, ?, ?)',
      [userId, date, duration],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Get total study time for a specific date
function getTotalStudyTime(userId, date) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT SUM(duration) as total FROM study_sessions WHERE user_id = ? AND date = ?',
      [userId, date],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row.total || 0 : 0);
        }
      }
    );
  });
}

// Add workout session
function addWorkoutSession(userId, date, duration, type = null) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO workout_sessions (user_id, date, duration, type) VALUES (?, ?, ?, ?)',
      [userId, date, duration, type],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// Get total workout time for a specific date
function getTotalWorkoutTime(userId, date) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT SUM(duration) as total FROM workout_sessions WHERE user_id = ? AND date = ?',
      [userId, date],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row.total || 0 : 0);
        }
      }
    );
  });
}

// Update user streak
function updateStreak(userId, date) {
  return new Promise((resolve, reject) => {
    // Get the current streak info
    db.get('SELECT * FROM streaks WHERE user_id = ?', [userId], (err, streak) => {
      if (err) {
        reject(err);
        return;
      }
      
      const today = new Date(date);
      let currentStreak = 0;
      let longestStreak = streak ? streak.longest_streak : 0;
      
      if (streak) {
        const lastActive = new Date(streak.last_active_date);
        const diffTime = Math.abs(today - lastActive);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
          // Continuing the streak
          currentStreak = streak.current_streak + 1;
        } else {
          // Streak broken
          currentStreak = 1;
        }
        
        // Update longest streak if needed
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
        
        // Update the streak record
        db.run(
          `UPDATE streaks 
           SET current_streak = ?, longest_streak = ?, last_active_date = ?, updated_at = CURRENT_TIMESTAMP
           WHERE user_id = ?`,
          [currentStreak, longestStreak, date, userId],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ currentStreak, longestStreak });
            }
          }
        );
      } else {
        // Create new streak record
        currentStreak = 1;
        db.run(
          `INSERT INTO streaks (user_id, current_streak, longest_streak, last_active_date)
           VALUES (?, ?, ?, ?)`,
          [userId, currentStreak, currentStreak, date],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ currentStreak, longestStreak: currentStreak });
            }
          }
        );
      }
    });
  });
}

// Get user streak
function getUserStreak(userId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT current_streak, longest_streak FROM streaks WHERE user_id = ?', [userId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          currentStreak: row ? row.current_streak : 0,
          longestStreak: row ? row.longest_streak : 0
        });
      }
    });
  });
}

// Close the database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

// Export database functions
module.exports = {
  db,
  getUser,
  createUser,
  getUserHabits,
  getHabitEntriesForDate,
  updateHabitEntry,
  updatePrayer,
  updateWaterIntake,
  updateMeal,
  addWeightEntry,
  getWeightHistory,
  addStudySession,
  getTotalStudyTime,
  addWorkoutSession,
  getTotalWorkoutTime,
  updateStreak,
  getUserStreak,
  closeDatabase
};
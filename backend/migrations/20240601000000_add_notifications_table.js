/**
 * Migration: add_notifications_table
 * Created at: 2024-06-01T00:00:00.000Z
 */

exports.up = function(db, callback) {
  db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT NOT NULL,
      read BOOLEAN DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `, callback);
};

exports.down = function(db, callback) {
  db.run(`
    DROP TABLE IF EXISTS notifications
  `, callback);
};
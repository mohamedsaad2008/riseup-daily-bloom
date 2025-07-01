const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Database path
const dataDir = path.join(__dirname, '..', '..', 'data');
const dbPath = path.join(dataDir, 'riseup.db');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Get all migration files
const getMigrationFiles = () => {
  const files = fs.readdirSync(__dirname)
    .filter(file => file.match(/^\d+_.*\.js$/))
    .sort();
  
  return files;
};

// Run migrations
const runMigrations = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    // Create migrations table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        db.close();
        reject(err);
        return;
      }
      
      // Get applied migrations
      db.all('SELECT name FROM migrations', [], async (err, appliedMigrations) => {
        if (err) {
          db.close();
          reject(err);
          return;
        }
        
        const appliedMigrationNames = appliedMigrations.map(m => m.name);
        const migrationFiles = getMigrationFiles();
        
        // Filter out already applied migrations
        const pendingMigrations = migrationFiles.filter(file => !appliedMigrationNames.includes(file));
        
        if (pendingMigrations.length === 0) {
          console.log('No pending migrations.');
          db.close();
          resolve();
          return;
        }
        
        console.log(`Found ${pendingMigrations.length} pending migrations.`);
        
        // Run migrations in sequence
        for (const file of pendingMigrations) {
          try {
            console.log(`Applying migration: ${file}`);
            
            // Import migration file
            const migration = require(path.join(__dirname, file));
            
            // Run the migration
            await new Promise((resolveMigration, rejectMigration) => {
              db.serialize(() => {
                db.run('BEGIN TRANSACTION');
                
                // Execute up function
                migration.up(db, (err) => {
                  if (err) {
                    db.run('ROLLBACK');
                    rejectMigration(err);
                    return;
                  }
                  
                  // Record the migration
                  db.run('INSERT INTO migrations (name) VALUES (?)', [file], (err) => {
                    if (err) {
                      db.run('ROLLBACK');
                      rejectMigration(err);
                      return;
                    }
                    
                    db.run('COMMIT');
                    console.log(`Migration ${file} applied successfully.`);
                    resolveMigration();
                  });
                });
              });
            });
          } catch (err) {
            console.error(`Error applying migration ${file}:`, err);
            db.close();
            reject(err);
            return;
          }
        }
        
        console.log('All migrations applied successfully.');
        db.close();
        resolve();
      });
    });
  });
};

// Rollback last migration
const rollbackMigration = async () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath);
    
    // Get the last applied migration
    db.get('SELECT * FROM migrations ORDER BY id DESC LIMIT 1', [], async (err, lastMigration) => {
      if (err) {
        db.close();
        reject(err);
        return;
      }
      
      if (!lastMigration) {
        console.log('No migrations to rollback.');
        db.close();
        resolve();
        return;
      }
      
      try {
        console.log(`Rolling back migration: ${lastMigration.name}`);
        
        // Import migration file
        const migration = require(path.join(__dirname, lastMigration.name));
        
        // Run the rollback
        await new Promise((resolveRollback, rejectRollback) => {
          db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            
            // Execute down function
            migration.down(db, (err) => {
              if (err) {
                db.run('ROLLBACK');
                rejectRollback(err);
                return;
              }
              
              // Remove the migration record
              db.run('DELETE FROM migrations WHERE id = ?', [lastMigration.id], (err) => {
                if (err) {
                  db.run('ROLLBACK');
                  rejectRollback(err);
                  return;
                }
                
                db.run('COMMIT');
                console.log(`Migration ${lastMigration.name} rolled back successfully.`);
                resolveRollback();
              });
            });
          });
        });
        
        db.close();
        resolve();
      } catch (err) {
        console.error(`Error rolling back migration ${lastMigration.name}:`, err);
        db.close();
        reject(err);
      }
    });
  });
};

// Create a new migration file
const createMigration = (name) => {
  if (!name) {
    console.error('Migration name is required.');
    return;
  }
  
  const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '');
  const fileName = `${timestamp}_${name}.js`;
  const filePath = path.join(__dirname, fileName);
  
  const template = `
/**
 * Migration: ${name}
 * Created at: ${new Date().toISOString()}
 */

exports.up = function(db, callback) {
  // Add your migration code here
  db.run(\`
    -- Your SQL statements here
  \`, callback);
};

exports.down = function(db, callback) {
  // Add your rollback code here
  db.run(\`
    -- Your rollback SQL statements here
  \`, callback);
};
`;
  
  fs.writeFileSync(filePath, template);
  console.log(`Migration file created: ${fileName}`);
};

// Command line interface
if (require.main === module) {
  const command = process.argv[2];
  const arg = process.argv[3];
  
  switch (command) {
    case 'run':
      runMigrations()
        .then(() => process.exit(0))
        .catch(err => {
          console.error('Migration failed:', err);
          process.exit(1);
        });
      break;
      
    case 'rollback':
      rollbackMigration()
        .then(() => process.exit(0))
        .catch(err => {
          console.error('Rollback failed:', err);
          process.exit(1);
        });
      break;
      
    case 'create':
      if (!arg) {
        console.error('Please specify a migration name.');
        process.exit(1);
      }
      createMigration(arg);
      break;
      
    default:
      console.log('Available commands:');
      console.log('  run                  - Run pending migrations');
      console.log('  rollback             - Rollback the last migration');
      console.log('  create <name>        - Create a new migration file');
      break;
  }
}

module.exports = {
  runMigrations,
  rollbackMigration,
  createMigration
};
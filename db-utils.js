const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'riseup.db');

// Ensure the data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Database utility functions
const dbUtils = {
  // Reset the database (delete and recreate)
  resetDatabase: () => {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('Database file deleted.');
      }
      
      // The database will be recreated when the application starts
      resolve();
    });
  },
  
  // Backup the database
  backupDatabase: (backupName = null) => {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(dbPath)) {
        reject(new Error('Database file does not exist.'));
        return;
      }
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFileName = backupName ? `${backupName}.db` : `riseup-backup-${timestamp}.db`;
      const backupPath = path.join(dataDir, backupFileName);
      
      const readStream = fs.createReadStream(dbPath);
      const writeStream = fs.createWriteStream(backupPath);
      
      readStream.on('error', reject);
      writeStream.on('error', reject);
      writeStream.on('finish', () => {
        console.log(`Database backed up to ${backupPath}`);
        resolve(backupPath);
      });
      
      readStream.pipe(writeStream);
    });
  },
  
  // Restore database from backup
  restoreDatabase: (backupPath) => {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(backupPath)) {
        reject(new Error('Backup file does not exist.'));
        return;
      }
      
      // Close any open database connections
      const db = new sqlite3.Database(dbPath);
      db.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        
        // Delete current database if it exists
        if (fs.existsSync(dbPath)) {
          fs.unlinkSync(dbPath);
        }
        
        // Copy backup to database location
        const readStream = fs.createReadStream(backupPath);
        const writeStream = fs.createWriteStream(dbPath);
        
        readStream.on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('finish', () => {
          console.log(`Database restored from ${backupPath}`);
          resolve();
        });
        
        readStream.pipe(writeStream);
      });
    });
  },
  
  // List all backups
  listBackups: () => {
    return new Promise((resolve, reject) => {
      fs.readdir(dataDir, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        
        const backups = files.filter(file => 
          file.endsWith('.db') && file !== 'riseup.db'
        );
        
        resolve(backups);
      });
    });
  },
  
  // Get database statistics
  getDatabaseStats: () => {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(dbPath)) {
        reject(new Error('Database file does not exist.'));
        return;
      }
      
      const db = new sqlite3.Database(dbPath);
      
      const stats = {
        fileSize: fs.statSync(dbPath).size,
        tables: [],
        counts: {}
      };
      
      // Get list of tables
      db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
        if (err) {
          db.close();
          reject(err);
          return;
        }
        
        stats.tables = tables.map(t => t.name);
        
        // Get row counts for each table
        const promises = stats.tables.map(table => {
          return new Promise((resolveCount, rejectCount) => {
            db.get(`SELECT COUNT(*) as count FROM ${table}`, [], (err, row) => {
              if (err) {
                rejectCount(err);
                return;
              }
              stats.counts[table] = row.count;
              resolveCount();
            });
          });
        });
        
        Promise.all(promises)
          .then(() => {
            db.close();
            resolve(stats);
          })
          .catch(err => {
            db.close();
            reject(err);
          });
      });
    });
  }
};

// Command line interface
if (require.main === module) {
  const command = process.argv[2];
  const arg = process.argv[3];
  
  switch (command) {
    case 'reset':
      dbUtils.resetDatabase()
        .then(() => console.log('Database reset successfully.'))
        .catch(err => console.error('Error resetting database:', err));
      break;
      
    case 'backup':
      dbUtils.backupDatabase(arg)
        .then(path => console.log(`Database backed up to ${path}`))
        .catch(err => console.error('Error backing up database:', err));
      break;
      
    case 'restore':
      if (!arg) {
        console.error('Please specify a backup file to restore from.');
        process.exit(1);
      }
      const backupPath = path.join(dataDir, arg);
      dbUtils.restoreDatabase(backupPath)
        .then(() => console.log('Database restored successfully.'))
        .catch(err => console.error('Error restoring database:', err));
      break;
      
    case 'list-backups':
      dbUtils.listBackups()
        .then(backups => {
          console.log('Available backups:');
          backups.forEach(backup => console.log(`- ${backup}`));
        })
        .catch(err => console.error('Error listing backups:', err));
      break;
      
    case 'stats':
      dbUtils.getDatabaseStats()
        .then(stats => {
          console.log('Database Statistics:');
          console.log(`- File Size: ${(stats.fileSize / 1024).toFixed(2)} KB`);
          console.log(`- Tables: ${stats.tables.length}`);
          console.log('- Row Counts:');
          Object.entries(stats.counts).forEach(([table, count]) => {
            console.log(`  - ${table}: ${count} rows`);
          });
        })
        .catch(err => console.error('Error getting database stats:', err));
      break;
      
    default:
      console.log('Available commands:');
      console.log('  reset                - Reset the database');
      console.log('  backup [name]        - Backup the database (optional name)');
      console.log('  restore <filename>   - Restore database from backup');
      console.log('  list-backups         - List available backups');
      console.log('  stats                - Show database statistics');
      break;
  }
}

module.exports = dbUtils;
const bcrypt = require('bcrypt');
const db = require('./database');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await db.createUser('testuser', hashedPassword, 'Test User', 'test@example.com');
    const userId = user.id;
    
    console.log(`Created test user with ID: ${userId}`);

    // Get the habits that were automatically created for the user
    const habits = await db.getUserHabits(userId);
    console.log('Created default habits:');
    console.log(habits);

    // Add some habit entries for the past week
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Random progress for each habit
      for (const habit of habits) {
        const value = Math.floor(Math.random() * (habit.goal + 1));
        await db.updateHabitEntry(habit.id, dateStr, value);
      }
      
      // Random prayer completions
      const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
      for (const prayer of prayers) {
        const completed = Math.random() > 0.3; // 70% chance of completion
        await db.updatePrayer(userId, dateStr, prayer, completed);
      }
      
      // Random water intake (0-8 glasses)
      const glasses = Math.floor(Math.random() * 9);
      await db.updateWaterIntake(userId, dateStr, glasses);
      
      // Random meal completions
      const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
      for (const meal of meals) {
        const completed = Math.random() > 0.2; // 80% chance of completion
        await db.updateMeal(userId, dateStr, meal, completed);
      }
      
      // Add weight entry (starting at 40kg with small variations)
      const weight = 40 + (Math.random() * 2);
      await db.addWeightEntry(userId, dateStr, weight.toFixed(1), 55);
      
      // Add study sessions
      if (Math.random() > 0.3) { // 70% chance of studying
        const duration = Math.floor(Math.random() * 120) + 25; // 25-145 minutes
        await db.addStudySession(userId, dateStr, duration);
      }
      
      // Add workout sessions
      if (Math.random() > 0.5) { // 50% chance of working out
        const duration = Math.floor(Math.random() * 30) + 10; // 10-40 minutes
        const types = ['cardio', 'strength', 'flexibility', 'sports'];
        const type = types[Math.floor(Math.random() * types.length)];
        await db.addWorkoutSession(userId, dateStr, duration, type);
      }
      
      // Update streak
      await db.updateStreak(userId, dateStr);
    }
    
    console.log('Database seeded successfully!');
    console.log('\nTest User Credentials:');
    console.log('Username: testuser');
    console.log('Password: password123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.closeDatabase();
  }
}

// Run the seeding function
seedDatabase();
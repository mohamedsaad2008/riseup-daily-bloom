# RiseUp Daily Bloom

A daily habit tracking application for personal growth and productivity.

## Features

- Track daily habits like study time, workouts, prayers, water intake, and meals
- Monitor weight progress
- Maintain streaks for consistent habit building
- Pomodoro study timer
- User authentication

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Shadcn UI
- Backend: Node.js, Express
- Database: SQLite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or bun

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/riseup-daily-bloom.git
   cd riseup-daily-bloom
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Create environment files
   - Create `.env.local` in the root directory with:
     ```
     VITE_API_URL=http://localhost:3001/api
     ```
   - Create `.env` in the root directory with:
     ```
     PORT=3001
     JWT_SECRET=your-secret-key
     NODE_ENV=development
     ```

### Running the Application

1. Start the backend server
   ```bash
   npm run server
   # or
   bun run server
   ```

2. In a separate terminal, start the frontend development server
   ```bash
   npm run dev
   # or
   bun run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Database Structure

The application uses SQLite for data storage with the following tables:

- `users`: User account information
- `habits`: Habit definitions (study, workout, prayers, water, meals)
- `habit_entries`: Daily tracking of habit progress
- `prayers`: Daily prayer tracking
- `water_intake`: Daily water intake tracking
- `meals`: Daily meal tracking
- `weight_entries`: Weight tracking over time
- `study_sessions`: Study session records
- `workout_sessions`: Workout session records
- `streaks`: User streak tracking

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user
- `POST /api/login`: Login a user

### Dashboard
- `GET /api/dashboard`: Get dashboard data for the current user

### Habits
- `POST /api/habits/:habitId`: Update a habit entry

### Prayers
- `POST /api/prayers`: Update prayer status

### Water
- `POST /api/water`: Update water intake

### Meals
- `POST /api/meals`: Update meal status

### Weight
- `POST /api/weight`: Add weight entry

### Study
- `POST /api/study`: Add study session

### Workout
- `POST /api/workout`: Add workout session

## License

MIT
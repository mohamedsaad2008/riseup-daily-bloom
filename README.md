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

3. Initialize the database and seed with sample data
   ```bash
   npm run seed
   # or
   bun run seed
   ```

### Running the Application

1. Start both the frontend and backend servers with a single command:
   ```bash
   npm run start
   # or
   bun run start
   ```

2. Open your browser and navigate to `http://localhost:8080`

3. Login with the test account:
   - Username: testuser
   - Password: password123

### Running Separately

If you prefer to run the frontend and backend separately:

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

## Database Management

The application uses SQLite for data storage. Here are some useful commands:

- Reset the database: `npm run db:reset`
- Backup the database: `npm run db:backup`
- Restore from backup: `npm run db:restore <filename>`
- List backups: `npm run db:list`
- Show database statistics: `npm run db:stats`
- Run migrations: `npm run migrate`
- Rollback migrations: `npm run migrate:rollback`
- Create a new migration: `npm run migrate:create <name>`

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
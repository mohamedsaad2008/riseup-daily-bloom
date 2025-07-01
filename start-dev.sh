#!/bin/bash

# Start the backend server
echo "Starting backend server..."
npm run server &
BACKEND_PID=$!

# Start the frontend development server
echo "Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
function cleanup {
  echo "Stopping servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit 0
}

# Register the cleanup function for when the script is terminated
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "Both servers are running. Press Ctrl+C to stop."
wait
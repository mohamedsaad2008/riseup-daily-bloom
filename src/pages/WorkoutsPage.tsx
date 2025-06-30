
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Zap } from 'lucide-react';

const WorkoutsPage = () => {
  const workouts = [
    {
      id: 1,
      name: 'Morning Cardio',
      duration: 30,
      difficulty: 'Medium',
      description: 'Start your day with energy',
      exercises: ['Jumping Jacks', 'High Knees', 'Burpees', 'Mountain Climbers']
    },
    {
      id: 2,
      name: 'Upper Body Strength',
      duration: 45,
      difficulty: 'Hard',
      description: 'Build upper body muscle',
      exercises: ['Push-ups', 'Pull-ups', 'Planks', 'Dips']
    },
    {
      id: 3,
      name: 'Yoga & Stretching',
      duration: 20,
      difficulty: 'Easy',
      description: 'Relax and improve flexibility',
      exercises: ['Sun Salutation', 'Warrior Pose', 'Child Pose', 'Downward Dog']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
        <p className="text-gray-600">Choose your workout routine</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{workout.name}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
              </div>
              <p className="text-gray-600">{workout.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {workout.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {workout.exercises.length} exercises
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Exercises:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {workout.exercises.map((exercise, index) => (
                    <li key={index}>• {exercise}</li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                <Play className="w-4 h-4 mr-2" />
                Start Workout
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;

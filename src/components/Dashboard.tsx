
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HabitRing from './HabitRing';
import WeightTracker from './WeightTracker';
import PrayerTracker from './PrayerTracker';
import WaterTracker from './WaterTracker';
import MealTracker from './MealTracker';
import StudyTimer from './StudyTimer';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [habits, setHabits] = useState({
    study: { current: 0, goal: 120 }, // minutes
    workout: { current: 0, goal: 30 }, // minutes
    prayers: { current: 0, goal: 5 },
    water: { current: 0, goal: 8 }, // glasses
    meals: { current: 0, goal: 4 }
  });

  const [motivationalQuote] = useState("الانضباط هو حب الذات في العمل - Discipline is self-love in action");
  const { toast } = useToast();

  const updateHabit = (habitName: string, value: number) => {
    setHabits(prev => ({
      ...prev,
      [habitName]: { ...prev[habitName], current: value }
    }));

    // Show encouraging toast when goal is reached
    if (value >= habits[habitName].goal) {
      toast({
        title: "🎉 Goal Achieved!",
        description: `Great job completing your ${habitName} goal today!`,
        duration: 3000,
      });
    }
  };

  const getStreakDays = () => {
    // Placeholder for streak calculation
    return Math.floor(Math.random() * 15) + 1;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
          RiseUp
        </h1>
        <p className="text-lg text-gray-600 mb-4">{motivationalQuote}</p>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
          <span>🌅 Day {getStreakDays()} of your journey</span>
          <span>📚 Baccalaureate 2026</span>
        </div>
      </div>

      {/* Progress Rings */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <HabitRing
          title="Study"
          emoji="📖"
          current={habits.study.current}
          goal={habits.study.goal}
          unit="min"
          color="from-blue-500 to-indigo-600"
        />
        <HabitRing
          title="Workout"
          emoji="💪"
          current={habits.workout.current}
          goal={habits.workout.goal}
          unit="min"
          color="from-green-500 to-emerald-600"
        />
        <HabitRing
          title="Prayers"
          emoji="🕋"
          current={habits.prayers.current}
          goal={habits.prayers.goal}
          unit=""
          color="from-purple-500 to-violet-600"
        />
        <HabitRing
          title="Water"
          emoji="💧"
          current={habits.water.current}
          goal={habits.water.goal}
          unit="glasses"
          color="from-cyan-500 to-blue-500"
        />
        <HabitRing
          title="Meals"
          emoji="🍽️"
          current={habits.meals.current}
          goal={habits.meals.goal}
          unit=""
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study & Workout */}
        <div className="space-y-6">
          <StudyTimer onTimeUpdate={(minutes) => updateHabit('study', minutes)} />
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💪 Workout Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Today's Workout</span>
                  <span className="text-sm text-gray-500">{habits.workout.current}/{habits.workout.goal} min</span>
                </div>
                <button
                  onClick={() => updateHabit('workout', habits.workout.current + 10)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Add 10 Minutes
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prayer & Weight */}
        <div className="space-y-6">
          <PrayerTracker onPrayerComplete={(count) => updateHabit('prayers', count)} />
          <WeightTracker />
        </div>

        {/* Water & Meals */}
        <div className="space-y-6">
          <WaterTracker 
            current={habits.water.current}
            onWaterAdd={(count) => updateHabit('water', count)}
          />
          <MealTracker 
            current={habits.meals.current}
            onMealAdd={(count) => updateHabit('meals', count)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

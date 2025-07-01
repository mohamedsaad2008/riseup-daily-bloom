import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HabitRing from './HabitRing';
import WeightTracker from './WeightTracker';
import PrayerTracker from './PrayerTracker';
import WaterTracker from './WaterTracker';
import MealTracker from './MealTracker';
import StudyTimer from './StudyTimer';
import { useToast } from '@/hooks/use-toast';
import { dashboardService, habitService, prayerService, waterService, mealService, studyService, workoutService } from '@/services/api';

const Dashboard = () => {
  const [habits, setHabits] = useState({
    study: { current: 0, goal: 120, id: 1 }, // minutes
    workout: { current: 0, goal: 30, id: 2 }, // minutes
    prayers: { current: 0, goal: 5, id: 3 },
    water: { current: 0, goal: 8, id: 4 }, // glasses
    meals: { current: 0, goal: 4, id: 5 }
  });
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  const [motivationalQuote] = useState("الانضباط هو حب الذات في العمل - Discipline is self-love in action");
  const { toast } = useToast();

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getDashboardData();
        
        // Map the habits data to our state format
        const habitMap = {
          'Study': 'study',
          'Workout': 'workout',
          'Prayers': 'prayers',
          'Water': 'water',
          'Meals': 'meals'
        };
        
        const newHabits = { ...habits };
        
        data.habits.forEach(habit => {
          const key = habitMap[habit.name];
          if (key) {
            newHabits[key] = {
              ...newHabits[key],
              current: habit.current,
              goal: habit.goal
            };
          }
        });
        
        setHabits(newHabits);
        setStreak(data.streak);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const updateHabit = async (habitName: string, value: number) => {
    try {
      const habitId = habits[habitName].id;
      
      // Update local state first for immediate feedback
      setHabits(prev => ({
        ...prev,
        [habitName]: { ...prev[habitName], current: value }
      }));
      
      // Update on the server
      await habitService.updateHabit(habitId, value);
      
      // Show encouraging toast when goal is reached
      if (value >= habits[habitName].goal) {
        toast({
          title: "🎉 Goal Achieved!",
          description: `Great job completing your ${habitName} goal today!`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(`Error updating ${habitName}:`, error);
      toast({
        title: "Error",
        description: `Failed to update ${habitName}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const updatePrayers = async (count: number) => {
    try {
      // Update local state
      setHabits(prev => ({
        ...prev,
        prayers: { ...prev.prayers, current: count }
      }));
      
      // We don't need to do anything else here as the PrayerTracker component
      // will handle the API calls for individual prayers
    } catch (error) {
      console.error('Error updating prayers:', error);
    }
  };

  const updateWater = async (count: number) => {
    try {
      // Update local state
      setHabits(prev => ({
        ...prev,
        water: { ...prev.water, current: count }
      }));
      
      // Update on the server
      await waterService.updateWaterIntake(count);
      
      if (count >= habits.water.goal) {
        toast({
          title: "💧 Hydration Goal Achieved!",
          description: "Great job staying hydrated today!",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating water intake:', error);
      toast({
        title: "Error",
        description: "Failed to update water intake. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateMeals = async (count: number) => {
    try {
      // Update local state
      setHabits(prev => ({
        ...prev,
        meals: { ...prev.meals, current: count }
      }));
      
      // We don't need to do anything else here as the MealTracker component
      // will handle the API calls for individual meals
    } catch (error) {
      console.error('Error updating meals:', error);
    }
  };

  const updateStudyTime = async (minutes: number) => {
    try {
      // Update local state
      setHabits(prev => ({
        ...prev,
        study: { ...prev.study, current: minutes }
      }));
      
      // Update on the server
      await studyService.addStudySession(minutes - habits.study.current);
      
      if (minutes >= habits.study.goal) {
        toast({
          title: "📚 Study Goal Achieved!",
          description: "Great job with your studies today!",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating study time:', error);
      toast({
        title: "Error",
        description: "Failed to update study time. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateWorkoutTime = async (minutes: number) => {
    try {
      // Update local state
      setHabits(prev => ({
        ...prev,
        workout: { ...prev.workout, current: minutes }
      }));
      
      // Update on the server
      await workoutService.addWorkoutSession(10); // Adding 10 minutes
      
      if (minutes >= habits.workout.goal) {
        toast({
          title: "💪 Workout Goal Achieved!",
          description: "Great job with your workout today!",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating workout time:', error);
      toast({
        title: "Error",
        description: "Failed to update workout time. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="text-center">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
          RiseUp
        </h1>
        <p className="text-lg text-gray-600 mb-4">{motivationalQuote}</p>
        <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
          <span>🌅 Day {streak.currentStreak} of your journey</span>
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
          <StudyTimer onTimeUpdate={(minutes) => updateStudyTime(minutes)} />
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
                  onClick={() => updateWorkoutTime(habits.workout.current + 10)}
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
          <PrayerTracker onPrayerComplete={(count) => updatePrayers(count)} />
          <WeightTracker />
        </div>

        {/* Water & Meals */}
        <div className="space-y-6">
          <WaterTracker 
            current={habits.water.current}
            onWaterAdd={(count) => updateWater(count)}
          />
          <MealTracker 
            current={habits.meals.current}
            onMealAdd={(count) => updateMeals(count)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
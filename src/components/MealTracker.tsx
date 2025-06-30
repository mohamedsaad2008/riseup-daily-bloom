
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MealTrackerProps {
  current: number;
  onMealAdd: (count: number) => void;
}

const MealTracker: React.FC<MealTrackerProps> = ({ current, onMealAdd }) => {
  const goal = 4;
  const meals = ['🥐 Breakfast', '🍽️ Lunch', '🥪 Snack', '🍛 Dinner'];

  const addMeal = () => {
    if (current < goal) {
      onMealAdd(current + 1);
    }
  };

  const resetMeals = () => {
    onMealAdd(0);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🍽️ Meal Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Meal checklist */}
          <div className="space-y-2">
            {meals.map((meal, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  index < current
                    ? 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300'
                    : 'bg-gray-50'
                }`}
              >
                <span className="font-medium">{meal}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                  index < current ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-300'
                }`}>
                  {index < current ? '✓' : '○'}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {current}/{goal} meals
            </div>
            <div className="text-sm text-gray-600">
              {current >= goal ? 'Perfect! Your body is well nourished! 🎉' : 'Keep eating to reach your weight goal'}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button 
              onClick={addMeal}
              disabled={current >= goal}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
            >
              + Add Meal
            </Button>
            <Button 
              onClick={resetMeals}
              variant="outline"
              size="sm"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealTracker;

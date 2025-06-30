
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UtensilsCrossed, Plus, Edit3, Trash2, Target } from 'lucide-react';

const MealTrackerPage = () => {
  const [todayMeals, setTodayMeals] = useState([
    { id: 1, name: 'Breakfast', time: '8:00 AM', description: 'Oatmeal with fruits and nuts', calories: 350, completed: true },
    { id: 2, name: 'Lunch', time: '1:00 PM', description: 'Chicken tagine with rice', calories: 650, completed: true },
    { id: 3, name: 'Snack', time: '4:00 PM', description: 'Almonds and dates', calories: 200, completed: false },
    { id: 4, name: 'Dinner', time: '8:00 PM', description: 'Grilled fish with vegetables', calories: 500, completed: false }
  ]);

  const [dailyGoals] = useState({
    meals: 4,
    calories: 2200,
    protein: 80 // grams
  });

  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    time: '',
    description: '',
    calories: ''
  });

  const completedMeals = todayMeals.filter(meal => meal.completed).length;
  const totalCalories = todayMeals.filter(meal => meal.completed).reduce((sum, meal) => sum + meal.calories, 0);

  const toggleMealComplete = (id: number) => {
    setTodayMeals(prev => prev.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  const addMeal = () => {
    if (newMeal.name && newMeal.time) {
      const meal = {
        id: Date.now(),
        name: newMeal.name,
        time: newMeal.time,
        description: newMeal.description,
        calories: parseInt(newMeal.calories) || 0,
        completed: false
      };
      setTodayMeals(prev => [...prev, meal]);
      setNewMeal({ name: '', time: '', description: '', calories: '' });
      setShowAddMeal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meal Tracker</h1>
          <p className="text-gray-600">Track your meals and nutrition for healthy weight gain</p>
        </div>
        <Button 
          onClick={() => setShowAddMeal(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{completedMeals}/{dailyGoals.meals}</div>
                <div className="text-sm text-gray-600">Meals Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalCalories}</div>
                <div className="text-sm text-gray-600">Calories Consumed</div>
                <div className="text-xs text-gray-500">Goal: {dailyGoals.calories}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.round((totalCalories / dailyGoals.calories) * 100)}%</div>
                <div className="text-sm text-gray-600">Daily Goal</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meal List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5" />
              Today's Meals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMeals.map((meal) => (
              <div
                key={meal.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  meal.completed 
                    ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{meal.name}</h3>
                      <span className="text-sm text-gray-500">{meal.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{meal.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{meal.calories} calories</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => toggleMealComplete(meal.id)}
                      size="sm"
                      variant={meal.completed ? "default" : "outline"}
                      className={meal.completed ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
                    >
                      {meal.completed ? '✓' : '○'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Meal Form */}
            {showAddMeal && (
              <Card className="border-2 border-dashed border-orange-300">
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="meal-name">Meal Name</Label>
                      <Input
                        id="meal-name"
                        value={newMeal.name}
                        onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Breakfast"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meal-time">Time</Label>
                      <Input
                        id="meal-time"
                        type="time"
                        value={newMeal.time}
                        onChange={(e) => setNewMeal(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="meal-description">Description</Label>
                    <Textarea
                      id="meal-description"
                      value={newMeal.description}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="What did you eat?"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="meal-calories">Calories (optional)</Label>
                    <Input
                      id="meal-calories"
                      type="number"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addMeal} className="bg-orange-500 hover:bg-orange-600">
                      Add Meal
                    </Button>
                    <Button onClick={() => setShowAddMeal(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealTrackerPage;

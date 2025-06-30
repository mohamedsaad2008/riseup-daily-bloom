
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplets, Plus, RotateCcw, Target } from 'lucide-react';

const WaterTrackerPage = () => {
  const [todayWater, setTodayWater] = useState(5);
  const [dailyGoal, setDailyGoal] = useState(8);
  const [weeklyData] = useState([
    { day: 'Mon', glasses: 7 },
    { day: 'Tue', glasses: 8 },
    { day: 'Wed', glasses: 6 },
    { day: 'Thu', glasses: 9 },
    { day: 'Fri', glasses: 7 },
    { day: 'Sat', glasses: 8 },
    { day: 'Sun', glasses: 5 }
  ]);

  const addWater = () => {
    if (todayWater < dailyGoal + 5) { // Allow some buffer
      setTodayWater(prev => prev + 1);
    }
  };

  const removeWater = () => {
    if (todayWater > 0) {
      setTodayWater(prev => prev - 1);
    }
  };

  const resetWater = () => {
    setTodayWater(0);
  };

  const progressPercentage = Math.min((todayWater / dailyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Water Tracker</h1>
          <p className="text-gray-600">Stay hydrated and track your daily water intake</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Water Tracker */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              Today's Water Intake
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Water Glasses Visualization */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {[...Array(dailyGoal)].map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer ${
                    index < todayWater
                      ? 'bg-gradient-to-b from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    if (index < todayWater) {
                      setTodayWater(index);
                    } else if (index === todayWater) {
                      addWater();
                    }
                  }}
                >
                  💧
                </div>
              ))}
            </div>

            {/* Progress Info */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-cyan-600">
                {todayWater}/{dailyGoal}
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-gray-600">
                {todayWater >= dailyGoal 
                  ? '🎉 Great job! You\'ve reached your water goal!' 
                  : `${dailyGoal - todayWater} more glasses to reach your goal`
                }
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-center">
              <Button onClick={addWater} className="bg-cyan-500 hover:bg-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Glass
              </Button>
              <Button onClick={removeWater} variant="outline">
                Remove
              </Button>
              <Button onClick={resetWater} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Weekly Progress */}
        <div className="space-y-6">
          {/* Daily Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Today's Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-gray-600">Goal Completed</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Glasses consumed</span>
                  <span className="font-medium">{todayWater}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span className="font-medium">{Math.max(0, dailyGoal - todayWater)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Volume (approx)</span>
                  <span className="font-medium">{todayWater * 250}ml</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{day.day}</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((day.glasses / dailyGoal) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">{day.glasses}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WaterTrackerPage;

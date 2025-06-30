
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Plus, Target, Trash2, Edit3 } from 'lucide-react';

const HabitsPage = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Study 25 hours per week', current: 18, target: 25, category: 'study' },
    { id: 2, title: 'Workout 5 times per week', current: 3, target: 5, category: 'fitness' },
    { id: 3, title: 'Gain 0.5kg this month', current: 0.3, target: 0.5, category: 'health' }
  ]);

  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Prayer', streak: 12, completed: true },
    { id: 2, name: 'Drink 8 glasses of water', streak: 8, completed: false },
    { id: 3, name: 'Read Quran 15 minutes', streak: 15, completed: true },
    { id: 4, name: 'Exercise for 30 minutes', streak: 5, completed: false }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Goals & Habits</h1>
          <p className="text-gray-600">Track your progress and build consistent habits</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Plus className="w-4 h-4 mr-2" />
          Add New Goal
        </Button>
      </div>

      <Tabs defaultValue="goals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="habits">Daily Habits</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{goal.title}</CardTitle>
                  <Target className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.current}/{goal.target}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit3 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {habits.map((habit) => (
              <Card key={habit.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      habit.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}>
                      {habit.completed ? '✓' : '○'}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Current Streak</span>
                      <span className="font-medium text-orange-600">{habit.streak} days</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant={habit.completed ? "outline" : "default"}
                      className="w-full"
                    >
                      {habit.completed ? 'Completed Today' : 'Mark Complete'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HabitsPage;

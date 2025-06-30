
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

const AdminPage = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Morning Cardio', duration: 30, difficulty: 'Medium' },
    { id: 2, name: 'Upper Body Strength', duration: 45, difficulty: 'Hard' },
    { id: 3, name: 'Yoga & Stretching', duration: 20, difficulty: 'Easy' }
  ]);

  const [routines, setRoutines] = useState([
    { id: 1, name: 'Morning Routine', time: '06:00', activities: ['Prayer', 'Water', 'Exercise'] },
    { id: 2, name: 'Study Block', time: '09:00', activities: ['Study', 'Break', 'Study'] },
    { id: 3, name: 'Evening Routine', time: '20:00', activities: ['Prayer', 'Meal', 'Rest'] }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Manage workouts, routines, and settings</p>
      </div>

      <Tabs defaultValue="workouts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="routines">Routines</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Workout Management</CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Workout
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{workout.name}</h4>
                      <p className="text-sm text-gray-600">
                        {workout.duration} minutes • {workout.difficulty}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routines" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Routine Management</CardTitle>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Routine
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routines.map((routine) => (
                  <div key={routine.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{routine.name}</h4>
                      <p className="text-sm text-gray-600">
                        {routine.time} • {routine.activities.join(', ')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Weight Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-weight">Current Weight (kg)</Label>
                    <Input id="current-weight" defaultValue="42" />
                  </div>
                  <div>
                    <Label htmlFor="target-weight">Target Weight (kg)</Label>
                    <Input id="target-weight" defaultValue="55" />
                  </div>
                </div>
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update Goal
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="daily-hours">Daily Study Hours</Label>
                  <Input id="daily-hours" defaultValue="4" />
                </div>
                <div>
                  <Label htmlFor="bac-date">Baccalaureate Date</Label>
                  <Input id="bac-date" type="date" defaultValue="2026-06-15" />
                </div>
                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Update Goal
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="user-name">Your Name</Label>
                <Input id="user-name" defaultValue="Student" />
              </div>
              <div>
                <Label htmlFor="location">Location (for prayer times)</Label>
                <Input id="location" defaultValue="Morocco" />
              </div>
              <div>
                <Label htmlFor="notifications">Notification Settings</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="prayer-notifications" defaultChecked />
                    <Label htmlFor="prayer-notifications">Prayer reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="water-notifications" defaultChecked />
                    <Label htmlFor="water-notifications">Water reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="study-notifications" defaultChecked />
                    <Label htmlFor="study-notifications">Study reminders</Label>
                  </div>
                </div>
              </div>
              <Button className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;

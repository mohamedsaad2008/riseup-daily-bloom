
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, BookOpen, Dumbbell, UtensilsCrossed } from 'lucide-react';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weeklySchedule] = useState({
    monday: [
      { id: 1, time: '06:00', activity: 'Fajr Prayer', type: 'spiritual', duration: 30 },
      { id: 2, time: '07:00', activity: 'Morning Workout', type: 'fitness', duration: 45 },
      { id: 3, time: '08:00', activity: 'Breakfast', type: 'meal', duration: 30 },
      { id: 4, time: '09:00', activity: 'Mathematics Study', type: 'study', duration: 120 },
      { id: 5, time: '13:00', activity: 'Dhuhr Prayer', type: 'spiritual', duration: 20 },
      { id: 6, time: '13:30', activity: 'Lunch', type: 'meal', duration: 45 },
      { id: 7, time: '15:00', activity: 'Physics Study', type: 'study', duration: 90 },
      { id: 8, time: '16:30', activity: 'Asr Prayer', type: 'spiritual', duration: 15 },
      { id: 9, time: '19:15', activity: 'Maghrib Prayer', type: 'spiritual', duration: 20 },
      { id: 10, time: '20:00', activity: 'Dinner', type: 'meal', duration: 45 },
      { id: 11, time: '21:00', activity: 'Isha Prayer', type: 'spiritual', duration: 20 },
      { id: 12, time: '21:30', activity: 'Review & Planning', type: 'study', duration: 60 }
    ],
    tuesday: [
      { id: 1, time: '06:00', activity: 'Fajr Prayer', type: 'spiritual', duration: 30 },
      { id: 2, time: '07:30', activity: 'Chemistry Study', type: 'study', duration: 120 },
      { id: 3, time: '10:00', activity: 'Breakfast', type: 'meal', duration: 30 },
      { id: 4, time: '11:00', activity: 'Biology Study', type: 'study', duration: 90 },
      { id: 5, time: '13:00', activity: 'Dhuhr Prayer', type: 'spiritual', duration: 20 },
      { id: 6, time: '14:00', activity: 'Lunch', type: 'meal', duration: 45 },
      { id: 7, time: '15:30', activity: 'Cardio Workout', type: 'fitness', duration: 30 },
      { id: 8, time: '16:30', activity: 'Asr Prayer', type: 'spiritual', duration: 15 },
      { id: 9, time: '19:15', activity: 'Maghrib Prayer', type: 'spiritual', duration: 20 },
      { id: 10, time: '20:00', activity: 'Dinner', type: 'meal', duration: 45 },
      { id: 11, time: '21:00', activity: 'Isha Prayer', type: 'spiritual', duration: 20 }
    ]
  });

  const getDaySchedule = () => {
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
    return weeklySchedule[dayName as keyof typeof weeklySchedule] || [];
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'study': return BookOpen;
      case 'fitness': return Dumbbell;
      case 'meal': return UtensilsCrossed;
      case 'spiritual': return Calendar;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fitness': return 'bg-green-100 text-green-800 border-green-200';
      case 'meal': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'spiritual': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentSchedule = getDaySchedule();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600">Plan and organize your daily routine</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() - date.getDay() + 1 + index); // Get Monday as start
                  const isSelected = selectedDate.toDateString() === date.toDateString();
                  
                  return (
                    <Button
                      key={day}
                      variant={isSelected ? "default" : "outline"}
                      className={`justify-start ${isSelected ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{day}</span>
                        <span className="text-xs opacity-75">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Schedule */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentSchedule.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No activities scheduled for this day</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {currentSchedule.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="text-center min-w-[60px]">
                        <div className="font-mono font-bold text-gray-900">{activity.time}</div>
                        <div className="text-xs text-gray-500">{activity.duration}min</div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{activity.activity}</h3>
                        </div>
                        <Badge variant="outline" className={getActivityColor(activity.type)}>
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Study Hours', value: '4.5h', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Workout Time', value: '1.25h', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Prayer Times', value: '5', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Meals', value: '4', color: 'text-orange-600', bg: 'bg-orange-50' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className={`p-4 text-center ${stat.bg}`}>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;

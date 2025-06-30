
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { title: 'Study Streak', value: '12 days', change: '+2 from last week', icon: Target },
    { title: 'Workouts This Week', value: '5', change: '+1 from last week', icon: TrendingUp },
    { title: 'Water Goal', value: '85%', change: 'On track', icon: TrendingUp },
    { title: 'Total Achievements', value: '23', change: '+3 this month', icon: Award }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your discipline journey</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
          <Calendar className="w-4 h-4 mr-2" />
          View Schedule
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Study Time', current: 2, target: 4, unit: 'hours' },
                { label: 'Water Intake', current: 6, target: 8, unit: 'glasses' },
                { label: 'Prayers', current: 4, target: 5, unit: 'completed' },
                { label: 'Meals', current: 3, target: 4, unit: 'eaten' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full transition-all"
                        style={{ width: `${(item.current / item.target) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.current}/{item.target} {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800">Study 25 hours</h4>
                <p className="text-sm text-green-600">18/25 hours completed</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800">Workout 5 times</h4>
                <p className="text-sm text-blue-600">3/5 workouts done</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-medium text-orange-800">Gain 0.5kg weight</h4>
                <p className="text-sm text-orange-600">On track</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

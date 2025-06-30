
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, Target, TrendingUp } from 'lucide-react';

const StudyTimerPage = () => {
  const [activeTimer, setActiveTimer] = useState({
    isRunning: false,
    time: 25 * 60, // 25 minutes
    mode: 'pomodoro' // pomodoro, shortBreak, longBreak
  });

  const [todayStats, setTodayStats] = useState({
    totalTime: 120, // minutes
    sessions: 5,
    streakDays: 12
  });

  const [weeklyData] = useState([
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 3.1 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 1.8 },
    { day: 'Sun', hours: 3.0 }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer.isRunning && activeTimer.time > 0) {
      interval = setInterval(() => {
        setActiveTimer(prev => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
    } else if (activeTimer.time === 0) {
      setActiveTimer(prev => ({ ...prev, isRunning: false }));
      // Handle timer completion
    }
    return () => clearInterval(interval);
  }, [activeTimer.isRunning, activeTimer.time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setActiveTimer(prev => ({ ...prev, isRunning: true }));
  const pauseTimer = () => setActiveTimer(prev => ({ ...prev, isRunning: false }));
  const resetTimer = () => setActiveTimer(prev => ({ ...prev, isRunning: false, time: 25 * 60 }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study Timer</h1>
          <p className="text-gray-600">Focus with the Pomodoro technique</p>
        </div>
      </div>

      <Tabs defaultValue="timer" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timer">Timer</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="timer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Timer */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pomodoro Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-mono font-bold text-blue-600">
                  {formatTime(activeTimer.time)}
                </div>
                <div className="space-x-4">
                  {!activeTimer.isRunning ? (
                    <Button onClick={startTimer} size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Start Focus
                    </Button>
                  ) : (
                    <Button onClick={pauseTimer} size="lg" variant="outline">
                      Pause
                    </Button>
                  )}
                  <Button onClick={resetTimer} size="lg" variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Today's Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{todayStats.totalTime}</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{todayStats.sessions}</div>
                    <div className="text-sm text-gray-600">Sessions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{todayStats.streakDays}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Study Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', duration: 25, time: '2:30 PM', completed: true },
                  { subject: 'Physics', duration: 25, time: '1:00 PM', completed: true },
                  { subject: 'Chemistry', duration: 15, time: '11:30 AM', completed: false },
                  { subject: 'Biology', duration: 25, time: '10:00 AM', completed: true }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <div>
                        <div className="font-medium">{session.subject}</div>
                        <div className="text-sm text-gray-600">{session.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{session.duration} min</span>
                      <div className={`w-3 h-3 rounded-full ${session.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Weekly Study Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium w-12">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${(day.hours / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{day.hours}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyTimerPage;

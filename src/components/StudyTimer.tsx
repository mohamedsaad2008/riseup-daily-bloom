import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { studyService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface StudyTimerProps {
  onTimeUpdate: (minutes: number) => void;
}

const StudyTimer: React.FC<StudyTimerProps> = ({ onTimeUpdate }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      completePomodoro();
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const completePomodoro = async () => {
    try {
      setLoading(true);
      
      // Add 25 minutes to the total study time
      const newTotal = totalStudyTime + 25;
      
      // Update in the backend
      await studyService.addStudySession(25);
      
      // Update local state
      setTotalStudyTime(newTotal);
      onTimeUpdate(newTotal);
      
      // Reset timer
      setTime(25 * 60);
      
      // Show toast
      toast({
        title: "📚 Pomodoro Completed!",
        description: "Great job! Take a short break before continuing.",
        duration: 5000,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error updating study time:', error);
      toast({
        title: "Error",
        description: "Failed to update study time. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📖 Pomodoro Study Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-4xl font-mono font-bold text-blue-600">
            {formatTime(time)}
          </div>
          <div className="text-sm text-gray-600">
            Total today: {totalStudyTime} minutes
          </div>
          <div className="flex gap-2 justify-center">
            {!isRunning ? (
              <Button 
                onClick={startTimer}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={loading}
              >
                Start
              </Button>
            ) : (
              <Button 
                onClick={pauseTimer}
                variant="outline"
                disabled={loading}
              >
                Pause
              </Button>
            )}
            <Button 
              onClick={resetTimer}
              variant="outline"
              disabled={loading}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimer;
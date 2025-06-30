
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PrayerTrackerProps {
  onPrayerComplete: (count: number) => void;
}

const PrayerTracker: React.FC<PrayerTrackerProps> = ({ onPrayerComplete }) => {
  const [completedPrayers, setCompletedPrayers] = useState<boolean[]>([false, false, false, false, false]);
  
  const prayers = [
    { name: 'Fajr', time: '5:45 AM', emoji: '🌅' },
    { name: 'Dhuhr', time: '1:20 PM', emoji: '☀️' },
    { name: 'Asr', time: '4:30 PM', emoji: '🌤️' },
    { name: 'Maghrib', time: '7:15 PM', emoji: '🌅' },
    { name: 'Isha', time: '8:45 PM', emoji: '🌙' },
  ];

  const togglePrayer = (index: number) => {
    const newCompleted = [...completedPrayers];
    newCompleted[index] = !newCompleted[index];
    setCompletedPrayers(newCompleted);
    
    const count = newCompleted.filter(Boolean).length;
    onPrayerComplete(count);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🕋 Prayer Times (Morocco)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prayers.map((prayer, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                completedPrayers[index] 
                  ? 'bg-gradient-to-r from-purple-100 to-violet-100 border-2 border-purple-300' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{prayer.emoji}</span>
                <div>
                  <div className="font-medium text-gray-800">{prayer.name}</div>
                  <div className="text-sm text-gray-500">{prayer.time}</div>
                </div>
              </div>
              <Button
                onClick={() => togglePrayer(index)}
                variant={completedPrayers[index] ? "default" : "outline"}
                size="sm"
                className={completedPrayers[index] ? "bg-gradient-to-r from-purple-500 to-violet-600" : ""}
              >
                {completedPrayers[index] ? '✓' : '○'}
              </Button>
            </div>
          ))}
          <div className="text-center text-sm text-gray-600 mt-4">
            {completedPrayers.filter(Boolean).length}/5 prayers completed
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrayerTracker;

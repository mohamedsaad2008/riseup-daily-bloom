
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WaterTrackerProps {
  current: number;
  onWaterAdd: (count: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ current, onWaterAdd }) => {
  const goal = 8;

  const addWater = () => {
    if (current < goal) {
      onWaterAdd(current + 1);
    }
  };

  const resetWater = () => {
    onWaterAdd(0);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💧 Water Intake
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Water glasses visualization */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(goal)].map((_, index) => (
              <div
                key={index}
                className={`w-12 h-16 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 ${
                  index < current
                    ? 'bg-gradient-to-b from-cyan-400 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                💧
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600 mb-1">
              {current}/{goal} glasses
            </div>
            <div className="text-sm text-gray-600">
              {current >= goal ? 'Great job! Stay hydrated! 🎉' : `${goal - current} more to go`}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <Button 
              onClick={addWater}
              disabled={current >= goal}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50"
            >
              + Add Glass
            </Button>
            <Button 
              onClick={resetWater}
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

export default WaterTracker;

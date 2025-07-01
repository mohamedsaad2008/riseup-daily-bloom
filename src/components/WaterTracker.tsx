import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { waterService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface WaterTrackerProps {
  current: number;
  onWaterAdd: (count: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ current, onWaterAdd }) => {
  const goal = 8;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addWater = async () => {
    if (current < goal) {
      try {
        setLoading(true);
        const newCount = current + 1;
        
        // Update in the backend
        await waterService.updateWaterIntake(newCount);
        
        // Update in the UI
        onWaterAdd(newCount);
        
        if (newCount === goal) {
          toast({
            title: "💧 Hydration Goal Achieved!",
            description: "Great job staying hydrated today!",
            duration: 3000,
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error updating water intake:', error);
        toast({
          title: "Error",
          description: "Failed to update water intake. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    }
  };

  const resetWater = async () => {
    try {
      setLoading(true);
      
      // Reset in the backend
      await waterService.updateWaterIntake(0);
      
      // Reset in the UI
      onWaterAdd(0);
      
      setLoading(false);
    } catch (error) {
      console.error('Error resetting water intake:', error);
      toast({
        title: "Error",
        description: "Failed to reset water intake. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
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
              disabled={current >= goal || loading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50"
            >
              + Add Glass
            </Button>
            <Button 
              onClick={resetWater}
              variant="outline"
              size="sm"
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

export default WaterTracker;
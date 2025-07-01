import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { weightService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const WeightTracker = () => {
  const [currentWeight, setCurrentWeight] = useState(40);
  const [weightInput, setWeightInput] = useState('');
  const [weightHistory, setWeightHistory] = useState([
    { date: '2024-01-01', weight: 40 },
    { date: '2024-01-15', weight: 40.5 },
    { date: '2024-02-01', weight: 41 },
    { date: '2024-02-15', weight: 41.8 },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const goalWeight = 55;
  const progressPercentage = ((currentWeight - 40) / (goalWeight - 40)) * 100;

  // Fetch weight history on component mount
  useEffect(() => {
    const fetchWeightHistory = async () => {
      try {
        setLoading(true);
        const history = await weightService.getWeightHistory();
        if (history && history.length > 0) {
          setWeightHistory(history);
          // Set current weight to the most recent entry
          setCurrentWeight(history[0].weight);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weight history:', error);
        setLoading(false);
      }
    };
    
    fetchWeightHistory();
  }, []);

  const addWeight = async () => {
    const weight = parseFloat(weightInput);
    if (weight && weight > 0) {
      try {
        setLoading(true);
        
        // Add weight entry to the backend
        await weightService.addWeightEntry(weight, goalWeight);
        
        // Update local state
        setCurrentWeight(weight);
        setWeightInput('');
        
        // Add to history
        const today = new Date().toISOString().split('T')[0];
        const newHistory = [{ date: today, weight }, ...weightHistory];
        setWeightHistory(newHistory);
        
        toast({
          title: "⚖️ Weight Updated",
          description: `Your weight has been updated to ${weight} kg`,
          duration: 3000,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error updating weight:', error);
        toast({
          title: "Error",
          description: "Failed to update weight. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
      }
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ⚖️ Weight Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Stats */}
          <div className="text-center p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {currentWeight} kg
            </div>
            <div className="text-sm text-gray-600">
              Goal: {goalWeight} kg
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>40 kg</span>
              <span>{Math.round(progressPercentage)}% complete</span>
              <span>55 kg</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(progressPercentage, 5)}%` }}
              ></div>
            </div>
          </div>

          {/* Add Weight */}
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter weight"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button 
              onClick={addWeight}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              disabled={loading || !weightInput}
            >
              Update
            </Button>
          </div>

          {/* Encouragement */}
          <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
            {currentWeight > 40 ? 
              `🎉 Great progress! You've gained ${(currentWeight - 40).toFixed(1)} kg!` :
              "🌱 Start your weight gain journey today!"
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightTracker;
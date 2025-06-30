
import React from 'react';

interface HabitRingProps {
  title: string;
  emoji: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
}

const HabitRing: React.FC<HabitRingProps> = ({ title, emoji, current, goal, unit, color }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 mb-3">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgb(229, 231, 235)"
              strokeWidth="6"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={`bg-gradient-to-r ${color}`} stopColor="currentColor" />
                <stop offset="100%" className={`bg-gradient-to-r ${color}`} stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">{emoji}</span>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
        <p className="text-xs text-gray-600">
          {current}/{goal} {unit}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className={`bg-gradient-to-r ${color} h-1.5 rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HabitRing;

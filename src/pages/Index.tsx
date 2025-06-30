
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-blue-100">
      <Dashboard />
      <Toaster />
    </div>
  );
};

export default Index;

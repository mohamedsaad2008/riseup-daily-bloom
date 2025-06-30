
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to dashboard since we now have a proper layout
  return <Navigate to="/" replace />;
};

export default Index;

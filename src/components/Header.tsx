import React from 'react';
import { TrendingUp } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <TrendingUp className="w-10 h-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Mussel Farming Calculator</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Calculate and predict your mussel farming financial metrics with advanced inflation adjustments and future projections
      </p>
    </header>
  );
};
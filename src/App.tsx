import React, { useState } from 'react';
import { FormData, CalculationResult, Prediction, HistoricalData } from './types';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { Results } from './components/Results';
import { HistoricalDataInput } from './components/HistoricalDataInput';
import { PredictionGraph } from './components/PredictionGraph';
import { calculateFinancials, generatePredictions } from './utils/calculations';

export const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    revenue: 100000,
    operationCost: 40000,
    fixedCost: 20000,
    depreciation: 10000,
    inflationConsumer: 2.5,
    inflationProducer: 3.0,
    taxRate: 25,
    historicalData: []
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleHistoricalDataChange = (historicalData: HistoricalData[]) => {
    setFormData(prev => ({ ...prev, historicalData }));
  };

  const handleCalculate = () => {
    const newResult = calculateFinancials(formData);
    setResult(newResult);
    setPredictions(generatePredictions(newResult, formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <InputForm 
              formData={formData}
              onChange={handleInputChange}
              onCalculate={handleCalculate}
            />
            <HistoricalDataInput
              data={formData.historicalData}
              onChange={handleHistoricalDataChange}
            />
          </div>
          <Results result={result} predictions={predictions} />
        </div>
        
        {(result && predictions.length > 0) && (
          <div className="mt-8 max-w-7xl mx-auto">
            <PredictionGraph
              historicalData={formData.historicalData}
              predictions={predictions}
            />
          </div>
        )}
      </div>
    </div>
  );
};
import React from 'react';
import { DollarSign, TrendingUp, Calculator, PiggyBank } from 'lucide-react';
import { CalculationResult, Prediction } from '../types';

interface ResultsProps {
  result: CalculationResult | null;
  predictions: Prediction[];
}

export const Results = ({ result, predictions }: ResultsProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
      <Calculator className="w-5 h-5 text-blue-500" />
      Financial Analysis & Predictions
    </h2>
    
    {result && (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="font-medium text-gray-700">EBIT</h3>
            </div>
            <p className="text-xl font-bold text-blue-600">
              ${result.ebit.toLocaleString()}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="w-5 h-5 text-green-600" />
              <h3 className="font-medium text-gray-700">Net Profit</h3>
            </div>
            <p className="text-xl font-bold text-green-600">
              ${result.netProfit.toLocaleString()}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="font-medium text-gray-700">Cash Flow</h3>
            </div>
            <p className="text-xl font-bold text-purple-600">
              ${result.cashFlow.toLocaleString()}
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              <h3 className="font-medium text-gray-700">Tax Shield</h3>
            </div>
            <p className="text-xl font-bold text-amber-600">
              ${result.taxShield.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <h3 className="font-medium text-gray-700 mb-4">5-Year Financial Projection</h3>
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-2">Year</th>
                <th className="pb-2">Revenue</th>
                <th className="pb-2">EBIT</th>
                <th className="pb-2">Net Profit</th>
                <th className="pb-2">Cash Flow</th>
                <th className="pb-2">Consumer Inf.</th>
                <th className="pb-2">Producer Inf.</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred) => (
                <tr key={pred.year} className="border-t border-gray-200">
                  <td className="py-2">{pred.year}</td>
                  <td className="py-2">${pred.revenue.toLocaleString()}</td>
                  <td className="py-2">${pred.ebit.toLocaleString()}</td>
                  <td className="py-2 font-medium text-green-600">
                    ${pred.netProfit.toLocaleString()}
                  </td>
                  <td className="py-2">${pred.cashFlow.toLocaleString()}</td>
                  <td className="py-2">{pred.inflationConsumer}%</td>
                  <td className="py-2">{pred.inflationProducer}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Financial Analysis</h3>
          <p className="text-gray-600">
            {result.netProfit > 0 
              ? `Your operation shows positive financial health with an EBIT of $${result.ebit.toLocaleString()} and net profit of $${result.netProfit.toLocaleString()}. The tax shield from depreciation provides $${result.taxShield.toLocaleString()} in tax benefits.`
              : `Current operations show challenges with negative EBIT. Consider reviewing operational costs and pricing strategy to improve profitability.`
            }
          </p>
        </div>
      </div>
    )}

    {!result && (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Enter your financial details and click Calculate to see the analysis and predictions
        </p>
      </div>
    )}
  </div>
);
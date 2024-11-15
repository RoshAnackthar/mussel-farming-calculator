import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { HistoricalData, Prediction } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PredictionGraphProps {
  historicalData: HistoricalData[];
  predictions: Prediction[];
}

export const PredictionGraph: React.FC<PredictionGraphProps> = ({
  historicalData,
  predictions
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Financial Metrics Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  const allYears = [
    ...historicalData.map(d => d.year),
    ...predictions.map(p => p.year)
  ];

  const labels = allYears;
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: [
          ...historicalData.map(d => d.revenue),
          ...predictions.map(p => p.revenue)
        ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Net Profit',
        data: [
          ...historicalData.map(d => {
            const totalCosts = d.operationCost + d.fixedCost + d.depreciation;
            const ebit = d.revenue - totalCosts;
            const taxes = ebit * 0.25; // Assuming 25% tax rate for historical data
            return ebit - taxes;
          }),
          ...predictions.map(p => p.netProfit)
        ],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Cash Flow',
        data: [
          ...historicalData.map(d => {
            const totalCosts = d.operationCost + d.fixedCost + d.depreciation;
            const ebit = d.revenue - totalCosts;
            const taxes = ebit * 0.25;
            const netProfit = ebit - taxes;
            return netProfit + d.depreciation;
          }),
          ...predictions.map(p => p.cashFlow)
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Line options={options} data={data} />
    </div>
  );
};
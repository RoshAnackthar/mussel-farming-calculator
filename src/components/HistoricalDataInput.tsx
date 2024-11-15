import React from 'react';
import { HistoricalData } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface HistoricalDataInputProps {
  data: HistoricalData[];
  onChange: (data: HistoricalData[]) => void;
}

export const HistoricalDataInput: React.FC<HistoricalDataInputProps> = ({ data, onChange }) => {
  const addYear = () => {
    const currentYear = new Date().getFullYear();
    const newYear = data.length > 0 ? Math.min(...data.map(d => d.year)) - 1 : currentYear - 1;
    
    onChange([...data, {
      year: newYear,
      revenue: 0,
      operationCost: 0,
      fixedCost: 0,
      depreciation: 0
    }].sort((a, b) => a.year - b.year));
  };

  const removeYear = (year: number) => {
    onChange(data.filter(d => d.year !== year));
  };

  const updateYear = (index: number, field: keyof HistoricalData, value: number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700">Historical Data</h3>
        <button
          onClick={addYear}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
        >
          <Plus className="w-4 h-4" />
          Add Year
        </button>
      </div>

      {data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-2">Year</th>
                <th className="pb-2">Revenue</th>
                <th className="pb-2">Operation Cost</th>
                <th className="pb-2">Fixed Cost</th>
                <th className="pb-2">Depreciation</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((yearData, index) => (
                <tr key={yearData.year} className="border-t border-gray-200">
                  <td className="py-2">{yearData.year}</td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={yearData.revenue}
                      onChange={(e) => updateYear(index, 'revenue', Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={yearData.operationCost}
                      onChange={(e) => updateYear(index, 'operationCost', Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={yearData.fixedCost}
                      onChange={(e) => updateYear(index, 'fixedCost', Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      value={yearData.depreciation}
                      onChange={(e) => updateYear(index, 'depreciation', Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => removeYear(yearData.year)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.length === 0 && (
        <p className="text-gray-500 text-sm">
          Add historical data to improve prediction accuracy
        </p>
      )}
    </div>
  );
};
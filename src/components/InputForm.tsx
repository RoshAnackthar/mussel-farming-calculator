import React from 'react';
import { Calculator } from 'lucide-react';
import { FormData } from '../types';
import { InputField } from './InputField';

interface InputFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
}

export const InputForm = ({ formData, onChange, onCalculate }: InputFormProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
      <Calculator className="w-5 h-5 text-blue-500" />
      Financial Parameters
    </h2>
    
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Revenue ($)"
          name="revenue"
          value={formData.revenue}
          onChange={onChange}
        />
        <InputField
          label="Operation Cost ($)"
          name="operationCost"
          value={formData.operationCost}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Fixed Cost ($)"
          name="fixedCost"
          value={formData.fixedCost}
          onChange={onChange}
        />
        <InputField
          label="Depreciation ($)"
          name="depreciation"
          value={formData.depreciation}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Consumer Inflation Rate (%)"
          name="inflationConsumer"
          value={formData.inflationConsumer}
          onChange={onChange}
          step="0.1"
        />
        <InputField
          label="Producer Inflation Rate (%)"
          name="inflationProducer"
          value={formData.inflationProducer}
          onChange={onChange}
          step="0.1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Tax Rate (%)"
          name="taxRate"
          value={formData.taxRate}
          onChange={onChange}
          step="0.1"
        />
      </div>
    </div>

    <button
      onClick={onCalculate}
      className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <Calculator className="w-5 h-5" />
      Calculate Financials & Predictions
    </button>
  </div>
);
import { FormData, CalculationResult, Prediction } from '../types';

const calculateGrowthRate = (historicalData: FormData['historicalData']) => {
  if (historicalData.length < 2) return null;
  
  const sortedData = [...historicalData].sort((a, b) => a.year - b.year);
  const rates = [];
  
  for (let i = 1; i < sortedData.length; i++) {
    const rate = (sortedData[i].revenue - sortedData[i-1].revenue) / sortedData[i-1].revenue;
    rates.push(rate);
  }
  
  return rates.reduce((a, b) => a + b) / rates.length;
};

export const calculateFinancials = (formData: FormData): CalculationResult => {
  const totalCosts = formData.operationCost + formData.fixedCost + formData.depreciation;
  const ebit = formData.revenue - totalCosts;
  const taxes = ebit * (formData.taxRate / 100);
  const netProfit = ebit - taxes;
  const taxShield = formData.depreciation * (formData.taxRate / 100);
  const cashFlow = netProfit + formData.depreciation;

  return {
    revenue: formData.revenue,
    operationCost: formData.operationCost,
    fixedCost: formData.fixedCost,
    depreciation: formData.depreciation,
    totalCosts,
    ebit,
    taxes,
    netProfit,
    cashFlow,
    taxShield
  };
};

export const generatePredictions = (
  result: CalculationResult,
  formData: FormData
): Prediction[] => {
  const predictions: Prediction[] = [];
  const currentYear = new Date().getFullYear();
  
  let currentRevenue = result.revenue;
  let currentOpCost = result.operationCost;
  let currentFixedCost = result.fixedCost;
  let currentInflationC = formData.inflationConsumer;
  let currentInflationP = formData.inflationProducer;

  // Calculate historical growth rate if available
  const historicalGrowthRate = calculateGrowthRate(formData.historicalData);
  const revenueGrowthRate = historicalGrowthRate !== null 
    ? historicalGrowthRate 
    : currentInflationC / 100;

  for (let i = 1; i <= 5; i++) {
    // Apply growth and inflation effects
    currentRevenue *= (1 + revenueGrowthRate);
    currentOpCost *= (1 + currentInflationP / 100);
    currentFixedCost *= (1 + currentInflationP / 100);
    
    const totalCosts = currentOpCost + currentFixedCost + result.depreciation;
    const ebit = currentRevenue - totalCosts;
    const taxes = ebit * (formData.taxRate / 100);
    const netProfit = ebit - taxes;
    const taxShield = result.depreciation * (formData.taxRate / 100);
    const cashFlow = netProfit + result.depreciation;

    // Adjust inflation rates for next year (assuming slight changes)
    currentInflationC *= 1.001; // 0.1% annual adjustment
    currentInflationP *= 1.002; // 0.2% annual adjustment

    predictions.push({
      year: currentYear + i,
      revenue: Math.round(currentRevenue),
      operationCost: Math.round(currentOpCost),
      fixedCost: Math.round(currentFixedCost),
      depreciation: result.depreciation,
      totalCosts: Math.round(totalCosts),
      ebit: Math.round(ebit),
      taxes: Math.round(taxes),
      netProfit: Math.round(netProfit),
      cashFlow: Math.round(cashFlow),
      taxShield: Math.round(taxShield),
      inflationConsumer: Number(currentInflationC.toFixed(2)),
      inflationProducer: Number(currentInflationP.toFixed(2))
    });
  }

  return predictions;
};
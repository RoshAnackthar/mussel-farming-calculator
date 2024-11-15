export interface HistoricalData {
  year: number;
  revenue: number;
  operationCost: number;
  fixedCost: number;
  depreciation: number;
}

export interface FormData {
  revenue: number;
  operationCost: number;
  fixedCost: number;
  depreciation: number;
  inflationConsumer: number;
  inflationProducer: number;
  taxRate: number;
  historicalData: HistoricalData[];
}

export interface CalculationResult {
  revenue: number;
  operationCost: number;
  fixedCost: number;
  depreciation: number;
  totalCosts: number;
  ebit: number;
  taxes: number;
  netProfit: number;
  cashFlow: number;
  taxShield: number;
}

export interface Prediction {
  year: number;
  revenue: number;
  operationCost: number;
  fixedCost: number;
  depreciation: number;
  totalCosts: number;
  ebit: number;
  taxes: number;
  netProfit: number;
  cashFlow: number;
  taxShield: number;
  inflationConsumer: number;
  inflationProducer: number;
}
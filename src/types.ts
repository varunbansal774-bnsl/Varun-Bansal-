export interface SupplementState {
  name: string;
  price: number; // e.g., 59.99
  containerWeight: number; // e.g., 907 (grams)
  servingSize: number; // e.g., 30 (grams)
  proteinPerScoop: number; // e.g., 24 (grams)
  fatPerScoop: number; // e.g., 1.5 (grams)
  carbsPerScoop: number; // e.g., 3.0 (grams)
  proteinSource: string; // e.g., "Whey Isolate", "Pea Protein", etc.
  additives: string[]; // checked "editates" or fillers
}

export interface SupplementAnalysisResult {
  name: string;
  proteinPercentage: number;
  proteinPerScoop: number;
  fatPerScoop: number;
  carbsPerScoop: number;
  servingSize: number;
  proteinSource: string;
  bioavailabilityScore: number;
  bioavailabilityExplanations: string;
  editatesScore: number;
  editatesExplanations: string;
  positives: string[];
  negatives: string[];
  overallVerdict: string;
}

export interface ProteinSourceInfo {
  name: string;
  bioavailability: number;
  absorptionRate: 'Fast' | 'Medium' | 'Slow';
  features: string;
}

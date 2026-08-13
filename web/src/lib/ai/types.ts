export interface FindingAnalysisInput {
  title: string;
  severity: string;
  riskScore: number;
  assetName: string;
  scanner: string;
  description: string;
  evidence: string;
  remediation: string;
}

export interface FindingAnalysisResult {
  summary: string;
  whyItMatters: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
  recommendedActions: string[];
  remediationDraft: string;
  humanReviewRequired: true;
}

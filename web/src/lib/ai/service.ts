import type {
  FindingAnalysisInput,
  FindingAnalysisResult,
} from "./types";

export interface AIAnalysisService {
  analyzeFinding(
    input: FindingAnalysisInput,
  ): Promise<FindingAnalysisResult>;
}

export class DemoAIAnalysisService implements AIAnalysisService {
  async analyzeFinding(
    input: FindingAnalysisInput,
  ): Promise<FindingAnalysisResult> {
    return {
      summary: `${input.title} was identified by ${input.scanner} with a risk score of ${input.riskScore}.`,
      whyItMatters:
        "This finding may increase the security exposure of the affected asset and should be reviewed by the responsible engineering team.",
      confidence:
        input.riskScore >= 80
          ? "HIGH"
          : input.riskScore >= 60
            ? "MEDIUM"
            : "LOW",
      recommendedActions: [
        "Validate the finding and affected asset.",
        "Review the evidence and reproduction context.",
        "Apply the recommended remediation.",
        "Re-run the relevant security check after remediation.",
      ],
      remediationDraft: input.remediation,
      humanReviewRequired: true,
    };
  }
}

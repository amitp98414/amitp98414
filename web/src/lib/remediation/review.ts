import type { RemediationStatus, ReviewDecision } from "./types";

export interface RemediationReviewRequest {
  remediationId: string;
  decision: ReviewDecision;
  reviewer: string;
  comment?: string;
}

export interface RemediationReviewResult {
  remediationId: string;
  previousStatus: RemediationStatus;
  status: RemediationStatus;
  decision: ReviewDecision;
  reviewer: string;
  comment?: string;
  reviewedAt: string;
}

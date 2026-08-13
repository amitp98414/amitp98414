export type RemediationStatus =
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "IMPLEMENTED";

export type ReviewDecision =
  | "APPROVE"
  | "REJECT"
  | "REQUEST_CHANGES";

export interface RemediationDraft {
  id: string;
  findingId: string;
  title: string;
  summary: string;
  proposedFix: string;
  status: RemediationStatus;
  reviewer?: string;
  reviewedAt?: string;
}

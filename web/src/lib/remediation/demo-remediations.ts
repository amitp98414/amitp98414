import type { RemediationDraft } from "./types";

export const demoRemediations: RemediationDraft[] = [
  {
    id: "rem_001",
    findingId: "finding_001",
    title: "Restrict administrative endpoint",
    summary:
      "Add server-side authorization for the exposed administrative endpoint.",
    proposedFix:
      "Require authenticated administrative roles before allowing access to /admin and enforce authorization at the server boundary.",
    status: "PENDING_REVIEW",
  },
];

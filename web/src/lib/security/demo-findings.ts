export type FindingSeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "INFO";

export type FindingStatus =
  | "OPEN"
  | "IN_REVIEW"
  | "REMEDIATION"
  | "RESOLVED"
  | "FALSE_POSITIVE";

export interface Finding {
  id: string;
  assetId: string;
  title: string;
  severity: FindingSeverity;
  status: FindingStatus;
  scanner: string;
  riskScore: number;
  cve?: string;
  cwe?: string;
  location: string;
  description: string;
  evidence: string;
  remediation: string;
  detectedAt: string;
}

export const demoFindings: Finding[] = [
  {
    id: "finding_001",
    assetId: "asset_001",
    title: "Exposed administrative endpoint",
    severity: "CRITICAL",
    status: "OPEN",
    scanner: "DAST",
    riskScore: 94,
    cwe: "CWE-284",
    location: "/admin",
    description:
      "An administrative endpoint is exposed without the expected access control boundary.",
    evidence:
      "Synthetic demo evidence: endpoint metadata indicates missing authorization controls.",
    remediation:
      "Restrict the endpoint to authenticated administrative roles and enforce server-side authorization.",
    detectedAt: "2026-08-13T05:35:00Z",
  },
  {
    id: "finding_002",
    assetId: "asset_002",
    title: "Dependency with known vulnerability",
    severity: "HIGH",
    status: "REMEDIATION",
    scanner: "SCA",
    riskScore: 82,
    cve: "CVE-2026-DEMO-001",
    location: "package-lock.json",
    description:
      "A dependency matches a synthetic vulnerability record used for product demonstration.",
    evidence:
      "Synthetic package advisory match. No real package registry lookup is performed in demo mode.",
    remediation:
      "Upgrade to a patched dependency release and regenerate the lockfile.",
    detectedAt: "2026-08-13T04:52:00Z",
  },
  {
    id: "finding_003",
    assetId: "asset_003",
    title: "Hard-coded credential pattern",
    severity: "HIGH",
    status: "IN_REVIEW",
    scanner: "SECRETS",
    riskScore: 79,
    cwe: "CWE-798",
    location: "src/config/demo.ts:18",
    description:
      "A credential-like pattern was detected in a source file.",
    evidence:
      "Synthetic secret-detection result. The value is intentionally non-sensitive demo data.",
    remediation:
      "Move credentials to a managed secret store and rotate any exposed credential.",
    detectedAt: "2026-08-12T21:24:00Z",
  },
  {
    id: "finding_004",
    assetId: "asset_004",
    title: "Container image uses outdated base",
    severity: "MEDIUM",
    status: "OPEN",
    scanner: "CONTAINER",
    riskScore: 61,
    location: "Dockerfile:1",
    description:
      "The container base image is behind the recommended update cadence.",
    evidence:
      "Synthetic container policy result.",
    remediation:
      "Update to an approved supported base image and rebuild the image.",
    detectedAt: "2026-08-12T20:14:00Z",
  },
  {
    id: "finding_005",
    assetId: "asset_001",
    title: "Missing security response header",
    severity: "MEDIUM",
    status: "OPEN",
    scanner: "DAST",
    riskScore: 56,
    cwe: "CWE-693",
    location: "HTTP response headers",
    description:
      "A recommended browser security response header is missing.",
    evidence:
      "Synthetic response-header policy result.",
    remediation:
      "Configure the required security response header at the application or reverse-proxy layer.",
    detectedAt: "2026-08-12T19:45:00Z",
  },
];

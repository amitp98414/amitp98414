import type { Finding } from "./demo-findings";

const severityWeight: Record<Finding["severity"], number> = {
  CRITICAL: 1,
  HIGH: 0.8,
  MEDIUM: 0.5,
  LOW: 0.2,
  INFO: 0.05,
};

export function calculateRiskScore(findings: Finding[]) {
  if (findings.length === 0) {
    return 100;
  }

  const weightedExposure = findings.reduce((sum, finding) => {
    return sum + finding.riskScore * severityWeight[finding.severity];
  }, 0);

  const normalizedExposure =
    weightedExposure / Math.max(findings.length, 1);

  return Math.max(0, Math.min(100, Math.round(100 - normalizedExposure)));
}

export function getRiskBreakdown(findings: Finding[]) {
  return {
    critical: findings.filter((f) => f.severity === "CRITICAL").length,
    high: findings.filter((f) => f.severity === "HIGH").length,
    medium: findings.filter((f) => f.severity === "MEDIUM").length,
    low: findings.filter((f) => f.severity === "LOW").length,
    open: findings.filter(
      (f) => f.status === "OPEN" || f.status === "IN_REVIEW",
    ).length,
    remediation: findings.filter(
      (f) => f.status === "REMEDIATION",
    ).length,
  };
}

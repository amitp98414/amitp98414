import { AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { demoFindings } from "@/lib/security/demo-findings";
import {
  calculateRiskScore,
  getRiskBreakdown,
} from "@/lib/security/risk-engine";

export default function RiskIntelligencePage() {
  const score = calculateRiskScore(demoFindings);
  const breakdown = getRiskBreakdown(demoFindings);

  const topRisks = [...demoFindings]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Risk Intelligence
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Security Risk Intelligence
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Workspace-level risk posture derived from current security findings.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4" />
              Security Score
            </div>

            <div className="mt-3 text-4xl font-bold">{score}</div>

            <div className="mt-2 text-xs text-muted-foreground">
              100 = lowest calculated exposure
            </div>
          </div>

          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
            <div className="text-sm text-red-300">Critical</div>

            <div className="mt-3 text-4xl font-bold text-red-300">
              {breakdown.critical}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-6">
            <div className="text-sm text-orange-300">High</div>

            <div className="mt-3 text-4xl font-bold text-orange-300">
              {breakdown.high}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-2 text-sm text-primary">
              <TrendingUp className="size-4" />
              Open / Review
            </div>

            <div className="mt-3 text-4xl font-bold">
              {breakdown.open}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Top risk exposures</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Highest-risk findings currently affecting the workspace.
                </p>
              </div>

              <AlertTriangle className="size-5 text-primary" />
            </div>

            <div className="mt-6 space-y-3">
              {topRisks.map((finding) => (
                <div
                  key={finding.id}
                  className="rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-medium">{finding.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {finding.scanner} · {finding.status}
                      </div>
                    </div>

                    <div className="font-mono text-lg font-bold">
                      {finding.riskScore}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Risk distribution</h2>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Critical</span>
                <span className="font-mono">{breakdown.critical}</span>
              </div>

              <div className="flex justify-between">
                <span>High</span>
                <span className="font-mono">{breakdown.high}</span>
              </div>

              <div className="flex justify-between">
                <span>Medium</span>
                <span className="font-mono">{breakdown.medium}</span>
              </div>

              <div className="flex justify-between">
                <span>Low</span>
                <span className="font-mono">{breakdown.low}</span>
              </div>

              <div className="flex justify-between">
                <span>In remediation</span>
                <span className="font-mono">{breakdown.remediation}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

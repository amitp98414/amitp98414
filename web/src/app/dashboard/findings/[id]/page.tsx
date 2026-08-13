import { AIAnalysisPanel } from "@/components/findings/ai-analysis-panel";
import Link from "next/link";
import { ArrowLeft, Bot, CheckCircle2, ShieldAlert } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { demoAssets } from "@/lib/security/demo-assets";
import { demoFindings } from "@/lib/security/demo-findings";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FindingDetailPage({ params }: Props) {
  const { id } = await params;

  const finding = demoFindings.find((item) => item.id === id);

  if (!finding) {
    return (
      <AppShell>
        <div className="mx-auto max-w-4xl py-16 text-center">
          <h1 className="text-2xl font-bold">Finding not found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The requested finding does not exist in the demo dataset.
          </p>

          <Link
            href="/dashboard/findings"
            className="mt-6 inline-flex rounded-lg border border-border px-4 py-2 text-sm"
          >
            Back to findings
          </Link>
        </div>
      </AppShell>
    );
  }

  const asset = demoAssets.find((item) => item.id === finding.assetId);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <Link
          href="/dashboard/findings"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to findings
        </Link>

        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-xs text-muted-foreground">
              {finding.id}
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              {finding.title}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              {finding.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1.5 text-xs font-medium text-red-300">
              {finding.severity}
            </span>

            <span className="rounded-xl border border-border bg-card px-4 py-2">
              <span className="block text-xs text-muted-foreground">
                Risk score
              </span>
              <span className="text-xl font-bold">{finding.riskScore}</span>
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <ShieldAlert className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Finding overview</h2>
              </div>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {finding.description}
              </p>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Evidence</h2>

              <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-muted/30 p-4 text-xs leading-6 text-muted-foreground">
                {finding.evidence}
              </pre>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">Recommended remediation</h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {finding.remediation}
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-sm font-semibold">Asset context</h2>

              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Asset</div>
                  <div className="mt-1 font-medium">
                    {asset?.name ?? finding.assetId}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground">Scanner</div>
                  <div className="mt-1 font-medium">{finding.scanner}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="mt-1 font-medium">{finding.status}</div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground">
                    Detected
                  </div>
                  <div className="mt-1 font-mono text-xs">
                    {finding.detectedAt.replace("T", " ").replace("Z", " UTC")}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-primary" />
                <h2 className="text-sm font-semibold">AI analysis</h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                AI-assisted triage will summarize exploitability, explain the
                risk score and prepare a remediation draft for human review.
              </p>

             <AIAnalysisPanel
               input={{
                 title: finding.title,
                 severity: finding.severity,
                 riskScore: finding.riskScore,
                 assetName: asset?.name ?? finding.assetId,
                 scanner: finding.scanner,
                 description: finding.description,
                 evidence: finding.evidence,
                 remediation: finding.remediation,
                }}
              />
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <h2 className="text-sm font-semibold">Audit status</h2>
              </div>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                This demo finding is synthetic and does not represent a live
                security test.
              </p>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

import Link from "next/link";
import { CheckCircle2, Clock3, ShieldAlert, XCircle } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { demoRemediations } from "@/lib/remediation/demo-remediations";

export default function AIRemediationPage() {
  const remediation = demoRemediations[0];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            AI Operations
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            AI Remediation
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Review AI-generated remediation proposals before any change is
            approved.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-5 text-amber-300" />
            <div>
              <div className="text-sm font-semibold text-amber-200">
                Human approval required
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                AI suggestions never execute automatically. An authorized
                reviewer must approve a remediation before implementation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <div className="font-mono text-xs text-muted-foreground">
                  {remediation.id}
                </div>

                <h2 className="mt-2 text-xl font-semibold">
                  {remediation.title}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Finding: {remediation.findingId}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/5 px-3 py-1.5 text-xs text-amber-300">
                <Clock3 className="size-4" />
                {remediation.status.replace("_", " ")}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                AI summary
              </div>

              <p className="mt-2 text-sm leading-7">
                {remediation.summary}
              </p>
            </div>

            <div className="mt-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Proposed fix
              </div>

              <div className="mt-3 rounded-xl border border-border bg-muted/20 p-5 text-sm leading-7">
                {remediation.proposedFix}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-black"
              >
                <CheckCircle2 className="size-4" />
                Approve
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/20 bg-red-400/5 px-5 py-2.5 text-sm text-red-300"
              >
                <XCircle className="size-4" />
                Reject
              </button>

              <button
                type="button"
                className="rounded-lg border border-border px-5 py-2.5 text-sm"
              >
                Request changes
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Workflow</h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="mt-1 size-2 rounded-full bg-primary" />
                <div>
                  <div className="text-sm font-medium">AI draft created</div>
                  <div className="text-xs text-muted-foreground">
                    Analysis generated from the finding context.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 size-2 rounded-full bg-amber-400" />
                <div>
                  <div className="text-sm font-medium">Human review</div>
                  <div className="text-xs text-muted-foreground">
                    Current stage.
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1 size-2 rounded-full bg-muted-foreground/40" />
                <div>
                  <div className="text-sm font-medium">Implementation</div>
                  <div className="text-xs text-muted-foreground">
                    Available only after approval.
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={`/dashboard/findings/${remediation.findingId}`}
              className="mt-8 inline-flex text-sm text-primary hover:underline"
            >
              Open source finding →
            </Link>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

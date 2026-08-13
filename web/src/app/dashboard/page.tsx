import {
  AlertTriangle,
  Boxes,
  FileWarning,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

const metrics = [
  {
    label: "Security Score",
    value: "87",
    hint: "+6 this month",
    icon: ShieldCheck,
  },
  {
    label: "Assets",
    value: "24",
    hint: "21 healthy",
    icon: Boxes,
  },
  {
    label: "Open Findings",
    value: "18",
    hint: "5 need attention",
    icon: FileWarning,
  },
  {
    label: "Critical",
    value: "2",
    hint: "1 in remediation",
    icon: AlertTriangle,
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <section>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Overview
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Security posture
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            AI-assisted DevSecOps visibility across your authorized assets.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div
                key={metric.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-lg shadow-black/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </span>

                  <Icon className="size-4 text-primary" aria-hidden="true" />
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {metric.value}
                </div>

                <div className="mt-1 text-xs text-muted-foreground">
                  {metric.hint}
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 xl:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Risk trend</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Simulated security posture over time
                </p>
              </div>

              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                DEMO
              </span>
            </div>

            <div className="mt-6 grid h-64 grid-cols-12 items-end gap-2 rounded-xl border border-dashed border-border bg-muted/20 p-5">
              {[40, 52, 45, 58, 60, 55, 68, 72, 65, 76, 81, 87].map(
                (height, index) => (
                  <div
                    key={index}
                    className="rounded-t bg-primary/35 transition hover:bg-primary/60"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">AI recommendations</h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <AlertTriangle className="size-4 text-destructive" />
                  2 critical findings
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Prioritize known-exploited issues and credential exposure.
                </p>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="size-4 text-primary" />
                  4 remediation drafts
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  AI-assisted fixes are available for review.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

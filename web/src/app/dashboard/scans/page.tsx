"use client";

import { useMemo, useState } from "react";
import { Play, Radar, Search, ShieldAlert } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { demoAssets } from "@/lib/security/demo-assets";
import { demoScans, type ScanStatus } from "@/lib/security/demo-scans";

export default function ScansPage() {
  const [status, setStatus] = useState<"ALL" | ScanStatus>("ALL");
  const [query, setQuery] = useState("");

  const assetMap = useMemo(
    () => new Map(demoAssets.map((asset) => [asset.id, asset.name])),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return demoScans.filter((scan) => {
      const assetName = assetMap.get(scan.assetId) ?? scan.assetId;

      const matchesStatus =
        status === "ALL" || scan.status === status;

      const matchesQuery =
        !q ||
        scan.id.toLowerCase().includes(q) ||
        assetName.toLowerCase().includes(q) ||
        scan.scanner.toLowerCase().includes(q);

      return matchesStatus && matchesQuery;
    });
  }, [assetMap, query, status]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Operations
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Scan Jobs
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Security scan orchestration for explicitly authorized assets.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-sm text-muted-foreground"
            title="Live scanning is disabled in demo mode"
          >
            <Play className="size-4" />
            New Scan
          </button>
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-5 text-amber-300" />
            <div>
              <div className="text-sm font-semibold text-amber-200">
                Demo Mode — execution disabled
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                These scan jobs use synthetic data. No external target is
                contacted and no live scanner is executed.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Total
            </div>
            <div className="mt-3 text-3xl font-bold">{demoScans.length}</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Running
            </div>
            <div className="mt-3 text-3xl font-bold text-primary">
              {demoScans.filter((s) => s.status === "RUNNING").length}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Completed
            </div>
            <div className="mt-3 text-3xl font-bold text-emerald-400">
              {demoScans.filter((s) => s.status === "COMPLETED").length}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Findings
            </div>
            <div className="mt-3 text-3xl font-bold">
              {demoScans.reduce((sum, scan) => sum + scan.findings, 0)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search scan ID, asset or scanner..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              maxLength={80}
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as "ALL" | ScanStatus)
            }
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="ALL">All statuses</option>
            <option value="QUEUED">Queued</option>
            <option value="RUNNING">Running</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">Scan</th>
                  <th className="px-5 py-4 font-medium">Asset</th>
                  <th className="px-5 py-4 font-medium">Scanner</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Findings</th>
                  <th className="px-5 py-4 font-medium">Started</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((scan) => (
                  <tr
                    key={scan.id}
                    className="border-b border-border/60 last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Radar className="size-4 text-primary" />
                        <span className="font-mono text-xs">
                          {scan.id}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {assetMap.get(scan.assetId) ?? scan.assetId}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {scan.scanner}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs">
                        {scan.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-mono">
                      {scan.findings}
                    </td>

                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      {new Date(scan.startedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

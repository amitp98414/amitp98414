"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Search,
  ShieldAlert,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { demoAssets } from "@/lib/security/demo-assets";
import {
  demoFindings,
  type FindingSeverity,
  type FindingStatus,
} from "@/lib/security/demo-findings";

const severityStyles: Record<FindingSeverity, string> = {
  CRITICAL:
    "border-red-400/30 bg-red-400/10 text-red-300",
  HIGH:
    "border-orange-400/30 bg-orange-400/10 text-orange-300",
  MEDIUM:
    "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  LOW:
    "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  INFO:
    "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

const statusStyles: Record<FindingStatus, string> = {
  OPEN: "border-red-400/20 bg-red-400/5 text-red-300",
  IN_REVIEW: "border-sky-400/20 bg-sky-400/5 text-sky-300",
  REMEDIATION: "border-primary/20 bg-primary/5 text-primary",
  RESOLVED: "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
  FALSE_POSITIVE:
    "border-border bg-muted text-muted-foreground",
};

export default function FindingsPage() {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const assetMap = useMemo(
    () => new Map(demoAssets.map((asset) => [asset.id, asset.name])),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return demoFindings
      .filter((finding) => {
        const matchesQuery =
          !q ||
          finding.title.toLowerCase().includes(q) ||
          finding.id.toLowerCase().includes(q) ||
          finding.scanner.toLowerCase().includes(q) ||
          finding.location.toLowerCase().includes(q);

        const matchesSeverity =
          severity === "ALL" || finding.severity === severity;

        const matchesStatus =
          status === "ALL" || finding.status === status;

        return matchesQuery && matchesSeverity && matchesStatus;
      })
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [query, severity, status]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Security Findings
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Findings
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Prioritize security findings using severity, risk and remediation
            status.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Total
            </div>
            <div className="mt-3 text-3xl font-bold">
              {demoFindings.length}
            </div>
          </div>

          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-red-300">
              <AlertTriangle className="size-4" />
              Critical
            </div>
            <div className="mt-3 text-3xl font-bold text-red-300">
              {demoFindings.filter((f) => f.severity === "CRITICAL").length}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/5 p-5">
            <div className="text-xs uppercase tracking-wider text-orange-300">
              High
            </div>
            <div className="mt-3 text-3xl font-bold text-orange-300">
              {demoFindings.filter((f) => f.severity === "HIGH").length}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
              <ShieldAlert className="size-4" />
              Avg Risk
            </div>
            <div className="mt-3 text-3xl font-bold text-primary">
              {Math.round(
                demoFindings.reduce((sum, finding) => sum + finding.riskScore, 0) /
                  demoFindings.length,
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search finding, scanner, location..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              maxLength={100}
            />
          </div>

          <select
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="ALL">All severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
            <option value="INFO">Info</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="ALL">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_REVIEW">In review</option>
            <option value="REMEDIATION">Remediation</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">Finding</th>
                  <th className="px-5 py-4 font-medium">Severity</th>
                  <th className="px-5 py-4 font-medium">Risk</th>
                  <th className="px-5 py-4 font-medium">Asset</th>
                  <th className="px-5 py-4 font-medium">Scanner</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((finding) => (
                  <tr
                    key={finding.id}
                    className="border-b border-border/60 last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/findings/${finding.id}`}
                        className="font-medium hover:text-primary"
                       >
                        {finding.title}
                      </Link>
                      
                      <div className="mt-1 font-mono text-xs text-muted-foreground">
                        {finding.id} · {finding.location}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${severityStyles[finding.severity]}`}
                      >
                        {finding.severity}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono font-semibold">
                        {finding.riskScore}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {assetMap.get(finding.assetId) ?? finding.assetId}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {finding.scanner}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs ${statusStyles[finding.status]}`}
                      >
                        {finding.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No findings match the selected filters.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

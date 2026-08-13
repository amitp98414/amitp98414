"use client";

import { useMemo, useState } from "react";
import {
  Boxes,
  CircleDot,
  Search,
  ShieldCheck,
} from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { demoAssets } from "@/lib/security/demo-assets";

export default function AssetsPage() {
  const [query, setQuery] = useState("");
  const [environment, setEnvironment] = useState("ALL");

  const filteredAssets = useMemo(() => {
    const q = query.trim().toLowerCase();

    return demoAssets.filter((asset) => {
      const matchesQuery =
        !q ||
        asset.name.toLowerCase().includes(q) ||
        asset.identifier.toLowerCase().includes(q) ||
        asset.owner.toLowerCase().includes(q) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesEnvironment =
        environment === "ALL" || asset.environment === environment;

      return matchesQuery && matchesEnvironment;
    });
  }, [query, environment]);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Inventory
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Assets
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage assets inside the authorized security scope.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Boxes className="size-4" />
              Total Assets
            </div>
            <div className="mt-3 text-3xl font-bold">{demoAssets.length}</div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="size-4" />
              Active
            </div>
            <div className="mt-3 text-3xl font-bold">
              {demoAssets.filter((a) => a.status === "ACTIVE").length}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CircleDot className="size-4" />
              Production
            </div>
            <div className="mt-3 text-3xl font-bold">
              {demoAssets.filter((a) => a.environment === "PRODUCTION").length}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search assets, owners, tags..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
              maxLength={80}
            />
          </div>

          <select
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          >
            <option value="ALL">All environments</option>
            <option value="PRODUCTION">Production</option>
            <option value="STAGING">Staging</option>
            <option value="DEVELOPMENT">Development</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">Asset</th>
                  <th className="px-5 py-4 font-medium">Type</th>
                  <th className="px-5 py-4 font-medium">Environment</th>
                  <th className="px-5 py-4 font-medium">Owner</th>
                  <th className="px-5 py-4 font-medium">Criticality</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAssets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="border-b border-border/60 last:border-0 hover:bg-muted/20"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium">{asset.name}</div>
                      <div className="mt-1 font-mono text-xs text-muted-foreground">
                        {asset.identifier}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {asset.type.replaceAll("_", " ")}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {asset.environment}
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {asset.owner}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono">{asset.criticality}/5</span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAssets.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No assets match your filters.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

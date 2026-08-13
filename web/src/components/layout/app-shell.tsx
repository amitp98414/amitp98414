"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Boxes,
  ChartNoAxesCombined,
  FileWarning,
  GitBranch,
  LayoutDashboard,
  Radar,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/assets", label: "Assets", icon: Boxes },
  { href: "/dashboard/scans", label: "Scans", icon: Radar },
  { href: "/dashboard/findings", label: "Findings", icon: FileWarning },
  { href: "/dashboard/risk", label: "Risk Intelligence", icon: ChartNoAxesCombined },
  { href: "/dashboard/remediation", label: "AI Remediation", icon: Sparkles },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/integrations", label: "Integrations", icon: GitBranch },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-border bg-sidebar lg:flex lg:flex-col">
          <div className="border-b border-border p-5">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                <ShieldCheck className="size-5 text-primary" />
              </div>

              <div>
                <div className="text-sm font-semibold tracking-[0.2em]">
                  SOLID FIESTA
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  AI DevSecOps Platform
                </div>
              </div>
            </Link>
          </div>

          <div className="flex-1 p-4">
            <nav className="space-y-1" aria-label="Primary navigation">
              {nav.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                      active
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    ].join(" ")}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-border p-4">
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Demo Mode
              </div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Synthetic security data only. No live target is contacted.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
            <div>
              <div className="text-sm font-medium">Security Command Center</div>
              <div className="text-xs text-muted-foreground">
                Security posture, risk and remediation
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-primary sm:inline-flex">
                Authorized scope only
              </span>

              <div className="grid size-9 place-items-center rounded-full border border-border bg-card text-xs font-semibold">
                AP
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

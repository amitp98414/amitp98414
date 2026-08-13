"use client";

import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";

type AIResult = {
  summary: string;
  whyItMatters: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
  recommendedActions: string[];
  remediationDraft: string;
  humanReviewRequired: true;
};

type Props = {
  input: {
    title: string;
    severity: string;
    riskScore: number;
    assetName: string;
    scanner: string;
    description: string;
    evidence: string;
    remediation: string;
  };
};

export function AIAnalysisPanel({ input }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "AI analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "AI analysis failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-center gap-2">
        <Bot className="size-5 text-primary" />
        <h2 className="text-sm font-semibold">AI analysis</h2>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Generate a structured security triage and remediation draft.
      </p>

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>

      {error && (
        <div className="mt-4 rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-xs text-red-300">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-5 space-y-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Summary
            </div>
            <p className="mt-2 text-sm leading-6">
              {result.summary}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Why it matters
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {result.whyItMatters}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recommended actions
            </div>

            <div className="mt-2 space-y-2">
              {result.recommendedActions.map((action) => (
                <div
                  key={action}
                  className="rounded-lg border border-border bg-background/40 p-3 text-sm"
                >
                  {action}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Remediation draft
            </div>

            <p className="mt-2 text-sm leading-6">
              {result.remediationDraft}
            </p>
          </div>

          <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-300">
            Confidence: {result.confidence} · Human review required
          </div>
        </div>
      )}
    </section>
  );
}

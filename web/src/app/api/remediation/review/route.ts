import { NextResponse } from "next/server";

import { demoRemediations } from "@/lib/remediation/demo-remediations";
import type { ReviewDecision } from "@/lib/remediation/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      remediationId,
      decision,
      reviewer,
      comment,
    } = body as {
      remediationId?: string;
      decision?: ReviewDecision;
      reviewer?: string;
      comment?: string;
    };

    if (!remediationId || !decision || !reviewer) {
      return NextResponse.json(
        {
          error:
            "remediationId, decision and reviewer are required",
        },
        { status: 400 },
      );
    }

    const remediation = demoRemediations.find(
      (item) => item.id === remediationId,
    );

    if (!remediation) {
      return NextResponse.json(
        { error: "Remediation not found" },
        { status: 404 },
      );
    }

    if (
      decision !== "APPROVE" &&
      decision !== "REJECT" &&
      decision !== "REQUEST_CHANGES"
    ) {
      return NextResponse.json(
        { error: "Invalid review decision" },
        { status: 400 },
      );
    }

    const statusMap: Record<
      ReviewDecision,
      "APPROVED" | "REJECTED" | "PENDING_REVIEW"
    > = {
      APPROVE: "APPROVED",
      REJECT: "REJECTED",
      REQUEST_CHANGES: "PENDING_REVIEW",
    };

    return NextResponse.json({
      success: true,
      demoMode: true,
      review: {
        remediationId,
        previousStatus: remediation.status,
        status: statusMap[decision],
        decision,
        reviewer,
        comment: comment ?? "",
        reviewedAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process remediation review" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import {
  DemoAIAnalysisService,
} from "@/lib/ai/service";
import type { FindingAnalysisInput } from "@/lib/ai/types";

const service = new DemoAIAnalysisService();

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<FindingAnalysisInput>;

    const required: Array<keyof FindingAnalysisInput> = [
      "title",
      "severity",
      "riskScore",
      "assetName",
      "scanner",
      "description",
      "evidence",
      "remediation",
    ];

    for (const field of required) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 },
        );
      }
    }

    if (
      typeof body.title !== "string" ||
      typeof body.severity !== "string" ||
      typeof body.riskScore !== "number" ||
      typeof body.assetName !== "string" ||
      typeof body.scanner !== "string" ||
      typeof body.description !== "string" ||
      typeof body.evidence !== "string" ||
      typeof body.remediation !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 },
      );
    }

    const result = await service.analyzeFinding({
      title: body.title,
      severity: body.severity,
      riskScore: body.riskScore,
      assetName: body.assetName,
      scanner: body.scanner,
      description: body.description,
      evidence: body.evidence,
      remediation: body.remediation,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Unable to analyze finding." },
      { status: 500 },
    );
  }
}

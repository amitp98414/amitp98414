export type ScanStatus = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED";

export type ScannerType =
  | "SAST"
  | "SCA"
  | "SECRETS"
  | "IAC"
  | "CONTAINER";

export interface ScanJob {
  id: string;
  assetId: string;
  scanner: ScannerType;
  status: ScanStatus;
  findings: number;
  startedAt: string;
  durationSeconds?: number;
}

export const demoScans: ScanJob[] = [
  {
    id: "scan_001",
    assetId: "asset_001",
    scanner: "SAST",
    status: "COMPLETED",
    findings: 7,
    startedAt: "2026-08-13T05:30:00Z",
    durationSeconds: 84,
  },
  {
    id: "scan_002",
    assetId: "asset_002",
    scanner: "SCA",
    status: "RUNNING",
    findings: 3,
    startedAt: "2026-08-13T05:42:00Z",
  },
  {
    id: "scan_003",
    assetId: "asset_003",
    scanner: "SECRETS",
    status: "COMPLETED",
    findings: 2,
    startedAt: "2026-08-12T21:20:00Z",
    durationSeconds: 42,
  },
  {
    id: "scan_004",
    assetId: "asset_004",
    scanner: "CONTAINER",
    status: "FAILED",
    findings: 0,
    startedAt: "2026-08-12T20:10:00Z",
    durationSeconds: 16,
  },
];

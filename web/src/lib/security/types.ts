export type AssetType =
  | "DOMAIN"
  | "IP"
  | "APPLICATION"
  | "API"
  | "REPOSITORY"
  | "CONTAINER"
  | "CLOUD_RESOURCE";

export type Environment =
  | "PRODUCTION"
  | "STAGING"
  | "DEVELOPMENT"
  | "UNKNOWN";

export type AssetStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "DECOMMISSIONED";

export interface Asset {
  id: string;
  workspaceId: string;
  name: string;
  type: AssetType;
  environment: Environment;
  status: AssetStatus;
  owner: string;
  criticality: number;
  identifier: string;
  tags: string[];
  lastScannedAt?: string;
}

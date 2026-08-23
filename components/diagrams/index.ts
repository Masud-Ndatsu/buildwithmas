import type { ComponentType } from "react";
import { CarbonAdjustDiagram } from "./carbon-adjust";
import { CollectivDiagram } from "./collectiv";
import { OpportunityDiagram } from "./opportunity";
import { UserManagementDiagram } from "./user-management";

/**
 * Keyed by the project `num` in `lib/content.ts`, which stays data-only
 * because it is imported by server code and the OG image route.
 */
export const projectDiagrams: Record<string, ComponentType> = {
  "01": OpportunityDiagram,
  "02": CarbonAdjustDiagram,
  "03": CollectivDiagram,
  "04": UserManagementDiagram,
};

// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Assessment, Screening } from "../types";
// The future server-only implementation must validate both model responses.
// The Phase 1 UI uses deterministic demo fixtures, never this interface.
export interface ScreeningProvider {
  readonly name: string;
  analyze(assessment: Assessment): Promise<Screening>;
}
export const LIVE_ANALYSIS_ENABLED = false;

// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Assessment, Screening } from "../types";
// Muse requests use the server-only PHP gateway; credentials never reach the browser.
export interface ScreeningProvider {
  readonly name: string;
  analyze(assessment: Assessment): Promise<Screening>;
}
// Availability is reported by GET /api/muse.php at runtime.

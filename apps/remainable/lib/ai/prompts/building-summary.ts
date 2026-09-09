// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
export const BUILDING_SUMMARY_POLICY = `Synthesize only validated per-image observations and known building information.
Distinguish visible observations, possible concerns, unavailable evidence and professional actions. Do not determine structural safety, repairability, occupancy or demolition.
Review priority is not a safety classification. Missing evidence must remain explicit. Never infer hidden conditions or mark evidence as supplied unless it is present.
Visible damage severity is not equivalent to structural significance.
Recommend professional review and applicable site-access procedures. Return validated structured JSON. No response authorizes entry.`;

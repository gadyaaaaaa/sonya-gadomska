// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Screening } from "./types";
// Present old reports with current branding without rewriting their saved evidence or metadata.
export function reviewForDisplay(review: Screening): Screening {
  const text = (value: string) =>
    value.replace(/\bMuse(?: Ember)?\b/gi, "Remainable");
  return {
    ...review,
    summary: text(review.summary),
    evidenceReason: review.evidenceReason
      ? text(review.evidenceReason)
      : undefined,
    informationRequests: review.informationRequests?.map(text),
    observations: review.observations.map((o) => ({
      ...o,
      component: text(o.component),
      damageType: text(o.damageType),
      description: text(o.description),
      location: text(o.location),
    })),
    concerns: review.concerns.map(text),
    nonStructural: review.nonStructural.map(text),
    missing: review.missing.map(text),
    actions: review.actions.map(text),
    limitations: review.limitations.map(text),
    changes: review.changes.map(text),
    followups: review.followups.map((f) => ({
      ...f,
      what: text(f.what),
      why: text(f.why),
      angle: text(f.angle),
      safety: text(f.safety),
    })),
  };
}

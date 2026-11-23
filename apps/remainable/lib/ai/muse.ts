// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { z } from "zod";
import {
  ACCESS_GUIDANCE,
  DISCLAIMER,
  hasProhibitedConclusion,
} from "../policy";
import type { Assessment, Screening } from "../types";
const text = z.string().min(1).max(3000);
const texts = z.array(text).max(30);
export const museResultSchema = z.object({
  summary: text,
  observations: z
    .array(
      z.object({
        imageId: z.string().max(100),
        component: text,
        damageType: text,
        severityVisual: z.enum([
          "minor",
          "moderate",
          "severe",
          "indeterminate",
        ]),
        description: text,
        location: text,
        confidence: z.null(),
        requiresEngineerAttention: z.boolean(),
      }),
    )
    .max(60),
  concerns: texts,
  nonStructural: texts,
  missing: texts,
  actions: texts,
  limitations: texts,
});
export function makeMuseScreening(a: Assessment, value: unknown): Screening {
  const result = museResultSchema.parse(value);
  const real = a.photos.filter((p) => !p.isSample);
  if (result.observations.some((o) => !real.some((p) => p.id === o.imageId)))
    throw new Error(
      "Remainable returned an observation without a matching photograph. Please retry.",
    );
  if (hasProhibitedConclusion(JSON.stringify(result)))
    throw new Error(
      "The response could not be used as a preliminary review. Please retry or request professional review.",
    );
  return {
    ...result,
    version: a.versions.length + 1,
    createdAt: new Date().toISOString(),
    photoIds: real.map((p) => p.id),
    mode: "muse",
    model: "muse-ember-1.0",
    status: "additional_evidence_recommended",
    priority: null,
    buildingSnapshot: structuredClone(a.building),
    evidenceSnapshot: structuredClone(real),
    followups: [],
    limitations: [
      ...result.limitations,
      DISCLAIMER,
      "Jurisdiction and supplied building norms are unverified context, not a compliance determination.",
    ],
    actions: [...result.actions, ACCESS_GUIDANCE],
    changes: [
      a.versions.length
        ? "New Remainable review using the current photographs and supplied building details. Earlier reports are preserved."
        : "Initial Remainable visual review. Missing building details have not been assumed.",
    ],
  };
}
export async function analyzeWithMuse(a: Assessment): Promise<Screening> {
  const photos = a.photos.filter((p) => !p.isSample);
  if (!photos.length)
    throw new Error(
      "Add a real photograph for Remainable review. Example illustrations use demo screening.",
    );
  const response = await fetch("/api/muse.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      building: a.building,
      photos: photos.map((p) => ({
        id: p.id,
        src: p.src,
        category: p.category,
        note: p.note,
      })),
      consent: true,
    }),
    signal: AbortSignal.timeout(100000),
  });
  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error(
      "Remainable is not configured on this server yet. Your photographs remain saved; try again later.",
    );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      data.error ||
        "Remainable review could not finish. Your previous report is unchanged.",
    );
  return makeMuseScreening(a, data.result);
}

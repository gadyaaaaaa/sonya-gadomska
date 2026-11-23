// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Building, Followup, Screening } from "./types";
import { ACCESS_GUIDANCE } from "./policy";
export function evidencePlan(r: Screening, building: Building) {
  const insufficient =
    r.mode === "documentation-only" ||
    !r.observations.length ||
    r.evidenceStatus === "insufficient" ||
    r.status === "seriously_insufficient_evidence";
  const photos: Followup[] = r.followups.length
    ? r.followups
    : [
        {
          id: "view-overall",
          what: "A clear view of the whole building",
          why: "We need to see the building and understand where the photographed area sits.",
          angle:
            "A wide exterior view from an already-cleared location. Keep the building in frame and use daylight if possible.",
          category: "exterior",
          safety: ACCESS_GUIDANCE,
        },
        {
          id: "view-detail",
          what: "The area you are concerned about",
          why: "A wider view and a sharper detail can help distinguish visible conditions from shadows or image blur.",
          angle:
            "Show the area in context, then a focused detail using zoom from an already-cleared position. If no damage is visible, say what prompted the review.",
          category: "unknown",
          safety: ACCESS_GUIDANCE,
        },
      ];
  const info = [...(r.informationRequests ?? [])];
  if (!info.length) {
    if (!building.country)
      info.push("Country and region, to identify the local context.");
    if (!building.floors) info.push("Number of floors, if known.");
    if (building.buildingUse === "unknown")
      info.push("What the building is used for.");
    if (building.incidentType === "unknown")
      info.push(
        "What happened, when, and which areas concern you. Leave unknown details blank.",
      );
  }
  return {
    insufficient,
    photos,
    information: [...new Set(info)].slice(0, 8),
    title:
      r.mode === "documentation-only"
        ? "Damage has not been assessed"
        : insufficient
          ? "Not enough data to assess damage"
          : "Some visible conditions identified",
    reason:
      r.mode === "documentation-only"
        ? "This is a local record only. No AI review has run. Add useful evidence below, then request a review when ready."
        : r.evidenceReason ||
          (insufficient
            ? "We cannot assess damage from the supplied evidence. No visible findings does not mean there is no damage."
            : "These observations cover only what is visible in the photographs. They do not establish the building’s overall condition."),
    genericPhotos: !r.followups.length,
  };
}

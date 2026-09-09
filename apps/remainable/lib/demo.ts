// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Assessment, Building, Photo, Screening } from "./types";
import { ACCESS_GUIDANCE, PROFESSIONAL_ACTION } from "./policy";
export const demoBuilding: Building = {
  projectName: "Courtyard House · demonstration",
  address: "Fictional site A-17 — no real address",
  country: "Fictional location",
  buildingUse: "residential",
  constructionYear: "1978",
  floors: "5",
  area: "2400",
  structuralSystem: "reinforced concrete frame",
  incidentType: "explosion/blast",
  incidentDate: "",
  notes:
    "Fictional training scenario. Five-storey residential building. Illustrations are not site photographs.",
  acknowledged: true,
};
export function samplePhotos(): Photo[] {
  return [
    {
      id: "DEMO-01",
      filename: "East elevation — schematic",
      category: "exterior" as const,
      src: "/demo/elevation.svg",
    },
    {
      id: "DEMO-02",
      filename: "Opening detail — schematic",
      category: "structural element" as const,
      src: "/demo/opening.svg",
    },
    {
      id: "DEMO-03",
      filename: "Slab edge — schematic",
      category: "structural element" as const,
      src: "/demo/slab.svg",
    },
  ].map((p) => ({
    ...p,
    note: "Fictional illustration, not a photograph.",
    isSample: true,
    addedAt: new Date().toISOString(),
  }));
}
export function createAssessment(
  building: Building,
  sample = false,
): Assessment {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    building,
    photos: sample ? samplePhotos() : [],
    versions: [],
    sample,
  };
}
export function createDemo(): Assessment {
  const a = createAssessment(demoBuilding, true);
  a.versions = [screen(a)];
  return a;
}
export function screen(a: Assessment): Screening {
  const fictional = a.sample && a.photos.some((p) => p.isSample);
  const prior = a.versions.at(-1);
  const newIds = a.photos
    .filter((p) => !prior?.photoIds.includes(p.id))
    .map((p) => p.id);
  const removed =
    prior?.photoIds.filter((id) => !a.photos.some((p) => p.id === id)) ?? [];
  const observations: Screening["observations"] = fictional
    ? [
        {
          imageId: "DEMO-01",
          component: "facade",
          damageType: "broken_glazing",
          severityVisual: "moderate" as const,
          description:
            "The example illustrates missing glazing and localized facade material loss on the east elevation.",
          location: "Central and right-hand openings.",
          confidence: null,
          requiresEngineerAttention: true,
        },
        {
          imageId: "DEMO-02",
          component: "unknown",
          damageType: "crack",
          severityVisual: "indeterminate" as const,
          description:
            "The example illustrates diagonal cracking near an opening. The load-bearing role of this wall is not established.",
          location: "Upper right corner of the opening.",
          confidence: null,
          requiresEngineerAttention: true,
        },
        {
          imageId: "DEMO-03",
          component: "slab",
          damageType: "spalling",
          severityVisual: "moderate" as const,
          description:
            "The example illustrates localized material loss at a slab edge; the connection is not documented.",
          location: "Outer edge of the slab.",
          confidence: null,
          requiresEngineerAttention: true,
        },
      ].filter((o) => a.photos.some((p) => p.id === o.imageId))
    : [];
  return {
    version: (prior?.version ?? 0) + 1,
    createdAt: new Date().toISOString(),
    photoIds: a.photos.map((p) => p.id),
    mode: fictional ? "fictional-example" : "documentation-only",
    status: fictional
      ? "additional_evidence_recommended"
      : "seriously_insufficient_evidence",
    priority: fictional ? "high" : null,
    summary: fictional
      ? "Fictional example: glazing loss, cracking near an opening and localized material loss would warrant professional review. Foundations, connections and the interior face remain undocumented."
      : "Evidence has been organized for professional review. No image analysis has been performed, and no damage findings or review priority have been assigned.",
    observations,
    concerns: fictional
      ? [
          "Example concern: cracking near the opening may warrant review of the surrounding load-bearing system.",
          "Example concern: the slab connection is not visible; its condition cannot be established.",
        ]
      : [],
    nonStructural: fictional
      ? [
          "Example: broken glazing and facade material loss. The images do not establish the structural significance.",
        ]
      : [],
    missing: fictional
      ? [
          "Foundation and basement views are not available in the example.",
          "The interior face of the affected wall is not documented.",
          "The slab-to-wall connection is obscured.",
        ]
      : [
          "A qualified engineer has not reviewed these photographs.",
          "Visual condition, evidence coverage and image quality have not been assessed.",
        ],
    followups: [
      {
        id: "REQ-01",
        what: "Full exterior elevation",
        why: "A broad view helps a professional relate local details to the overall building.",
        angle:
          "From an already authorized observation position, include the whole elevation and adjacent corners. Do not move closer to obtain the image.",
        safety: ACCESS_GUIDANCE,
        category: "exterior",
      },
      {
        id: "REQ-02",
        what: "Interior face of the documented wall",
        why: "A corresponding view may help an engineer compare the two faces.",
        angle:
          "Only if the location is already cleared and accessible, frame the wall and nearby floor or ceiling junction.",
        safety: ACCESS_GUIDANCE,
        category: "interior",
      },
      {
        id: "REQ-03",
        what: "Slab-to-wall connection",
        why: "The connection and adjoining elements are missing from the example evidence.",
        angle:
          "From an authorized position, include the junction and adjacent elements. Do not disturb debris or expose hidden components.",
        safety: ACCESS_GUIDANCE,
        relatedImage: fictional ? "DEMO-03" : undefined,
        category: "structural element",
      },
    ],
    actions: [
      fictional
        ? PROFESSIONAL_ACTION
        : "Arrange review of the collected evidence by a qualified structural engineer.",
      "Follow applicable emergency and site-access procedures.",
    ],
    limitations: [
      "Phase 1 demonstration: no AI model or engineering analysis has run.",
      "Visible damage severity is not equivalent to structural significance.",
      "Photographs cannot establish hidden conditions, material properties or structural capacity.",
      ...(a.photos.some((p) => !p.isSample)
        ? [
            "User-supplied photographs remain unreviewed. Example findings do not describe those photographs.",
          ]
        : []),
      "Follow-up requests are a general demonstration checklist, not site-specific access instructions.",
    ],
    changes: prior
      ? [
          `${newIds.length} evidence item(s) added; ${removed.length} removed from the current set.`,
          "Earlier report versions and their evidence are retained. No new engineering conclusions have been generated.",
        ]
      : ["Initial preliminary documentation version."],
  };
}

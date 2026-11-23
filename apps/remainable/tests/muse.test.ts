// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import test from "node:test";
import assert from "node:assert/strict";
import { createAssessment } from "../lib/demo";
import { emptyBuilding } from "../lib/initial";
import { buildingSchema } from "../lib/types";
import { makeMuseScreening } from "../lib/ai/muse";
const result = {
  summary: "Limited visible evidence.",
  observations: [],
  concerns: [],
  nonStructural: [],
  missing: ["Building details"],
  actions: ["Request professional review."],
  limitations: ["Photos cannot establish structural condition."],
};
test("photo-first assessments accept unknown building details without invented defaults", () => {
  assert.equal(buildingSchema.safeParse(emptyBuilding).success, true);
  assert.equal(emptyBuilding.buildingUse, "unknown");
  assert.equal(emptyBuilding.floors, "");
});
test("refinement freezes original building and evidence snapshots", () => {
  const a = createAssessment({ ...emptyBuilding });
  a.photos = [
    {
      id: "real-1",
      src: "data:image/jpeg;base64,AA==",
      filename: "test.jpg",
      category: "unknown",
      note: "",
      isSample: false,
      addedAt: new Date().toISOString(),
    },
  ];
  const first = makeMuseScreening(a, result);
  a.versions.push(first);
  a.building.country = "Canada";
  a.photos[0].note = "New context";
  const second = makeMuseScreening(a, result);
  assert.equal(first.buildingSnapshot?.country, "");
  assert.equal(first.evidenceSnapshot?.[0].note, "");
  assert.equal(second.buildingSnapshot?.country, "Canada");
  assert.equal(second.version, 2);
});
test("Muse rejects fabricated image references, verdicts and malformed output", () => {
  const a = createAssessment({ ...emptyBuilding });
  assert.throws(() =>
    makeMuseScreening(a, {
      ...result,
      summary: "This building is safe to enter.",
    }),
  );
  assert.throws(() =>
    makeMuseScreening(a, {
      ...result,
      observations: [
        {
          imageId: "fake",
          component: "wall",
          damageType: "crack",
          severityVisual: "minor",
          description: "Crack",
          location: "left",
          confidence: null,
          requiresEngineerAttention: true,
        },
      ],
    }),
  );
  assert.throws(() => makeMuseScreening(a, { summary: "Incomplete" }));
});

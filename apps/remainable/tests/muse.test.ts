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

test("older reports display Remainable branding without rewriting stored history", async () => {
  const { reviewForDisplay } = await import("../lib/review-display");
  const a = createAssessment({ ...emptyBuilding });
  const original = makeMuseScreening(a, {
    ...result,
    summary: "Muse reviewed this evidence.",
  });
  original.changes = ["Initial Muse visual review."];
  const saved = JSON.stringify(original);
  const display = reviewForDisplay(original);
  assert.equal(display.summary, "Remainable reviewed this evidence.");
  assert.equal(display.changes[0], "Initial Remainable visual review.");
  assert.equal(JSON.stringify(original), saved);
  assert.equal(display.mode, "muse");
});

test("no observations cannot be presented as assessable evidence", async () => {
  const { evidencePlan } = await import("../lib/evidence-plan");
  const a = createAssessment({ ...emptyBuilding });
  const r = makeMuseScreening(a, {
    ...result,
    evidenceStatus: "limited",
    evidenceReason: "Image is blank.",
    photoRequests: [
      {
        what: "A daylight view of the whole building",
        why: "No building can be identified.",
        angle: "Wide view from an already-cleared position.",
        category: "exterior",
      },
    ],
    informationRequests: ["When was this photo taken?"],
  });
  assert.equal(r.evidenceStatus, "insufficient");
  assert.equal(r.status, "seriously_insufficient_evidence");
  const plan = evidencePlan(r, a.building);
  assert.equal(plan.title, "Not enough data to assess damage");
  assert.equal(plan.photos[0].what, "A daylight view of the whole building");
  assert.ok(plan.information.includes("When was this photo taken?"));
  assert.deepEqual(plan.information, ["When was this photo taken?"]);
});
test("legacy empty results receive useful photo requests without invented findings", async () => {
  const { evidencePlan } = await import("../lib/evidence-plan");
  const a = createAssessment({ ...emptyBuilding });
  const r = makeMuseScreening(a, result);
  const plan = evidencePlan(r, a.building);
  assert.equal(plan.genericPhotos, true);
  assert.ok(plan.photos.length >= 2);
  assert.equal(r.observations.length, 0);
});

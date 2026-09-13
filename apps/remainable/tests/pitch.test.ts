// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { test } from "node:test";
import assert from "node:assert/strict";
import { pitchSlides, pitchHashAliases } from "../components/pitch/slides";

import { researchSources } from "../components/pitch/sources";

test("slide IDs remain unique and safe for direct links", () => {
  assert.equal(
    new Set(pitchSlides.map((slide) => slide.id)).size,
    pitchSlides.length,
  );
  for (const slide of pitchSlides) assert.match(slide.id, /^[a-z][a-z0-9-]+$/);
});

test("slide sources and legacy links resolve to defined entries", () => {
  const sources = new Set<string>(researchSources.map((source) => source.id));
  for (const slide of pitchSlides) {
    for (const source of slide.sources ?? []) assert.ok(sources.has(source));
  }
  for (const target of Object.values(pitchHashAliases))
    assert.ok(pitchSlides.some((slide) => slide.id === target));
});

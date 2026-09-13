// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { test } from "node:test";
import assert from "node:assert/strict";
import { pitchSlides } from "../components/pitch/slides";

test("slide IDs remain unique and safe for direct links", () => {
  assert.equal(
    new Set(pitchSlides.map((slide) => slide.id)).size,
    pitchSlides.length,
  );
  for (const slide of pitchSlides) assert.match(slide.id, /^[a-z][a-z0-9-]+$/);
});

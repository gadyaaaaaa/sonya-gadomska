// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Metadata } from "next";
import { PitchDeck } from "@/components/pitch/pitch-deck";
import { pitchSlides } from "@/components/pitch/slides";

export const metadata: Metadata = {
  title: "Pitch Deck",
  description:
    "What can remain? Sonya Gadomska’s early-stage exploration of building evidence, engineering and reuse.",
};

export default function PitchPage() {
  return <PitchDeck slides={pitchSlides} />;
}

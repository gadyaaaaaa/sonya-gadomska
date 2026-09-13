// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Metadata } from "next";
import { PitchDeck } from "@/components/pitch/pitch-deck";
import { pitchSlides } from "@/components/pitch/slides";

export const metadata: Metadata = {
  title: "Pitch Deck",
  description:
    "Remainable pitch deck — working presentation structure. Content pending.",
};

export default function PitchPage() {
  return <PitchDeck slides={pitchSlides} />;
}

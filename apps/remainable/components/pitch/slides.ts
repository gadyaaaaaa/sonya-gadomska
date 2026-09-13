// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
export type PitchSlideData = {
  /** Stable URL fragment: keep this when renaming or reordering a slide. */
  id: string;
  title: string;
  type: "cover" | "statement" | "diagram" | "comparison";
  placeholders: readonly string[];
};

/** Order here controls the deck, numbering, contents and progress automatically. */
export const pitchSlides: readonly PitchSlideData[] = [
  {
    id: "cover",
    title: "Cover",
    type: "cover",
    placeholders: ["Opening statement will go here"],
  },
  {
    id: "problem",
    title: "The Problem",
    type: "statement",
    placeholders: ["Problem statement will go here", "Evidence / data"],
  },
  {
    id: "insight",
    title: "The Insight",
    type: "statement",
    placeholders: ["Core insight will go here", "To be validated"],
  },
  {
    id: "why-now",
    title: "Why Now",
    type: "statement",
    placeholders: ["Context will go here", "Evidence / data"],
  },
  {
    id: "current-process",
    title: "Current Process",
    type: "diagram",
    placeholders: ["Process description will go here", "Diagram placeholder"],
  },
  {
    id: "solution",
    title: "Remainable",
    type: "statement",
    placeholders: ["Solution hypothesis will go here", "To be validated"],
  },
  {
    id: "how-it-could-work",
    title: "How It Could Work",
    type: "diagram",
    placeholders: ["Workflow hypothesis will go here", "Diagram placeholder"],
  },
  {
    id: "who-it-is-for",
    title: "Who It Is For",
    type: "comparison",
    placeholders: ["Customer hypothesis", "Customer hypothesis"],
  },
  {
    id: "value-creation",
    title: "Value Creation",
    type: "statement",
    placeholders: ["Value hypothesis will go here", "To be validated"],
  },
  {
    id: "market",
    title: "Market",
    type: "statement",
    placeholders: ["Market definition will go here", "Evidence / data"],
  },
  {
    id: "business-model",
    title: "Business Model",
    type: "statement",
    placeholders: ["Business model hypothesis will go here", "To be validated"],
  },
  {
    id: "alternatives",
    title: "Competition / Alternatives",
    type: "comparison",
    placeholders: [
      "Alternative to be documented",
      "Comparison criteria will go here",
    ],
  },
  {
    id: "why-us",
    title: "Why Us",
    type: "statement",
    placeholders: ["Team information will go here", "Supporting evidence"],
  },
  {
    id: "validation",
    title: "Validation & Experiments",
    type: "statement",
    placeholders: ["Experiment plan will go here", "To be validated"],
  },
  {
    id: "roadmap",
    title: "Roadmap",
    type: "diagram",
    placeholders: ["Milestones will go here", "Diagram placeholder"],
  },
  {
    id: "vision",
    title: "Vision",
    type: "statement",
    placeholders: ["Vision statement will go here"],
  },
  {
    id: "ask",
    title: "Ask / Next Step",
    type: "statement",
    placeholders: ["Next step will go here"],
  },
];

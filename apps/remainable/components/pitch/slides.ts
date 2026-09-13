// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { SourceId } from "./sources";
export type PitchSlideData = {
  /** Stable URL fragment. Keep IDs when renaming/reordering. */
  id: string;
  title: string;
  heading?: string;
  type: "cover" | "statement" | "diagram" | "comparison";
  placeholders?: readonly string[];
  status?: string;
  intro?: string;
  items?: readonly { label: string; text: string }[];
  layout?:
    | "notes"
    | "cover"
    | "pair"
    | "grid"
    | "flow"
    | "sequence"
    | "hierarchy"
    | "landscape"
    | "technology"
    | "research";
  note?: string;
  sources?: readonly SourceId[];
  sourceDetails?: boolean;
};
/** Preserve shared links to content merged into the shorter story. */
export const pitchHashAliases: Readonly<Record<string, string>> = {
  ask: "roadmap",
  sources: "roadmap",
  "current-process": "problem",
  "how-it-could-work": "solution",
  "value-creation": "solution",
  "business-model": "who-it-is-for",
  market: "who-it-is-for",
  team: "why-us",
  validation: "roadmap",
  vision: "insight",
};
/** Ten pitch slides. Research is expandable within the final slide, not counted. */
export const pitchSlides: readonly PitchSlideData[] = [
  {
    id: "cover",
    title: "REMAINABLE",
    heading: "What can remain?",
    type: "cover",
    intro: "AI-assisted assessment of damaged buildings.",
    items: [
      {
        label: "Sonya Gadomska",
        text: "Architectural Engineering · University of Waterloo",
      },
    ],
    layout: "cover",
    note: "",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "insight",
    title: "IDEA",
    heading:
      "Before we demolish a building, we should know what we are throwing away.",
    type: "diagram",
    intro:
      "A damaged building may still contain useful value at several levels.",
    items: [
      {
        label: "BUILDING",
        text: "",
      },
      {
        label: "STRUCTURE",
        text: "",
      },
      {
        label: "COMPONENTS",
        text: "",
      },
      {
        label: "MATERIALS",
        text: "",
      },
      {
        label: "WASTE",
        text: "",
      },
    ],
    layout: "hierarchy",
    note: "Sometimes demolition is the right answer.",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "problem",
    title: "PROBLEM",
    heading:
      "Damage assessment tells us what is damaged. What about what can remain?",
    type: "statement",
    intro: "",
    items: [
      {
        label:
          "Building assessments produce large amounts of visual information.",
        text: "",
      },
      {
        label: "Engineers need to decide what deserves closer investigation.",
        text: "",
      },
      {
        label:
          "Retention and reuse decisions need reliable information about what is still there.",
        text: "",
      },
    ],
    layout: "notes",
    note: "",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "solution",
    title: "SOLUTION",
    heading: "Turn building evidence into structured questions for engineers.",
    type: "diagram",
    intro: "The AI gets an opinion. The engineer gets the final word.",
    items: [
      {
        label: "PHOTOS",
        text: "",
      },
      {
        label: "VISIBLE CONDITIONS",
        text: "",
      },
      {
        label: "WHAT NEEDS INSPECTION",
        text: "",
      },
      {
        label: "WHAT MAY REMAIN",
        text: "",
      },
      {
        label: "ENGINEER",
        text: "",
      },
    ],
    layout: "sequence",
    note: "AI helps organise the evidence. Engineers make the decisions.",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "why-now",
    title: "WHY NOW",
    heading: "Circular construction meets better AI.",
    type: "statement",
    intro: "",
    items: [
      {
        label: "CIRCULAR CONSTRUCTION",
        text: "Buildings are increasingly viewed as resources: structures, components and materials can sometimes be retained or reused.",
      },
      {
        label: "AI",
        text: "Modern multimodal AI can interpret visual information that previously required much more manual review.",
      },
    ],
    layout: "pair",
    note: "Can these two changes make it easier to understand what is worth keeping?",
    sources: ["harvard", "rethink", "vtt", "eth"],
    sourceDetails: false,
  },
  {
    id: "who-it-is-for",
    title: "CUSTOMER & MARKET",
    heading: "Start where the problem is unusually visible.",
    type: "statement",
    intro: "",
    items: [
      {
        label: "BEACHHEAD",
        text: "Engineering and AEC firms assessing damaged buildings, including firms involved in Ukrainian reconstruction.",
      },
      {
        label: "EXPANSION",
        text: "Existing buildings → post-disaster assessment → renovation & adaptive reuse → circular construction",
      },
    ],
    layout: "notes",
    note: "Ukraine can be a place to learn. The problem is global.",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "alternatives",
    title: "COMPETITION",
    heading: "The interesting space may be between two existing categories.",
    type: "statement",
    intro: "",
    items: [
      {
        label: "DAMAGE ASSESSMENT",
        text: "StructurAI · Inspectech · InstaBud\n↓",
      },
      {
        label: "REMAINABLE",
        text: "WHAT CAN REMAIN?\n↓",
      },
      {
        label: "CIRCULAR CONSTRUCTION",
        text: "ZIRKULAR-X · Imperfect · ETH research",
      },
    ],
    layout: "landscape",
    note: "One group helps understand damage. Another helps understand reusable materials. Remainable explores the decision between them.",
    sources: [
      "structurai",
      "inspectech",
      "instabud",
      "zirkular",
      "imperfect",
      "eth",
    ],
    sourceDetails: false,
  },
  {
    id: "technology",
    title: "TECHNOLOGY",
    heading: "Start with the simplest experiment.",
    type: "statement",
    intro: "",
    items: [
      {
        label: "PHOTOS",
        text: "",
      },
      {
        label: "EXISTING MULTIMODAL AI",
        text: "",
      },
      {
        label: "STRUCTURED OBSERVATIONS",
        text: "",
      },
      {
        label: "ENGINEER REVIEW",
        text: "",
      },
    ],
    layout: "flow",
    note: "Later: 3D / spatial context → specialised data → specialised models",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "why-us",
    title: "FOUNDER & TEAM",
    heading: "Current team size: one.",
    type: "statement",
    intro:
      "I started with a question, not with expertise in every field. The next step is finding people who know much more than I do.",
    items: [
      {
        label: "SONYA",
        text: "18\nArchitectural Engineering at Waterloo\nInterested in buildings + business\nUkrainian / Canadian connection",
      },
      {
        label: "LOOKING FOR",
        text: "Structural engineering adviser\nAI / software co-founder or collaborator\nCircular-construction expertise\nAccess to real assessment cases",
      },
    ],
    layout: "pair",
    note: "",
    sources: [],
    sourceDetails: false,
  },
  {
    id: "roadmap",
    title: "NEXT STEPS",
    heading: "Now I need to find out if any of this is actually useful.",
    type: "statement",
    intro: "",
    items: [
      {
        label: "TALK",
        text: "Interview engineers and reconstruction practitioners.",
      },
      {
        label: "TEST",
        text: "Compare AI observations with professional observations on real authorised images.",
      },
      {
        label: "BUILD",
        text: "Create one very small working workflow.",
      },
      {
        label: "TRY",
        text: "Put it in front of engineers and see whether it saves useful work.",
      },
    ],
    layout: "flow",
    note: "If it does, keep building. If it doesn’t, learn why.",
    sources: [
      "harvard",
      "rethink",
      "vtt",
      "eth",
      "structurai",
      "inspectech",
      "instabud",
      "zirkular",
      "imperfect",
    ],
    sourceDetails: true,
  },
];

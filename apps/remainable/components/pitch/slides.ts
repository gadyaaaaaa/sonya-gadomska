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
};
/** Old shared links stay useful after the first content revision. */
export const pitchHashAliases: Readonly<Record<string, string>> = {
  ask: "roadmap",
};
/** Order controls numbering, contents, navigation and progress. */
export const pitchSlides: readonly PitchSlideData[] = [
  {
    id: "cover",
    title: "Cover",
    heading: "What can remain?",
    status: "An early-stage exploration",
    intro:
      "Remainable explores how AI could help engineers understand what still has useful value after a building is damaged.",
    items: [
      {
        label: "Sonya Gadomska",
        text: "18 · First-year Architectural Engineering student · University of Waterloo",
      },
      {
        label: "Starting point",
        text: "A working web prototype and a lot of questions. The prototype does not analyse uploaded photos.",
      },
    ],
    layout: "cover",
    note: "",
    sources: [],
    type: "cover",
  },
  {
    id: "problem",
    title: "The Problem",
    heading: "The inspection ends. The sorting begins?",
    status: "Problem hypothesis",
    intro:
      "Engineers may return with photographs, videos, notes and drawings. Turning that pile into useful documentation could be a problem worth solving.",
    items: [
      {
        label: "The possible pain",
        text: "Organising visual information, recording visible conditions and finding what needs a closer look.",
      },
      {
        label: "The first question",
        text: "Is this actually painful enough? I need to ask engineers before building an answer.",
      },
    ],
    layout: "notes",
    note: "This pain point is not validated. Interviews may change the idea.",
    sources: [],
    type: "statement",
  },
  {
    id: "insight",
    title: "What Can Remain?",
    heading: "More than repair or demolish.",
    status: "The question I want to explore",
    intro:
      "A damaged building is not just one thing. There may be value at several levels.",
    items: [
      {
        label: "Building",
        text: "Could the whole building remain?",
      },
      {
        label: "Structure",
        text: "Could part be retained or strengthened?",
      },
      {
        label: "Components",
        text: "Could individual elements be reused?",
      },
      {
        label: "Materials",
        text: "Could materials be recovered or recycled?",
      },
      {
        label: "Waste",
        text: "What really needs to be discarded?",
      },
    ],
    layout: "hierarchy",
    note: "Sometimes demolition is the right decision. Retention or recovery must make technical and economic sense.",
    sources: [],
    type: "diagram",
  },
  {
    id: "why-now",
    title: "Why Now",
    heading: "Two changes. One question.",
    status: "Research context",
    intro:
      "Circular construction asks us to look again at existing buildings. AI gives us another way to read their information.",
    items: [
      {
        label: "Circular construction",
        text: "Reuse, deconstruction and material inventories are active areas of research and practice. What is already there matters.",
      },
      {
        label: "AI + visual information",
        text: "VTT has demonstrated AI extracting material information from drawings, geometry and archives. Useful photo-based damage observations still need testing.",
      },
    ],
    layout: "pair",
    note: "Can the first stage of understanding a building become faster and cheaper?",
    sources: ["eth", "vtt", "rethink"],
    type: "statement",
  },
  {
    id: "current-process",
    title: "How It Works Today",
    heading: "Fit into the engineer’s work.",
    status: "Workflow to check in interviews",
    intro:
      "My starting picture of the workflow—not a claim that every firm works this way.",
    items: [
      {
        label: "Visit + record",
        text: "Photographs, video, notes and drawings or BIM, where available.",
      },
      {
        label: "Review + document",
        text: "Organise the evidence and record visible conditions.",
      },
      {
        label: "Assess + test",
        text: "An engineer investigates, including further testing where needed.",
      },
      {
        label: "Recommend",
        text: "Professionals decide on repair, strengthening or demolition.",
      },
    ],
    layout: "flow",
    note: "Some teams also use drones, photogrammetry, laser scanning or inspection software. I want to learn where a small tool could fit.",
    sources: [],
    type: "statement",
  },
  {
    id: "solution",
    title: "The Remainable Hypothesis",
    heading: "Document what was lost. Ask what is left.",
    status: "Venture hypothesis",
    intro:
      "The decision after building damage should also consider what still has useful value.",
    items: [
      {
        label: "A small starting point",
        text: "Help turn visual evidence into structured preliminary information.",
      },
      {
        label: "A broader question",
        text: "Document elements that may be worth investigating for retention or recovery.",
      },
    ],
    layout: "notes",
    note: "AI should help engineers find the questions. Engineers should make the engineering decisions.",
    sources: [],
    type: "statement",
  },
  {
    id: "how-it-could-work",
    title: "How It Could Work",
    heading: "Evidence first. Engineer last.",
    status: "Proposed workflow · not a working AI feature",
    intro: "The AI gets an opinion. The engineer gets the final word.",
    items: [
      {
        label: "Photo",
        text: "Start with photographs and other evidence that we have permission to use.",
      },
      {
        label: "Observation",
        text: "Try to identify building elements and describe visible conditions. Record uncertainty.",
      },
      {
        label: "Evidence",
        text: "Keep every proposed observation linked to its original photograph or document.",
      },
      {
        label: "Investigation",
        text: "Flag questions for closer inspection, including possible retention or recovery.",
      },
      {
        label: "Decision",
        text: "A qualified engineer reviews, corrects and decides what further work is needed.",
      },
    ],
    layout: "sequence",
    note: "Remainable does not determine structural safety or replace structural engineers.",
    sources: [],
    type: "diagram",
  },
  {
    id: "who-it-is-for",
    title: "First Customer",
    heading: "Start with the people doing the assessment.",
    status: "Customer hypothesis",
    intro:
      "Engineering and multidisciplinary architecture, engineering and construction firms working with damaged or existing buildings.",
    items: [
      {
        label: "Possible user",
        text: "A structural engineer or building-assessment team.",
      },
      {
        label: "Possible buyer",
        text: "The engineering firm, owner, developer or public asset owner. I do not know which yet.",
      },
      {
        label: "A place to learn",
        text: "Ukrainian reconstruction projects may be an early use case. Access to firms and cases still needs to be built.",
      },
    ],
    layout: "notes",
    note: "Ukraine could be a starting point. The underlying problem is global.",
    sources: ["harvard", "rethink"],
    type: "statement",
  },
  {
    id: "value-creation",
    title: "Why It Might Create Value",
    heading: "Less sorting. Better questions?",
    status: "Value hypotheses",
    intro:
      "I want to find out whether a structured first draft is more useful than another folder of photographs.",
    items: [
      {
        label: "Time",
        text: "Could it reduce the work needed to organise inspection evidence?",
      },
      {
        label: "Traceability",
        text: "Could linking observations to images make them easier to check?",
      },
      {
        label: "Retention",
        text: "Could earlier documentation help people investigate what might still be useful?",
      },
    ],
    layout: "notes",
    note: "The test is whether engineers find it useful—not whether the output looks impressive.",
    sources: [],
    type: "statement",
  },
  {
    id: "alternatives",
    title: "Competition / Landscape",
    heading: "I am not starting in an empty field.",
    status: "Landscape · based on published descriptions",
    intro:
      "These groups overlap. They are a way to organise my research, not hard boundaries.",
    items: [
      {
        label: "AI / digital inspection",
        text: "StructurAI · field findings and report drafting\nInspectech · images, BIM and 3D inspection\nInstaBud · property photos to condition/claims reports",
      },
      {
        label: "Circular construction / material intelligence",
        text: "ZIRKULAR-X · AI-supported building inventories\nImperfect · material passports and reuse workflows\nETH Zurich · research on circular construction",
      },
    ],
    layout: "landscape",
    note: "My question between them: given what happened to this building, what can remain? I still need to test whether there is a useful gap.",
    sources: [
      "structurai",
      "inspectech",
      "instabud",
      "zirkular",
      "imperfect",
      "eth",
    ],
    type: "statement",
  },
  {
    id: "technology",
    title: "Technology",
    heading: "Test two paths. Start with the simpler one.",
    status: "Technology hypotheses",
    intro:
      "Use existing multimodal models first. Training my own model is not the first experiment.",
    items: [
      {
        label: "AI-first",
        text: "Photos → existing multimodal model → structured observations. My starting hypothesis: cheaper to test.",
      },
      {
        label: "Geometry-first",
        text: "Photos / video → spatial or 3D representation → elements → AI review. Worth exploring if spatial context proves essential.",
      },
    ],
    layout: "technology",
    note: "Later, engineer corrections could become verified observations and a specialised dataset. A specialised model would come only if it is justified.",
    sources: ["vtt", "inspectech"],
    type: "statement",
  },
  {
    id: "business-model",
    title: "Business Model Hypotheses",
    heading: "Who pays—and for what?",
    status: "Open question",
    intro:
      "I do not know the business model yet. These are options to investigate, not prices or offers.",
    items: [
      {
        label: "Subscription",
        text: "Software for engineering firms, if the work is frequent enough.",
      },
      {
        label: "Per project",
        text: "A fee tied to a specific documentation workflow.",
      },
      {
        label: "Portfolio licence",
        text: "An option for organisations reviewing many buildings.",
      },
      {
        label: "Later possibilities",
        text: "Services or data around recovery and reuse—if useful, and with permission.",
      },
    ],
    layout: "grid",
    note: "First find a useful job to do. Then find out who values it enough to pay.",
    sources: [],
    type: "statement",
  },
  {
    id: "market",
    title: "Market / Where This Could Go",
    heading: "Start narrow. Learn before expanding.",
    status: "Possible market progression",
    intro:
      "A possible starting point is Ukrainian reconstruction. It is not the limit of the idea.",
    items: [
      {
        label: "First place to test",
        text: "Engineering / AEC firms assessing damaged buildings, including Ukrainian reconstruction projects.",
      },
      {
        label: "Adjacent work",
        text: "Existing-building condition assessment, post-disaster work, major renovation and adaptive reuse.",
      },
      {
        label: "Broader possibilities",
        text: "Deconstruction, circular construction and building-portfolio assessment.",
      },
    ],
    layout: "flow",
    note: "These are possible directions, not markets Remainable already serves.",
    sources: [],
    type: "statement",
  },
  {
    id: "why-us",
    title: "Why Me?",
    heading: "Perspective first. Expertise to build.",
    status: "Sole founder · still learning",
    intro:
      "I’m Sonya. I’m 18 and in my first year of Architectural Engineering at Waterloo.",
    items: [
      {
        label: "Buildings + business",
        text: "My studies bring architecture and engineering together. I’m curious about how a useful idea becomes a business.",
      },
      {
        label: "Canada + Ukraine",
        text: "I speak Ukrainian and lived in Ukraine. I hope to build connections with reconstruction practitioners and with Canada’s engineering and startup community.",
      },
    ],
    layout: "notes",
    note: "It seems wasteful to throw away buildings and materials that might still be useful. Today my advantage is mostly perspective. Expertise, partnerships and data still need to be built.",
    sources: [],
    type: "statement",
  },
  {
    id: "team",
    title: "Building the Team",
    heading: "Current team size: one.",
    status: "People I hope to find",
    intro:
      "I can bring the starting question. I need people who know much more than I do.",
    items: [
      {
        label: "What I have",
        text: "Architectural Engineering studies\nBusiness curiosity\nA Canada / Ukraine connection\nA lot of questions",
      },
      {
        label: "What I need",
        text: "Structural-engineering advisers\nAn AI / software collaborator or co-founder\nCircular-construction practitioners\nPartners with legitimate access to real cases",
      },
    ],
    layout: "pair",
    note: "These roles are not filled. No customers, pilots or partnerships are being claimed.",
    sources: [],
    type: "statement",
  },
  {
    id: "validation",
    title: "What We Don’t Know Yet",
    heading: "The questions are the work.",
    status: "Not yet validated",
    intro:
      "Remainable is mostly hypotheses. These are the ones that could change the direction.",
    items: [
      {
        label: "Customer",
        text: "Is processing inspection photos a real pain?",
      },
      {
        label: "Value",
        text: "What information would actually help an engineer?",
      },
      {
        label: "Technology",
        text: "What can current AI identify reliably?",
      },
      {
        label: "Limits",
        text: "What cannot be determined from photographs alone?",
      },
      {
        label: "Circularity",
        text: "When are retention and reuse decisions made?",
      },
      {
        label: "Buyer",
        text: "Would a firm, owner, developer, municipality or insurer pay?",
      },
      {
        label: "Data",
        text: "Can I get legitimate access to enough real assessment cases?",
      },
    ],
    layout: "grid",
    note: "",
    sources: [],
    type: "statement",
  },
  {
    id: "roadmap",
    title: "Experiments / Next Steps",
    heading: "Test two. Choose one.",
    status: "Planned experiments · no dates promised",
    intro:
      "Compare small alternatives, then follow what the evidence supports.",
    items: [
      {
        label: "Listen",
        text: "Interview structural engineers in Ukraine and abroad, architects, circular-construction practitioners and reconstruction teams.",
      },
      {
        label: "Compare",
        text: "With permission, use a small set of real photographs. Compare existing AI observations with professional observations. Record misses and mistakes.",
      },
      {
        label: "Choose",
        text: "Compare AI-first with geometry-first. Test one tiny workflow with engineers. Keep it only if it helps.",
      },
    ],
    layout: "flow",
    note: "My next ask: conversations with practitioners, a technical collaborator and permission to learn from real cases.",
    sources: [],
    type: "statement",
  },
  {
    id: "vision",
    title: "Vision",
    heading:
      "Before we demolish a building, we should know what we are throwing away.",
    status: "Long-term idea",
    intro:
      "Not every building can—or should—remain. But I want to understand what still has useful value.",
    items: [
      {
        label: "Building",
        text: "Can it remain?",
      },
      {
        label: "Structure",
        text: "What can be retained or strengthened?",
      },
      {
        label: "Components",
        text: "What can be reused?",
      },
      {
        label: "Materials",
        text: "What can be recovered or recycled?",
      },
      {
        label: "Waste",
        text: "What actually has to be discarded?",
      },
    ],
    layout: "hierarchy",
    note: "Retain or recover what is technically and economically reasonable. Sometimes the answer will be nothing.",
    sources: [],
    type: "diagram",
  },
  {
    id: "sources",
    title: "Sources / Research",
    heading: "What I’m learning from.",
    status: "Research notes",
    intro:
      "These sources explain the landscape. They do not prove that Remainable works, that customers want it, or that its proposed gap is unique.",
    items: [],
    layout: "research",
    note: "Company capabilities are their own descriptions, not independent performance tests. Links reviewed 13 September 2026.",
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
    type: "statement",
  },
];

export const technologyPlan = {
  decisions: [
    "First experiment: compare model observations with an engineer’s observations on the same authorised photographs.",
    "Decision rule: explore geometry if engineers find that relationships between elements cannot be understood well enough from photos alone.",
  ],
  stack: [
    {
      label: "Frontend · exists",
      text: "The current Remainable web application. Uploaded photos are not analysed.",
    },
    {
      label: "Backend · proposed",
      text: "A conventional web API and database.",
    },
    {
      label: "AI · to test",
      text: "Existing multimodal foundation models, with professional review.",
    },
    {
      label: "Data · proposed",
      text: "Buildings → elements → observations → original evidence.",
    },
    {
      label: "Knowledge · proposed",
      text: "Engineering references and circular-construction / reuse guidance selected with advisers.",
    },
  ],
} as const;

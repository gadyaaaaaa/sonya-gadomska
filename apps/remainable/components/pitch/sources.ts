// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
export const researchSources = [
  {
    id: "harvard",
    publisher: "Harvard Design Magazine",
    title:
      "Ukraine in Times of War: Reconstruction as Strategy, Tactics, and Practice",
    url: "https://www.harvarddesignmagazine.org/articles/ukraine-in-times-of-war-reconstruction-as-strategy-tactics-and-practice/",
    note: "Practitioner discussion of reconstruction and adaptive reuse. Context, not evidence of demand for Remainable.",
  },
  {
    id: "rethink",
    publisher: "ReThink · Helvetas · Skat",
    title: "Circular Rebuilding of Ukraine · Volume II",
    url: "https://www.helvetas.org/Publications-PDFs/Eastern-Europe-Caucasus/Ukraine/Social%20Housing%20Reform%20in%20Ukraine/Vol%20II%20ReThink%20Deep-Dive%20into%20Circular%20Construction%20Details%20Opinions%20in%20Ukraine%20Booklet%20Skat%20%20.pdf",
    note: "December 2023. Practices, barriers and interviews about circular reconstruction in Ukraine. Historical context.",
  },
  {
    id: "vtt",
    publisher: "VTT",
    title: "AI unlocks buildings’ material stocks for circular construction",
    url: "https://www.vttresearch.com/en/project_news/ai-unlocks-buildings-material-stocks-circular-construction",
    note: "March 2026. A research demo extracts material information from drawings, geometry and archives. It does not validate damage assessment from photos.",
  },
  {
    id: "eth",
    publisher: "ETH Zurich",
    title: "Circular Engineering for Architecture · Research",
    url: "https://cea.ibi.ethz.ch/research.html",
    note: "Research into reuse inventories, material passports, deconstruction and design with reclaimed components.",
  },
  {
    id: "structurai",
    publisher: "StructurAI",
    title: "Structural inspection and investigation tools",
    url: "https://www.structurai.com/",
    note: "Company description: field findings, photos linked to drawings and report drafting. Not independently tested here.",
  },
  {
    id: "inspectech",
    publisher: "Inspectech",
    title: "Inspection Intelligence Platform",
    url: "https://www.inspectech.ai/",
    note: "Company description: image/BIM comparison and damage mapped to 3D models. Not independently tested here.",
  },
  {
    id: "instabud",
    publisher: "InstaBud",
    title: "Property photos to reports",
    url: "https://www.instabud.ai/",
    note: "Company description: photo-referenced property condition and claims reports. Adjacent to structural inspection; not independently tested here.",
  },
  {
    id: "zirkular",
    publisher: "ZIRKULAR-X",
    title: "Circular economy in construction",
    url: "https://zirkular-x.tech/en/",
    note: "Research project developing AI-supported building inventories, material data and reuse assessment.",
  },
  {
    id: "imperfect",
    publisher: "Imperfect",
    title: "Circular intelligence and digital material passports",
    url: "https://www.imperfect.city/",
    note: "Company description: material inventories, passports and reuse/deconstruction workflows. Not independently tested here.",
  },
] as const;
export type SourceId = (typeof researchSources)[number]["id"];

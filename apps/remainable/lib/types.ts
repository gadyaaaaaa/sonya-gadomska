// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { z } from "zod";
export const uses = [
  "residential",
  "office",
  "school",
  "hospital",
  "industrial",
  "commercial",
  "infrastructure/other",
] as const;
export const systems = [
  "unknown",
  "masonry",
  "reinforced concrete frame",
  "reinforced concrete panel",
  "steel frame",
  "timber",
  "mixed",
] as const;
export const incidents = [
  "unknown",
  "explosion/blast",
  "missile/drone strike",
  "fire",
  "earthquake",
  "flood",
  "structural accident",
  "other",
] as const;
export const categories = [
  "unknown",
  "exterior",
  "interior",
  "roof",
  "basement",
  "structural element",
] as const;
const optionalNumber = (max: number) =>
  z
    .string()
    .refine(
      (v) =>
        v === "" ||
        (/^\d+(\.\d+)?$/.test(v) && Number(v) > 0 && Number(v) <= max),
      `Enter a positive number up to ${max}, or leave blank.`,
    );
export const buildingSchema = z.object({
  projectName: z.string().trim().min(2, "Enter a project name.").max(120),
  address: z.string().trim().min(2, "Enter a location.").max(240),
  country: z.string().trim().min(2, "Enter a country.").max(80),
  buildingUse: z.enum(uses),
  constructionYear: optionalNumber(new Date().getFullYear()),
  floors: z
    .string()
    .regex(/^\d+$/, "Enter the number of floors.")
    .refine((v) => Number(v) >= 1 && Number(v) <= 200, "Enter 1–200 floors."),
  area: optionalNumber(10000000),
  structuralSystem: z.enum(systems),
  incidentType: z.enum(incidents),
  incidentDate: z
    .string()
    .refine(
      (v) =>
        !v ||
        (!Number.isNaN(Date.parse(v)) &&
          v <= new Date().toISOString().slice(0, 10)),
      "Use a valid date that is not in the future.",
    ),
  notes: z.string().max(4000),
  acknowledged: z
    .boolean()
    .refine(Boolean, "Please acknowledge the tool’s limitations."),
});
export type Building = z.infer<typeof buildingSchema>;
export type Photo = {
  id: string;
  src: string;
  filename: string;
  category: (typeof categories)[number];
  note: string;
  isSample: boolean;
  addedAt: string;
};
export type Observation = {
  imageId: string;
  component: string;
  damageType: string;
  severityVisual: "minor" | "moderate" | "severe" | "indeterminate";
  description: string;
  location: string;
  confidence: number | null;
  requiresEngineerAttention: boolean;
};
export type Followup = {
  id: string;
  what: string;
  why: string;
  angle: string;
  safety: string;
  relatedImage?: string;
  category: (typeof categories)[number];
};
export type Screening = {
  version: number;
  createdAt: string;
  photoIds: string[];
  mode: "fictional-example" | "documentation-only";
  status: "additional_evidence_recommended" | "seriously_insufficient_evidence";
  priority: "high" | null;
  summary: string;
  observations: Observation[];
  concerns: string[];
  nonStructural: string[];
  missing: string[];
  followups: Followup[];
  actions: string[];
  limitations: string[];
  changes: string[];
};
export type Assessment = {
  id: string;
  createdAt: string;
  updatedAt: string;
  building: Building;
  photos: Photo[];
  archivedPhotos?: Photo[];
  versions: Screening[];
  sample: boolean;
};

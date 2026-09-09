// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
export const COPYRIGHT = "© 2026 Sonya Gadomska. All rights reserved.";
export const DISCLAIMER =
  "This report is based solely on information and photographs supplied to Remainable. It is a preliminary documentation and triage aid. It is not a structural engineering assessment, certification, occupancy determination, or statement that the building is safe or unsafe. Decisions concerning structural integrity, access, occupancy, repair, stabilization, or demolition must be made by appropriately qualified professionals.";
export const ACCESS_GUIDANCE =
  "Do not enter or approach a building that has not been cleared for access. Follow local emergency procedures and instructions from qualified authorities or engineers.";
export const ENTRY_RESPONSE =
  "Remainable cannot determine whether a damaged building is safe to enter. Follow local emergency procedures and instructions from qualified authorities or engineers.";
export const PROFESSIONAL_ACTION =
  "Prompt assessment by a qualified structural engineer is recommended. Follow applicable emergency and site-access procedures.";
export const PRIORITIES = {
  routine:
    "No major visual concern identified from supplied evidence. Professional assessment may still be required.",
  elevated: "Visible conditions warrant engineering review.",
  high: "Significant visible damage or important uncertainty requires prompt engineering assessment.",
  urgent:
    "Visible conditions may indicate serious damage. Immediate professional assessment and appropriate site-control procedures are recommended.",
} as const;
// Defense in depth for a future provider; never a substitute for professional review.
export function hasProhibitedConclusion(text: string): boolean {
  return /\b(structurally (?:safe|sound|compromised)|safe (?:to enter|for occupancy)|(?:can|may) be (?:occupied|saved)|(?:must|should) be demolished|load[- ]bearing capacity|certified safe)\b/i.test(
    text,
  );
}

# Remainable

**Document the damage. Know what to inspect next.**

Author and copyright owner: **Sonya Gadomska**. © 2026 Sonya Gadomska. All rights reserved.

Remainable helps collect building information and photographs, identify evidence gaps, and prepare a preliminary documentation package for a qualified engineer. It does not decide whether a building can be saved.

## Phase 1: complete local demonstration

- Architectural landing page, structured building form and required acknowledgment.
- Up to 30 JPEG, PNG or WebP images, thumbnails, stable internal IDs, notes, categories and deletion.
- Browser-local persistence with IndexedDB. Reload and return through the saved-assessment list.
- A fictional five-storey residential building with three clearly labeled original schematic illustrations.
- Fictional observations, possible concerns, missing-evidence requests and professional actions.
- Evidence viewer with numbered observation cards; no fabricated bounding boxes or confidence values.
- Follow-up uploads, explicit change summaries and immutable prior screening versions. Removed evidence remains available to prior reports until the whole assessment is deleted.
- Printable HTML report, photo appendix and browser **Print / Save PDF** export.
- Responsive layouts, loading/error states and accessibility labels.

**No AI, Supabase connection or authentication is enabled in this milestone.** Actual uploaded photographs receive a documentation-only report, no invented damage findings and no assigned priority. Fictional findings apply only to the labeled example illustrations. Follow-up prompts are general demonstration checklists; they do not infer missing views from uploaded photos.

## Run locally

Node.js 20.9+ and npm are required.

```sh
cd apps/remainable
npm install
npm run dev
```

Open the local URL shown by Next.js. No API key or account is required.

Start an assessment → fill in building details (or use the fictional example) → acknowledge limitations → upload images → prepare screening → review evidence gaps → upload additional images → prepare a new version → open the report → Print / Save PDF.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Tests cover unreviewed real uploads, isolation of fictional observations, acknowledgment and bounds validation, revision preservation, actual image upload, evidence viewing, historical reports, and mobile route overflow.

## Architecture

Next.js App Router, TypeScript, Tailwind CSS, React Hook Form and Zod. Phase 1 is a static export with client-side IndexedDB; the static bundle is in `out/` after building.

- `app/`: landing, new assessment, assessment workspace and printable report routes.
- `components/`: form, uploads/results, evidence viewer, report and local persistence loading.
- `lib/types.ts`: validation and domain types.
- `lib/demo.ts`: deterministic fictional fixtures and documentation-only screening.
- `lib/store.ts`: local IndexedDB repository.
- `lib/photos.ts`: decoding, format/size validation and browser-side image copies.
- `lib/policy.ts`: disclaimers, prohibited-conclusion detection and access guidance.
- `lib/ai/`: future provider interface and separate prompt policy files; not invoked.
- `public/demo/`: original fictional engineering schematics, never presented as site photographs.

## What Remainable does not do

It does not authorize entry, assess structural safety, certify occupancy, determine repairability or demolition, calculate structural capacity, diagnose hidden conditions, or replace a qualified professional. Review priority is not a safety classification. Visual severity is not engineering significance.

## Data and current limitations

Data stays in this browser and is not shared across devices. Browser storage is not a permanent archive: clearing site data, private browsing, storage limits or deleting an assessment may remove it. Export reports and retain original evidence separately. Photo copies are resized to at most 1800 pixels on the longer edge and JPEG-encoded; originals are neither retained nor changed by the application. Embedded image metadata is not carried into these copies.

The original fictional building is not a real address or disaster site. No actual damage recognition occurs. Native image-quality scores, model confidence, cloud storage, account recovery, professional sign-off and server PDF generation belong to later milestones.

## Phase 2 configuration (not active)

`.env.example` documents the future environment keys:

- `OPENAI_API_KEY`: server only.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: public Supabase connection values; security must be enforced by database/storage policies.
- `SUPABASE_SERVICE_ROLE_KEY`: server only; never include it in client bundles.

Before enabling real analysis: add authenticated Supabase users, private storage and ownership policies; implement migrations for assessments, evidence, per-image analyses and versioned summaries; add server-only OpenAI per-image analysis and building synthesis with strict structured response validation. Obtain approval for API credentials and upload processing before live integration. Do not ship keys in static output. Switching to server endpoints requires removing `output: 'export'` and deploying a supported Next.js server runtime.

## Deployment and rollback

The first milestone produces a portable static `out/` directory. Publish only those files to an isolated document root, with all routes and `_next` assets intact. Keep trailing-slash routes enabled. Do not copy source, `.env`, `node_modules` or credentials into a public directory.

Live Phase 1 demo: https://remainable.hrnftr.com — deployed on 9 September 2026 from application commit `88393ca5a4b1d5a1f7116c5bfd119bc4bc68c2a7`. HTTPS and all application routes were verified. Real AI and cloud storage remain disabled. See `docs/DEPLOYMENT.md` for release checks and rollback.

Before release, archive the existing target directory and record the release commit. Roll back by restoring that archive (including hidden files) or rebuilding a prior commit. Browser-local data and application source are separate; do not wipe storage during a routine rollback.

## Ownership

Original application code, design, documentation and demo illustrations: Sonya Gadomska. See `LICENSE`. Third-party dependencies retain their own licenses; user-supplied content is not claimed as application copyright. Sonya is credited as the application author, not as the reviewing structural engineer.

# Remainable working pitch

Copyright (c) 2026 Sonya Gadomska. All rights reserved.

Route: `/pitch/`, linked from the desktop and mobile menu. The first content version has 19 slides, from “What can remain?” to the research notes. The original navigation, presentation controls, keyboard handling and site palette are retained.

## Editing the story

`slides.ts` holds ordered slide data: stable `id`, menu `title`, display `heading`, `status`, `intro`, labelled `items`, `layout`, `note` and source IDs. Move an entry to reorder it; numbering, contents and progress follow automatically. Keep IDs stable so existing links continue to work. The old `#ask` link maps to `#roadmap`, which includes the next ask. The proposed technical stack and experiment criteria are also data in this file.

`pitch-slide.tsx` keeps the common slide frame. `slide-content.tsx` renders reusable content layouts and optional hierarchy/workflow/path-selection controls. `pitch-deck.tsx` handles navigation. `pitch.module.css` extends the original frame without new dependencies. Existing placeholder and image components remain available for later slides.

Source records live in `sources.ts`. Relevant slides have collapsible source links; the final research slide lists all nine with context. Company product descriptions are attributed and are not treated as independently tested capabilities. Research does not validate Remainable's customer demand or technical approach.

All core text is visible without interacting. Selecting a hierarchy level highlights a conceptual drawing; selecting a workflow step highlights its explanation; selecting a technology path changes the experiment annotation. Sources and the proposed stack expand on demand. Interactive controls retain their own keyboard behavior. Reduced-motion settings and natural mobile scrolling are preserved.

## Editorial boundaries

Sonya is the sole founder and a first-year student, not a qualified structural engineer. Customer pain, buyer, value, AI feasibility, competitive gap, business model and possible markets remain hypotheses. The current app does not analyse uploaded images. AI/backend features are proposed, not enabled. No customers, advisers, pilots, partners, revenue, prices, market-size figures or performance metrics are invented. Ukraine is a possible learning environment within a global problem.

Source links were reviewed on 13 September 2026. The ReThink / Helvetas / Skat PDF is a December 2023 publication, not a current market measurement. No unverified numerical or model-performance claims are used.

## Validation and rollback

Lint, typecheck, production export and eight unit tests pass. Eight pitch browser scenarios cover all 19 slides at 1440, 820, 390 and 320px, navigation, source links, presentation mode, reduced/normal motion, controls and the old ask link. Screenshots were visually reviewed. The assessment code is unchanged; its previously documented full-suite reload failure is outside this change.

Pre-content source: `0c5f24e55d4f12d8899a6db3f7fa34e54b5f35b8`. Revert the content commit to return to the placeholder deck. The corresponding pre-content hosting backup is `/home/dls0/deploy-backups/remainable-pitch-content-20260913/www-before.tar.gz`.

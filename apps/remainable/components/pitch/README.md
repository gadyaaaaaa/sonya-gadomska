# Remainable short pitch

Copyright (c) 2026 Sonya Gadomska. All rights reserved.

Route: `/pitch/`, linked from the desktop and mobile menu. Ten slides follow the supplied short-pitch brief: Remainable, Idea, Problem, Solution, Why Now, Customer & Market, Competition, Technology, Founder & Team, Next Steps.

The existing visual design, CSS, keyboard controls, scroll behavior, presentation mode, progress indicator and numbering system are unchanged. Content uses the existing slide layouts. Repeated draft/status labels and the detailed technology implementation panel have been removed.

## Editing

`slides.ts` holds the ordered story: stable ID, menu title, display heading, intro, labelled items, layout and note. Moving entries changes numbering and navigation automatically. `pitchHashAliases` directs shared links for removed/merged slides to the relevant current slide.

All nine research records and links remain in `sources.ts`. Relevant slides retain expandable sources. Next Steps includes the full research notes in its expandable Sources area; research is no longer a numbered slide. `/pitch/#sources` opens that area on the final slide. The pitch ends on Next Steps, 10 / 10.

Reusable drawing, hierarchy, workflow and source renderers remain in `slide-content.tsx`. The technology content now uses the existing flow layout rather than the longer comparison/implementation panel.

## Validation and rollback

Main story copy reduced from approximately 1,423 to 418 words (excluding research notes and repeated page chrome); 19 numbered sections reduced to 10. User-supplied wording is preserved, with the engineer-final-word line in the prominent supporting position on Solution.

Lint, typecheck, production build and eight unit tests pass. Nine pitch browser scenarios verify all ten slides at desktop, tablet and mobile widths, keyboard/presentation controls, numbering, links to merged slides, retained optional controls, and all nine source links. Expanded sources are checked for overflow on mobile. Desktop and mobile screenshots were reviewed.

Pre-shortening commit: `6b51cff03f5a124d692261ae7da0fb5869e64bba`. Revert the shortening commit to restore the 19-slide content. Hosting backup: `/home/dls0/deploy-backups/remainable-short-pitch-20260913/www-before.tar.gz`.

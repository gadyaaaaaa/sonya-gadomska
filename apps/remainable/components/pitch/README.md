# Pitch deck framework

Copyright (c) 2026 Sonya Gadomska. All rights reserved.

Route: `/pitch/`. This page deliberately contains only working titles and neutral placeholders. It is not linked from the main navigation.

## Editing slides

Edit `slides.ts`. Each entry has a stable `id` (the URL hash), `title`, `type`, and `placeholders`. Array order determines slide numbering, dropdown order, next/previous navigation, and progress. Add or remove an entry to change the slide count. Move an entry to reorder it. Keep IDs unique and unchanged when renaming a title so saved links continue to work.

Example: `/pitch/#problem`, `/pitch/#insight`, `/pitch/#solution`.

`pitch-deck.tsx` handles navigation and presentation mode. `pitch-slide.tsx` contains slide layout, Placeholder, SlideContent and responsive PitchImage components. Styles are scoped in `pitch.module.css`; colors and fonts come from the existing site.

To introduce a real interactive slide later, create its own component and pass it through the optional `content` map on PitchDeck, keyed by slide ID. Add `data-pitch-interactive` to custom interactive regions that need to own their arrow keys. Form controls, links, buttons and common interactive roles already retain their keyboard behavior. No calculators, charts, evidence or claims have been added.

Desktop slides use a minimum viewport height and gentle scroll snapping. Mobile uses natural content height and ordinary scrolling. Arrows, Home and End navigate when focus is outside interactive controls. Slide headings receive focus on keyboard/button navigation. Use the contents selector to jump to any slide. Presentation mode hides the existing header/footer without using fullscreen; Exit or Escape restores them. Reduced-motion preferences disable smooth transitions and snapping.

Validation: lint, typecheck, unit tests, production build, and `tests/e2e/pitch.spec.ts` (desktop/tablet/mobile, deep links, hash/history, keyboard, presentation mode and scrolling).

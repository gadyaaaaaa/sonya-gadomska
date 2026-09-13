// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, Maximize2, Minimize2 } from "lucide-react";
import { PitchSlide } from "./pitch-slide";
import type { PitchSlideData } from "./slides";
import styles from "./pitch.module.css";

export function PitchDeck({
  slides,
  content = {},
}: {
  slides: readonly PitchSlideData[];
  /** Optional modular renderers, keyed by the stable slide ID. */
  content?: Readonly<Record<string, ReactNode>>;
}) {
  const [active, setActive] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const activeRef = useRef(0);
  const toolbar = useRef<HTMLElement>(null);
  const navigationTarget = useRef<number | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateActive = useCallback(
    (index: number) => {
      activeRef.current = index;
      setActive(index);
      const hash = `#${slides[index].id}`;
      if (window.location.hash !== hash)
        window.history.replaceState(window.history.state, "", hash);
    },
    [slides],
  );

  const goTo = useCallback(
    (index: number, focus = false, instant = false) => {
      if (!slides.length) return;
      const next = Math.max(0, Math.min(slides.length - 1, index));
      const section = document.getElementById(slides[next].id);
      if (!section) return;
      navigationTarget.current = next;
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      const distance = Math.abs(next - activeRef.current);
      updateActive(next);
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const immediate = instant || reducedMotion || distance > 1;
      section.scrollIntoView({
        block: "start",
        behavior: immediate ? "instant" : "smooth",
      });
      if (focus)
        document
          .getElementById(`${slides[next].id}-title`)
          ?.focus({ preventScroll: true });
      navigationTimer.current = setTimeout(
        () => {
          navigationTarget.current = null;
        },
        immediate ? 60 : 900,
      );
    },
    [slides, updateActive],
  );

  useEffect(() => {
    if (!slides.length) return;
    const fromHash = (initial = false) => {
      const index = slides.findIndex(
        (slide) => `#${slide.id}` === window.location.hash,
      );
      if (index >= 0) goTo(index, false, true);
      else if (initial) goTo(0, false, true);
    };
    let frame = requestAnimationFrame(() => fromHash(true));
    const hashChanged = () => fromHash();
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (navigationTarget.current !== null) return;
        const line =
          (toolbar.current?.getBoundingClientRect().height ?? 80) + 100;
        let index = 0;
        slides.forEach((slide, i) => {
          if (
            (document.getElementById(slide.id)?.getBoundingClientRect().top ??
              Infinity) <= line
          )
            index = i;
        });
        updateActive(index);
      });
    };
    const releaseNavigation = () => {
      navigationTarget.current = null;
    };
    const onKey = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;
      if (event.key === "Escape") {
        setPresenting(false);
        return;
      }
      const target = event.target as HTMLElement;
      if (
        target.closest(
          "input, textarea, select, button, a, summary, [contenteditable], [role='slider'], [role='tablist'], [role='grid'], [data-pitch-interactive]",
        )
      )
        return;
      const offset = {
        ArrowDown: 1,
        ArrowRight: 1,
        ArrowUp: -1,
        ArrowLeft: -1,
      }[event.key];
      if (offset !== undefined || event.key === "Home" || event.key === "End") {
        event.preventDefault();
        goTo(
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? slides.length - 1
              : activeRef.current + (offset ?? 0),
          true,
        );
      }
    };
    window.addEventListener("hashchange", hashChanged);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", releaseNavigation, { passive: true });
    window.addEventListener("touchstart", releaseNavigation, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      window.removeEventListener("hashchange", hashChanged);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", releaseNavigation);
      window.removeEventListener("touchstart", releaseNavigation);
      window.removeEventListener("keydown", onKey);
    };
  }, [slides, goTo, updateActive]);

  if (!slides.length)
    return (
      <main id="main">
        <p>No slides defined.</p>
      </main>
    );
  return (
    <main id="main" className={styles.deck} data-presentation={presenting}>
      <nav
        ref={toolbar}
        className={styles.toolbar}
        aria-label="Pitch deck navigation"
      >
        <div className={styles.deckLabel}>
          Pitch Deck<span>WORKING DRAFT</span>
        </div>
        <label className={styles.contents}>
          <span className={styles.srOnly}>Go to slide</span>
          <select
            value={slides[active]?.id ?? slides[0].id}
            onChange={(event) =>
              goTo(slides.findIndex((slide) => slide.id === event.target.value))
            }
          >
            {slides.map((slide, i) => (
              <option key={slide.id} value={slide.id}>
                {String(i + 1).padStart(2, "0")} / {slide.title}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.controls}>
          <span
            className={styles.counter}
            aria-live="polite"
            aria-atomic="true"
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={active === 0}
            onClick={() => goTo(active - 1, true)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={active === slides.length - 1}
            onClick={() => goTo(active + 1, true)}
          >
            <ArrowRight size={18} />
          </button>
          <button
            type="button"
            className={styles.modeButton}
            aria-label={
              presenting ? "Exit presentation mode" : "Enter presentation mode"
            }
            aria-pressed={presenting}
            onClick={() => {
              setPresenting((value) => !value);
              requestAnimationFrame(() => goTo(activeRef.current, false, true));
            }}
          >
            {presenting ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            <span>{presenting ? "Exit" : "Present"}</span>
          </button>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${((active + 1) / slides.length) * 100}%` }} />
        </div>
      </nav>
      <div className={styles.slides}>
        {slides.map((slide, index) => (
          <PitchSlide
            key={slide.id}
            slide={slide}
            index={index}
            total={slides.length}
          >
            {content[slide.id]}
          </PitchSlide>
        ))}
      </div>
    </main>
  );
}

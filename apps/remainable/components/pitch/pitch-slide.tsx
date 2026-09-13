// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";
import type { PitchSlideData } from "./slides";
import { PitchSlideContent, SlideSources } from "./slide-content";
import styles from "./pitch.module.css";

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className={styles.placeholder}>
      <span className={styles.placeholderMark} aria-hidden="true">
        +
      </span>
      <p>{children}</p>
    </div>
  );
}

/** Extension slot for a future slide-specific diagram, comparison or calculator. */
export function SlideContent({ children }: { children: ReactNode }) {
  return <div className={styles.content}>{children}</div>;
}

/** Explicit dimensions/alt text; responsive and lazy by default for future evidence. */
export function PitchImage({
  alt,
  sizes = "(max-width: 760px) 90vw, 48vw",
  ...props
}: ImageProps) {
  return <Image {...props} alt={alt} sizes={sizes} className={styles.image} />;
}

export function PitchSlide({
  slide,
  index,
  total,
  children,
}: {
  slide: PitchSlideData;
  index: number;
  total: number;
  children?: ReactNode;
}) {
  const Heading = index === 0 ? "h1" : "h2";
  return (
    <section
      id={slide.id}
      className={styles.slide}
      data-type={slide.type}
      data-layout={slide.layout}
      data-populated={Boolean(slide.heading)}
      aria-labelledby={`${slide.id}-title`}
    >
      <div className={styles.slideMeta}>
        <span>REMAINABLE / PITCH DECK</span>
        <span>EARLY-STAGE EXPLORATION</span>
      </div>
      <div className={styles.slideBody}>
        <header className={styles.slideHeader}>
          <span className={styles.largeNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Heading id={`${slide.id}-title`} tabIndex={-1}>
            {slide.heading ?? slide.title}
          </Heading>
          <p className={styles.status}>
            <span aria-hidden="true" />
            {slide.status ?? "Content pending"}
          </p>
          {slide.intro && <p className={styles.slideIntro}>{slide.intro}</p>}
        </header>
        <SlideContent>
          {children ??
            (slide.items ? (
              <PitchSlideContent slide={slide} />
            ) : (
              slide.placeholders?.map((label, i) => (
                <Placeholder key={`${i}-${label}`}>{label}</Placeholder>
              ))
            ))}
        </SlideContent>
      </div>
      {slide.note && <p className={styles.slideNote}>{slide.note}</p>}
      {slide.layout !== "research" && (
        <SlideSources ids={slide.sources ?? []} />
      )}
      <footer className={styles.slideFooter}>
        <span>WORKING PITCH / OPEN TO EVIDENCE</span>
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </footer>
    </section>
  );
}

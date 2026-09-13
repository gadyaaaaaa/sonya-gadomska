// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";
import type { PitchSlideData } from "./slides";
import { PitchSlideContent, SlideSources } from "./slide-content";
import { photographs } from "./photographs";
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
      data-photo={slide.photograph}
      data-type={slide.type}
      data-layout={slide.layout}
      data-populated={Boolean(slide.heading)}
      aria-labelledby={`${slide.id}-title`}
    >
      <div className={styles.slideMeta}>
        <span>REMAINABLE / PITCH DECK</span>
        <span>{slide.title}</span>
      </div>
      <div className={styles.slideBody}>
        <header className={styles.slideHeader}>
          <span className={styles.largeNumber} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {slide.id === "cover" && <p className={styles.coverBrand}>REMAINABLE</p>}
          <Heading id={`${slide.id}-title`} tabIndex={-1}>
            {slide.heading ?? slide.title}
          </Heading>
          {slide.status && (
            <p className={styles.status}>
              <span aria-hidden="true" />
              {slide.status}
            </p>
          )}
          {slide.intro && <p className={styles.slideIntro}>{slide.intro}</p>}
          {slide.photograph && <div className={styles.photoCopy}><PitchSlideContent slide={slide} /></div>}
        </header>
        {slide.photograph ? <DocumentaryPhoto id={slide.photograph} /> : <SlideContent>
          {children ??
            (slide.items ? (
              <PitchSlideContent slide={slide} />
            ) : (
              slide.placeholders?.map((label, i) => (
                <Placeholder key={`${i}-${label}`}>{label}</Placeholder>
              ))
            ))}
        </SlideContent>}
      </div>
      {slide.note && <p className={styles.slideNote}>{slide.note}</p>}
      {slide.layout !== "research" && (
        <SlideSources
          ids={slide.sources ?? []}
          detailed={slide.sourceDetails}
        />
      )}
      <footer className={styles.slideFooter}>
        <span>REMAINABLE</span>
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </footer>
    </section>
  );
}

function DocumentaryPhoto({ id }: { id: NonNullable<PitchSlideData["photograph"]> }) {
  if (id === "founder") return <figure className={styles.photograph}>
    <Image src="/sonya-gadomska-editorial.jpg" width={900} height={900} alt="Black-and-white portrait of Sonya Gadomska in graduation attire." sizes="(max-width: 760px) 90vw, 45vw" />
    <figcaption>Sonya Gadomska</figcaption>
  </figure>;
  const photo = photographs[id];
  return <figure className={styles.photograph}>
    <Image src={photo.src} width={1600} height={id === "reuse" ? 900 : 1200} alt={photo.alt} loading={id === "damage" ? "eager" : "lazy"} fetchPriority={id === "damage" ? "high" : "auto"} sizes="(max-width: 760px) 90vw, 52vw" />
    <figcaption><span>{photo.caption}</span><span><a href={`/photo-credits.html#${id}`} target="_blank" rel="noopener noreferrer">Photo: {photo.creator}</a></span></figcaption>
  </figure>;
}

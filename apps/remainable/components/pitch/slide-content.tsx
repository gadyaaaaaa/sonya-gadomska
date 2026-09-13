// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";

import { useState } from "react";
import type { PitchSlideData } from "./slides";
import { researchSources, type SourceId } from "./sources";
import styles from "./pitch.module.css";

type Item = NonNullable<PitchSlideData["items"]>[number];

function ResearchLinks({
  ids,
  expanded = false,
}: {
  ids: readonly SourceId[];
  expanded?: boolean;
}) {
  return (
    <ol className={expanded ? styles.researchGrid : styles.sourceList}>
      {ids.map((id) => {
        const index = researchSources.findIndex((source) => source.id === id);
        const source = researchSources[index];
        return (
          <li key={id}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              <span className={styles.sourceNumber}>
                [{String(index + 1).padStart(2, "0")}]
              </span>
              <span>
                <strong>{source.publisher}</strong>
                <span>{source.title} ↗</span>
              </span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
            {expanded && <p>{source.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}
export function SlideSources({
  ids,
  detailed = false,
}: {
  ids: readonly SourceId[];
  detailed?: boolean;
}) {
  if (!ids.length) return null;
  return (
    <details className={styles.sources} id={detailed ? "sources" : undefined}>
      <summary>
        Sources / research{" "}
        <span>
          {ids
            .map(
              (id) =>
                `[${String(researchSources.findIndex((source) => source.id === id) + 1).padStart(2, "0")}]`,
            )
            .join(" ")}
        </span>
      </summary>
      <ResearchLinks ids={ids} expanded={detailed} />
    </details>
  );
}

/** Conceptual line drawing: selection illustrates a question, never a condition assessment. */
function BuildingDrawing({ active = 0 }: { active?: number }) {
  return (
    <svg
      viewBox="0 0 300 250"
      className={styles.buildingDrawing}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M24 214H278M30 223V204M270 223V204M53 210V72L171 31L263 70V209M53 72L150 108L263 70M150 108V210M53 118L150 152L263 115M53 164L150 197L263 160" />
        <path d="M82 83V210M115 96V210M189 95V210M228 82V210" opacity=".35" />
        <path d="M16 40V28H28M272 28H284V40M16 222V234H28M272 234H284V222" />
      </g>
      <g fill="none" stroke="var(--olive)" strokeWidth="3">
        {active === 0 && <path d="M53 210V72L171 31L263 70V209" />}
        {active === 1 && (
          <path d="M53 118L150 152L263 115M53 164L150 197L263 160M150 108V210" />
        )}
        {active === 2 && (
          <path d="M189 95V144L228 131V82M82 83V128L115 140V96" />
        )}
        {active === 3 && <path d="M53 210H263M67 217H249M81 224H235" />}
        {active === 4 && (
          <path d="M110 226L117 232M142 223L150 230M178 226L187 231" />
        )}
      </g>
    </svg>
  );
}

function Hierarchy({ items }: { items: readonly Item[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.hierarchy} data-pitch-interactive>
      <div className={styles.drawingPanel}>
        <BuildingDrawing active={active} />
      </div>
      <ol className={styles.hierarchyList}>
        {items.map((item, index) => (
          <li key={item.label}>
            <button
              type="button"
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span className={styles.itemNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong>{item.label}</strong>
                <span>{item.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Sequence({ items }: { items: readonly Item[] }) {
  const [active, setActive] = useState(0);
  return (
    <ol
      className={styles.sequence}
      data-pitch-interactive
      aria-label="Proposed evidence workflow"
    >
      {items.map((item, index) => (
        <li key={item.label}>
          <button
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <span className={styles.itemNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

export function PitchSlideContent({ slide }: { slide: PitchSlideData }) {
  const items = slide.items ?? [];
  switch (slide.layout) {
    case "hierarchy":
      return <Hierarchy items={items} />;
    case "sequence":
      return <Sequence items={items} />;
    case "research":
      return <ResearchLinks ids={slide.sources ?? []} expanded />;
    case "cover":
      return (
        <div className={styles.coverContent}>
          <div className={styles.coverDrawing}>
            <BuildingDrawing />
          </div>
          {items.map((item) => (
            <div className={styles.noteItem} key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className={styles.itemCollection} data-layout={slide.layout}>
          {items.map((item, index) => (
            <article className={styles.noteItem} key={item.label}>
              {slide.layout === "flow" && (
                <span className={styles.itemNumber}>
                  {String(index + 1).padStart(2, "0")}{" "}
                  <span aria-hidden="true">→</span>
                </span>
              )}
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      );
  }
}

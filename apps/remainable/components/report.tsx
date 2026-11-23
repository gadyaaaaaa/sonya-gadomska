// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { useAssessment } from "./use-assessment";
import { reviewForDisplay } from "@/lib/review-display";
import { COPYRIGHT, DISCLAIMER } from "@/lib/policy";
export function Report() {
  const { assessment: a, error, loading } = useAssessment();
  const params = useSearchParams();
  if (loading) return <p className="loading">Preparing report…</p>;
  const version = params.get("version");
  const stored = version
    ? a?.versions.find((v) => v.version === Number(version))
    : a?.versions.at(-1);
  const r = stored ? reviewForDisplay(stored) : undefined;
  if (!a || !r)
    return (
      <section className="workspace empty-state">
        <h1>Report unavailable</h1>
        <p>
          {error ||
            "Prepare a screening first, or select an existing report version."}
        </p>
        <Link
          href={a ? `/assessment/?id=${a.id}` : "/new/"}
          className="button primary"
        >
          Back to assessment
        </Link>
      </section>
    );
  const building = r.buildingSnapshot ?? a.building;
  const photos =
    r.evidenceSnapshot ??
    Array.from(
      new Map(
        [...(a.archivedPhotos ?? []), ...a.photos].map((p) => [p.id, p]),
      ).values(),
    ).filter((p) => r.photoIds.includes(p.id));
  const list = (items: string[], empty = "Not assessed.") => (
    <ul>
      {(items.length ? items : [empty]).map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  );
  return (
    <>
      <div className="report-toolbar">
        <Link className="text-link" href={`/assessment/?id=${a.id}`}>
          <ArrowLeft size={16} />
          Back to assessment
        </Link>
        <div>
          <span>Choose “Save as PDF” in the print dialog.</span>
          <button className="button primary" onClick={() => window.print()}>
            <Printer size={17} />
            Print / Save PDF
          </button>
        </div>
      </div>
      <article className="report">
        <header className="report-header">
          <p className="wordmark">REMAINABLE</p>
          <p className="eyebrow">
            EVIDENCE PACKAGE / V{r.version.toString().padStart(2, "0")}
          </p>
          <h1>
            Preliminary Damage
            <br />
            Screening Report
          </h1>
          <p>Preliminary documentation and visual review</p>
        </header>
        <aside className="report-demo">
          <strong>
            {r.mode === "fictional-example"
              ? "FICTIONAL EXAMPLE — NOT A SITE ASSESSMENT"
              : r.mode === "muse"
                ? "REMAINABLE VISUAL REVIEW — PRELIMINARY"
                : "DOCUMENTATION ONLY — PHOTOGRAPHS NOT ANALYZED"}
          </strong>
          <p>
            {r.mode === "muse"
              ? `Photographs reviewed by Remainable. Findings require professional verification; this is not a structural safety assessment.`
              : "No AI model has run. Example findings refer only to labeled schematic illustrations, not user-supplied photos."}
          </p>
        </aside>
        <section>
          <h2>01 / Assessment information</h2>
          <dl className="report-info">
            <dt>Project</dt>
            <dd>{building.projectName || "Untitled building review"}</dd>
            <dt>Reference</dt>
            <dd>{a.id.slice(0, 8).toUpperCase()}</dd>
            <dt>Report date</dt>
            <dd>{new Date(r.createdAt).toLocaleString()}</dd>
            <dt>Status</dt>
            <dd>{r.status.replaceAll("_", " ")}</dd>
            <dt>Review priority</dt>
            <dd>
              {r.priority
                ? "High — fictional example, not a safety classification"
                : "Not assigned"}
            </dd>
          </dl>
        </section>
        <section>
          <h2>02 / Building information</h2>
          <dl className="report-info">
            <dt>Location</dt>
            <dd>
              {building.address}, {building.country}
            </dd>
            <dt>Use / floors</dt>
            <dd>
              {building.buildingUse} / {building.floors}
            </dd>
            <dt>Construction year</dt>
            <dd>{building.constructionYear || "Not supplied"}</dd>
            <dt>Approximate area</dt>
            <dd>{building.area ? `${building.area} m²` : "Not supplied"}</dd>
            <dt>Jurisdiction</dt>
            <dd>{building.jurisdiction || "Not supplied"}</dd>
            <dt>Supplied norms (unverified)</dt>
            <dd>{building.buildingNorms || "Not supplied"}</dd>
            <dt>Structural system</dt>
            <dd>{building.structuralSystem}</dd>
          </dl>
        </section>
        <section>
          <h2>03 / Incident</h2>
          <p>
            {building.incidentType} ·{" "}
            {building.incidentDate || "Incident date not supplied"}
          </p>
          {building.notes && <p>{building.notes}</p>}
        </section>
        <section>
          <h2>04 / Submitted evidence</h2>
          <p>
            {r.photoIds.length} evidence items in this version.{" "}
            {photos.filter((p) => p.isSample).length} fictional illustrations;{" "}
            {photos.filter((p) => !p.isSample).length} user-supplied images,
            {r.mode === "muse"
              ? "reviewed by AI, not verified by an engineer."
              : "unreviewed."}
          </p>
          <p>{r.summary}</p>
        </section>
        <section>
          <h2>05 / Key visual observations</h2>
          {r.observations.length ? (
            r.observations.map((o, i) => (
              <div className="report-observation" key={i}>
                <strong>
                  {o.imageId} / {o.component.replaceAll("_", " ")}
                </strong>
                <p>{o.description}</p>
                <p className="fineprint">
                  Visual severity: {o.severityVisual}. Location: {o.location}{" "}
                  {r.mode === "muse"
                    ? "Confidence not independently calibrated."
                    : "Confidence not measured (fictional example)."}{" "}
                  Visible severity is not equivalent to structural significance.
                </p>
              </div>
            ))
          ) : (
            <p>
              No observations have been generated for the supplied photographs.
            </p>
          )}
        </section>
        <section>
          <h2>06 / Possible concerns requiring professional review</h2>
          {list(r.concerns, "No structural conclusions have been made.")}
        </section>
        <section>
          <h2>07 / Missing evidence</h2>
          {list(r.missing)}
        </section>
        <section>
          <h2>08 / Recommended additional documentation</h2>
          {r.followups.map((f) => (
            <div className="report-request" key={f.id}>
              <h3>
                {f.id}: {f.what}
              </h3>
              <p>
                <strong>Why:</strong> {f.why}
              </p>
              <p>
                <strong>View:</strong> {f.angle}
              </p>
              <p>
                <strong>Access:</strong> {f.safety}
              </p>
            </div>
          ))}
        </section>
        <section>
          <h2>09 / Recommended professional actions</h2>
          {list(r.actions)}
        </section>
        <section className="photo-appendix">
          <h2>10 / Photo appendix</h2>
          {photos.map((p, i) => (
            <figure className="report-photo" key={p.id}>
              <img src={p.src} alt={p.filename} />
              <figcaption>
                <strong>
                  {p.isSample ? p.id : `IMG-${String(i + 1).padStart(2, "0")}`}{" "}
                  · {p.filename}
                </strong>
                <p>
                  {p.category} ·{" "}
                  {p.isSample
                    ? "Fictional illustration"
                    : r.mode === "muse"
                      ? "User-supplied photograph — Remainable review"
                      : "User-supplied photograph — not analyzed"}
                </p>
                {p.note && <p>{p.note}</p>}
              </figcaption>
            </figure>
          ))}
        </section>
        <section>
          <h2>11 / Limitations and disclaimer</h2>
          {list(r.limitations)}
          <p className="report-disclaimer">{DISCLAIMER}</p>
        </section>
        <footer className="report-footer">
          <p>Remainable · Experimental engineering technology.</p>
          <p>{COPYRIGHT}</p>
          <p>
            Application author and copyright owner: Sonya Gadomska. Professional
            reviewer: not assigned.
          </p>
        </footer>
      </article>
    </>
  );
}

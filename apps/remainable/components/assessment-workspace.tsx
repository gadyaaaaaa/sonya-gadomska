// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Upload,
  X,
  FileText,
  Plus,
  Eye,
  AlertTriangle,
  ImagePlus,
} from "lucide-react";
import { reviewForDisplay } from "@/lib/review-display";
import { BuildingDetails } from "./building-details";
import { analyzeWithMuse } from "@/lib/ai/muse";
import type { Building } from "@/lib/types";
import { useAssessment } from "./use-assessment";
import { DemoNotice, Steps } from "./shell";
import { saveAssessment } from "@/lib/store";
import { screen, samplePhotos } from "@/lib/demo";
import { MAX_PHOTOS, preparePhoto } from "@/lib/photos";
import {
  categories,
  type Assessment,
  type Photo,
  type Screening,
} from "@/lib/types";
import { ACCESS_GUIDANCE, PRIORITIES } from "@/lib/policy";
export function AssessmentWorkspace() {
  const {
    assessment: a,
    setAssessment,
    setError,
    error,
    loading,
  } = useAssessment();
  const [view, setView] = useState<"photos" | "results" | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState("");
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<Photo | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const queue = useRef(Promise.resolve());
  function persist(next: Assessment) {
    next.updatedAt = new Date().toISOString();
    setAssessment(next);
    queue.current = queue.current
      .catch(() => {})
      .then(() => saveAssessment(next));
    queue.current.catch((e) => setError(e.message));
    return queue.current;
  }
  async function upload(files: FileList | File[] | null) {
    if (!files || !a) return;
    const list = Array.from(files);
    if (a.photos.length + list.length > MAX_PHOTOS) {
      setError(
        `Use at most ${MAX_PHOTOS} images per assessment. You currently have ${a.photos.length}.`,
      );
      return;
    }
    setBusy("Preparing photographs…");
    setError("");
    const added: Photo[] = [];
    const errors: string[] = [];
    for (const file of list) {
      try {
        added.push(await preparePhoto(file));
      } catch (e) {
        errors.push((e as Error).message);
      }
    }
    try {
      if (added.length)
        await persist({ ...a, photos: [...a.photos, ...added] });
      setError(errors.join(" "));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
      if (input.current) input.current.value = "";
    }
  }
  async function review(building?: Building, documentationOnly = false) {
    if (!a || busy) return;
    const real = a.photos.some((p) => !p.isSample);
    if (real && !documentationOnly && !consent) {
      setError(
        "Please agree to send photographs and details to Remainable before running the review.",
      );
      return;
    }
    setBusy("Preparing your review…");
    setError("");
    try {
      await queue.current;
      const next = {
        ...a,
        building: building ?? a.building,
        versions: a.versions.map((v) => ({
          ...v,
          buildingSnapshot: v.buildingSnapshot ?? structuredClone(a.building),
          evidenceSnapshot:
            v.evidenceSnapshot ??
            [...a.photos, ...(a.archivedPhotos ?? [])].filter((p) =>
              v.photoIds.includes(p.id),
            ),
        })),
      };
      // Save newly supplied context even if the provider is unavailable. Keep reports intact.
      if (building) await persist(next);
      const result =
        real && !documentationOnly ? await analyzeWithMuse(next) : screen(next);
      await persist({ ...next, versions: [...next.versions, result] });
      setView("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  }
  if (loading)
    return (
      <p className="loading" role="status">
        Opening assessment…
      </p>
    );
  if (!a)
    return (
      <section className="empty-state">
        <h1>Unable to open this assessment.</h1>
        <p role="alert">{error}</p>
        <Link href="/new/" className="button primary">
          Start an assessment
        </Link>
      </section>
    );
  const latest = a.versions.at(-1);
  const current = latest ? reviewForDisplay(latest) : undefined;
  const mode = view ?? (current ? "results" : "photos");
  const changed =
    !!current &&
    (JSON.stringify(current.buildingSnapshot ?? a.building) !==
      JSON.stringify(a.building) ||
      current.photoIds.length !== a.photos.length ||
      a.photos.some((p) => !current.photoIds.includes(p.id)));
  return (
    <>
      <DemoNotice />
      <Steps
        active={mode === "photos" ? 1 : current && current.version > 1 ? 3 : 2}
      />
      <div className="page-title title-with-action">
        <div>
          <p className="eyebrow">
            {mode === "photos"
              ? "01 / PHOTO EVIDENCE"
              : "02 / PRELIMINARY REVIEW"}
          </p>
          <h1>{a.building.projectName || "Your building review"}</h1>
          <p>
            {[
              a.building.address,
              a.building.floors ? `${a.building.floors} floors` : "",
              a.building.buildingUse !== "unknown"
                ? a.building.buildingUse
                : "",
            ]
              .filter(Boolean)
              .join(" · ") ||
              "Building details can be added after your first result."}
          </p>
        </div>
        {current && (
          <Link className="button secondary" href={`/report/?id=${a.id}`}>
            <FileText size={17} />
            Open report
          </Link>
        )}
      </div>
      <div className="workspace-tabs">
        <button
          className={mode === "photos" ? "active" : ""}
          disabled={!!busy}
          onClick={() => setView("photos")}
        >
          Photo evidence <span>{a.photos.length}</span>
        </button>
        <button
          className={mode === "results" ? "active" : ""}
          disabled={!current || !!busy}
          onClick={() => setView("results")}
        >
          Screening & next steps {current && <span>v{current.version}</span>}
        </button>
      </div>
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {mode === "photos" ? (
        <>
          <div className="upload-layout">
            <section>
              <div
                className={`dropzone ${dragging ? "dragging" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!busy) setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  if (!busy) void upload(e.dataTransfer.files);
                }}
              >
                <Upload size={34} strokeWidth={1} />
                <h2>Add your photographs</h2>
                <p>Drag images here, or choose files from your device.</p>
                <button
                  className="button secondary"
                  disabled={!!busy}
                  onClick={() => input.current?.click()}
                >
                  Choose photographs <Plus size={17} />
                </button>
                <input
                  ref={input}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(e) => void upload(e.target.files)}
                  className="sr-only"
                  aria-label="Upload photographs"
                  disabled={!!busy}
                />
                <small>
                  JPEG, PNG or WebP · up to 30 images · 15 MB per original
                </small>
              </div>
              {!a.photos.length && (
                <button
                  className="text-link add-sample"
                  disabled={!!busy}
                  onClick={() =>
                    void persist({
                      ...a,
                      sample: true,
                      photos: samplePhotos(),
                    }).catch(() => {})
                  }
                >
                  <ImagePlus size={17} />
                  Try three fictional example images
                </button>
              )}
              <p className="fineprint">
                Photos are resized for review. Retain your originals separately.
                Running a Remainable review sends these photos and supplied
                details to its AI service for processing.
              </p>
            </section>
            <aside className="side-note photo-guidance">
              <p className="eyebrow">BETTER EVIDENCE, BETTER QUESTIONS</p>
              <h3>Useful photographs include</h3>
              <ul>
                <li>Full exterior elevations</li>
                <li>Damaged areas from a distance</li>
                <li>Close-ups of cracks or deformation</li>
                <li>Wall-to-slab and beam-to-column connections</li>
                <li>Both sides of a damaged area</li>
                <li>Roof and basement, only where access has been cleared</li>
              </ul>
              <div className="access-note">
                <AlertTriangle size={18} />
                <p>{ACCESS_GUIDANCE}</p>
              </div>
            </aside>
          </div>
          {busy && (
            <p className="loading" role="status">
              {busy}
            </p>
          )}
          <div className="section-title">
            <h2>Evidence register</h2>
            <span className="eyebrow">
              {String(a.photos.length).padStart(2, "0")} / 30 IMAGES
            </span>
          </div>
          {!a.photos.length ? (
            <p className="empty-inline">
              No images yet. Add photographs or try the fictional example above.
            </p>
          ) : (
            <div className="photo-grid">
              {a.photos.map((p, i) => (
                <article className="photo-item" key={p.id}>
                  <button
                    className="photo-open"
                    aria-label={`Open image ${i + 1}: ${p.filename}`}
                    onClick={() => {
                      setSelected(p);
                      dialog.current?.showModal();
                    }}
                  >
                    <img src={p.src} alt={p.filename} />
                    <span className="image-id">
                      {p.isSample
                        ? p.id
                        : `IMG-${String(i + 1).padStart(2, "0")}`}
                    </span>
                    <span className="image-hover">
                      <Eye size={20} />
                      View evidence
                    </span>
                  </button>
                  <div className="photo-meta">
                    <strong title={p.filename}>{p.filename}</strong>
                    <button
                      className="icon-button"
                      disabled={!!busy}
                      aria-label={`Remove ${p.filename}`}
                      onClick={() =>
                        void persist({
                          ...a,
                          photos: a.photos.filter((x) => x.id !== p.id),
                          archivedPhotos: [...(a.archivedPhotos ?? []), p],
                        }).catch(() => {})
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {p.isSample && (
                    <span className="tag">Fictional illustration</span>
                  )}
                  <label className="field compact">
                    <span>Image category</span>
                    <select
                      disabled={!!busy}
                      value={p.category}
                      onChange={(e) =>
                        void persist({
                          ...a,
                          photos: a.photos.map((x) =>
                            x.id === p.id
                              ? {
                                  ...x,
                                  category: e.target.value as Photo["category"],
                                }
                              : x,
                          ),
                        }).catch(() => {})
                      }
                    >
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label className="field compact">
                    <span>Image note (optional)</span>
                    <input
                      disabled={!!busy}
                      maxLength={500}
                      value={p.note}
                      placeholder="Where was this taken?"
                      onChange={(e) =>
                        void persist({
                          ...a,
                          photos: a.photos.map((x) =>
                            x.id === p.id ? { ...x, note: e.target.value } : x,
                          ),
                        }).catch(() => {})
                      }
                    />
                  </label>
                </article>
              ))}
            </div>
          )}
          {a.photos.some((p) => !p.isSample) && (
            <label className="acknowledgment">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />{" "}
              I agree to send these photos and supplied details to Remainable’s
              AI service for a preliminary AI review. This is not a structural
              safety assessment.
            </label>
          )}
          <div className="screen-action">
            <div>
              <strong>
                {current
                  ? "Update the documentation"
                  : "Ready to organize the evidence?"}
              </strong>
              <p>
                {a.sample
                  ? "The demo uses fictional findings associated only with the example illustrations."
                  : "Remainable reviews visible evidence. Add building and jurisdiction details after your first result."}
              </p>
            </div>
            <button
              className="button primary"
              disabled={!a.photos.length || !!busy}
              onClick={() => void review()}
            >
              {busy
                ? "Preparing…"
                : current
                  ? "Update screening"
                  : a.sample
                    ? "Run demo screening"
                    : "Get first result with Remainable"}
              <ArrowRight size={18} />
            </button>
          </div>
          {a.photos.some((p) => !p.isSample) && (
            <button
              className="text-link"
              disabled={!!busy}
              onClick={() => void review(undefined, true)}
            >
              Create a local record without AI
            </button>
          )}
        </>
      ) : (
        current && (
          <>
            {changed && (
              <div className="notice">
                The evidence set has changed since this report.{" "}
                <button className="text-link" onClick={() => setView("photos")}>
                  Prepare an updated version
                </button>
              </div>
            )}
            {a.photos.some((p) => !p.isSample) && (
              <label className="acknowledgment">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />{" "}
                Send photographs and updated details to Remainable when I refine
                this result.
              </label>
            )}
            <Results
              result={current}
              a={a}
              onUpload={() => {
                setView("photos");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onPhoto={(p) => {
                setSelected(p);
                dialog.current?.showModal();
              }}
            />
            <BuildingDetails
              key={a.id}
              building={a.building}
              busy={!!busy}
              onRefine={async (building) => {
                await review(building);
              }}
            />
          </>
        )
      )}
      <dialog
        ref={dialog}
        className="evidence-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="dialog-top">
          <strong>Evidence viewer</strong>
          <button
            autoFocus
            className="icon-button"
            aria-label="Close evidence viewer"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        {selected && (
          <div className="evidence-detail">
            <img src={selected.src} alt={selected.filename} />
            <aside>
              <p className="eyebrow">
                {selected.isSample
                  ? selected.id
                  : current?.mode === "muse"
                    ? "USER-SUPPLIED / AI REVIEW"
                    : "USER-SUPPLIED / UNREVIEWED"}
              </p>
              <h2>{selected.filename}</h2>
              <p>{selected.note}</p>
              {current?.observations
                .filter((o) => o.imageId === selected.id)
                .map((o, i) => (
                  <div className="observation" key={i}>
                    <span className="index">0{i + 1}</span>
                    <h3>{o.component.replaceAll("_", " ")}</h3>
                    <p>{o.description}</p>
                    <dl>
                      <dt>Visual severity only</dt>
                      <dd>{o.severityVisual}</dd>
                      <dt>Location</dt>
                      <dd>{o.location}</dd>
                      <dt>Confidence</dt>
                      <dd>
                        {current?.mode === "muse"
                          ? "Not independently calibrated"
                          : "Not measured — fictional example"}
                      </dd>
                    </dl>
                  </div>
                ))}
              {!current?.observations.some(
                (o) => o.imageId === selected.id,
              ) && (
                <p className="notice">
                  No observation has been generated for this image. Professional
                  review is required.
                </p>
              )}
              <p className="fineprint">
                No bounding boxes or visual localization have been inferred.
              </p>
            </aside>
          </div>
        )}
      </dialog>
    </>
  );
}
function Results({
  result: r,
  a,
  onUpload,
  onPhoto,
}: {
  result: Screening;
  a: Assessment;
  onUpload: () => void;
  onPhoto: (p: Photo) => void;
}) {
  const all = r.evidenceSnapshot ?? [...a.photos, ...(a.archivedPhotos ?? [])];
  const building = r.buildingSnapshot ?? a.building;
  return (
    <>
      <section className="result-summary">
        <div>
          <p className="eyebrow">REMAINABLE PRELIMINARY DAMAGE SCREENING</p>
          <h2>
            {r.status === "additional_evidence_recommended"
              ? "Additional evidence recommended"
              : "Evidence awaits professional review"}
          </h2>
          <p>{r.summary}</p>
          <span className="tag">
            {r.mode === "fictional-example"
              ? "Fictional example findings"
              : r.mode === "muse"
                ? "Remainable visual review · Preliminary"
                : "Documentation only · No analysis performed"}
          </span>
        </div>
        <aside>
          <p className="eyebrow">REVIEW PRIORITY</p>
          <strong className="priority">{r.priority || "Not assigned"}</strong>
          <p>
            {r.priority
              ? PRIORITIES[r.priority]
              : r.mode === "muse"
                ? "Remainable reviewed visible evidence; review priority requires a qualified professional."
                : "No model or engineer has reviewed the uploaded evidence."}
          </p>
          <small>Priority is not a safety classification.</small>
        </aside>
      </section>
      <div className="results-layout">
        <div>
          <section className="result-section">
            <h2>
              <span>01</span>Key visual observations
            </h2>
            {r.observations.length ? (
              r.observations.map((o, i) => (
                <article className="finding" key={i}>
                  <div>
                    <span className="index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p>{o.description}</p>
                  </div>
                  <button
                    className="text-link"
                    onClick={() => {
                      const p = all.find((p) => p.id === o.imageId);
                      if (p) onPhoto(p);
                    }}
                  >
                    {o.imageId}
                    <ArrowUpRight size={15} />
                  </button>
                </article>
              ))
            ) : (
              <p>
                No image observations generated. Your evidence is available for
                professional review.
              </p>
            )}
          </section>
          <ListSection
            number="02"
            title="Possible structural concerns"
            items={r.concerns}
            empty="No structural conclusions have been made."
          />
          <ListSection
            number="03"
            title="Non-structural damage"
            items={r.nonStructural}
            empty="Not assessed in this documentation-only version."
          />
          <section className="result-section missing-section">
            <h2>
              <span>04</span>Missing evidence
            </h2>
            <p className="section-intro">
              What is not documented matters as much as what is.
            </p>
            <ul>
              {r.missing.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="case-details">
          <h3>Assessment record</h3>
          <dl>
            <dt>Building use</dt>
            <dd>{building.buildingUse}</dd>
            <dt>Structural system</dt>
            <dd>{building.structuralSystem}</dd>
            <dt>Incident</dt>
            <dd>{building.incidentType}</dd>
            <dt>Report date</dt>
            <dd>{new Date(r.createdAt).toLocaleDateString()}</dd>
            <dt>Evidence items</dt>
            <dd>{r.photoIds.length}</dd>
            <dt>Report version</dt>
            <dd>{r.version}</dd>
          </dl>
          <hr />
          <h3>What changed</h3>
          {r.changes.map((x) => (
            <p className="fineprint" key={x}>
              {x}
            </p>
          ))}
          {a.versions.length > 1 && (
            <details>
              <summary>Earlier report versions</summary>
              {a.versions.slice(0, -1).map((v) => (
                <Link
                  className="version-link"
                  key={v.version}
                  href={`/report/?id=${a.id}&version=${v.version}`}
                >
                  Version {v.version} · {v.photoIds.length} items{" "}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </details>
          )}
        </aside>
      </div>
      <section className="followups">
        <div className="section-title">
          <div>
            <p className="eyebrow">05 / THE NEXT USEFUL VIEW</p>
            <h2>What to photograph next.</h2>
          </div>
          <button className="button secondary" onClick={onUpload}>
            <Upload size={17} />
            Upload requested photos
          </button>
        </div>
        <p>
          Suggested additional evidence. A qualified professional must determine
          which views are appropriate for the site.
        </p>
        <div className="request-grid">
          {r.followups.map((f, i) => (
            <article key={f.id}>
              <span className="eyebrow">PHOTO REQUEST / 0{i + 1}</span>
              <h3>{f.what}</h3>
              <h4>Why this view</h4>
              <p>{f.why}</p>
              <h4>Position & angle</h4>
              <p>{f.angle}</p>
              <p className="safety-caption">{f.safety}</p>
            </article>
          ))}
        </div>
      </section>
      <ListSection
        number="06"
        title="Recommended professional actions"
        items={r.actions}
      />
      <details className="limitations">
        <summary>Limitations & interpretation</summary>
        <ul>
          {r.limitations.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </details>
      <div className="report-cta">
        <div>
          <FileText size={30} strokeWidth={1} />
          <h2>Ready for a professional review.</h2>
          <p>Open the report with its evidence appendix and limitations.</p>
        </div>
        <Link className="button primary" href={`/report/?id=${a.id}`}>
          Open printable report <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
function ListSection({
  number,
  title,
  items,
  empty = "Not documented.",
}: {
  number: string;
  title: string;
  items: string[];
  empty?: string;
}) {
  return (
    <section className="result-section">
      <h2>
        <span>{number}</span>
        {title}
      </h2>
      {items.length ? (
        <ul>
          {items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      ) : (
        <p>{empty}</p>
      )}
    </section>
  );
}

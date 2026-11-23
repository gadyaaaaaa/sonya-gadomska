// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import {
  AlertTriangle,
  Camera,
  FileQuestion,
  ScanLine,
  Upload,
  ArrowDownRight,
} from "lucide-react";
import type { Building, Screening } from "@/lib/types";
import { evidencePlan } from "@/lib/evidence-plan";
export function EvidenceOverview({
  result: r,
  building,
  onUpload,
}: {
  result: Screening;
  building: Building;
  onUpload: () => void;
}) {
  const plan = evidencePlan(r, building);
  return (
    <>
      <section
        className={`evidence-status ${plan.insufficient ? "needs-evidence" : "limited-evidence"}`}
        aria-labelledby="evidence-title"
      >
        <div className="evidence-status-icon">
          {plan.insufficient ? (
            <AlertTriangle size={32} />
          ) : (
            <ScanLine size={32} />
          )}
        </div>
        <div>
          <p className="eyebrow">
            {plan.insufficient
              ? "MORE EVIDENCE NEEDED"
              : "PARTIAL VISUAL REVIEW"}
          </p>
          <h2 id="evidence-title">{plan.title}</h2>
          <p className="evidence-reason">{plan.reason}</p>
          <span className="tag">
            {r.mode === "fictional-example"
              ? "Fictional example findings"
              : r.mode === "muse"
                ? "Remainable visual review · Preliminary"
                : "Documentation only · No analysis performed"}
          </span>
        </div>
        <div className="evidence-counts">
          <div>
            <Camera size={20} />
            <strong>{r.photoIds.length}</strong>
            <span>Photos supplied</span>
          </div>
          <div>
            <ScanLine size={20} />
            <strong>{r.observations.length}</strong>
            <span>Visible observations</span>
          </div>
          <div>
            <FileQuestion size={20} />
            <strong>{plan.photos.length}</strong>
            <span>Photo requests</span>
          </div>
        </div>
        <div className="evidence-summary">
          <h3>What this review tells us</h3>
          <p>{r.summary}</p>
        </div>
      </section>
      <section className="evidence-next" aria-labelledby="next-evidence-title">
        <div className="section-title">
          <div>
            <p className="eyebrow">YOUR NEXT STEP</p>
            <h2 id="next-evidence-title">Add these photos</h2>
          </div>
          <button className="button primary" onClick={onUpload}>
            <Upload size={17} />
            Upload requested photos
          </button>
        </div>
        {plan.genericPhotos && (
          <p className="fineprint">
            Suggested starting views; this earlier report did not include
            tailored photo requests.
          </p>
        )}
        <div className="evidence-request-grid">
          {plan.photos.map((f, i) => (
            <article key={f.id} className="evidence-request">
              <div className="request-icon">
                <Camera size={30} strokeWidth={1.3} />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{f.what}</h3>
              <p>
                <strong>Why it helps</strong>
                {f.why}
              </p>
              <p>
                <strong>What to capture</strong>
                {f.angle}
              </p>
              <small>{f.safety}</small>
            </article>
          ))}
        </div>
        <div className="information-request">
          <FileQuestion size={30} />
          <div>
            <h3>Additional information</h3>
            {plan.information.length ? (
              <ul>
                {plan.information.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            ) : (
              <p>
                Add any further facts that could explain the photographs, if
                available.
              </p>
            )}
            <p className="fineprint">
              Only add what you know. Information helps interpret photographs;
              it cannot replace missing views.
            </p>
          </div>
          <a className="button secondary" href="#building-details">
            Add building details
            <ArrowDownRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}

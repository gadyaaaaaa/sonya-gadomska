// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ArrowUpRight } from "lucide-react";
import { listAssessments, deleteAssessment } from "@/lib/store";
import type { Assessment } from "@/lib/types";
export function SavedAssessments() {
  const [rows, setRows] = useState<Assessment[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    listAssessments()
      .then(setRows)
      .catch((e) => setError(e.message));
  }, []);
  if (!rows.length && !error) return null;
  return (
    <section className="section saved">
      <div className="section-heading">
        <p className="eyebrow">ON THIS DEVICE</p>
        <h2>Continue documenting.</h2>
        <p>
          Saved in this browser only. Clearing site data removes these
          assessments.
        </p>
      </div>
      {error && <p role="alert">{error}</p>}
      {rows.map((a) => (
        <div className="saved-row" key={a.id}>
          <Link href={`/assessment/?id=${a.id}`}>
            <strong>{a.building.projectName}</strong>
            <span>
              {a.photos.length} evidence items · {a.versions.length} report
              versions
            </span>
            <ArrowUpRight size={18} />
          </Link>
          <button
            className="icon-button"
            aria-label={`Delete ${a.building.projectName}`}
            onClick={async () => {
              if (
                !confirm(
                  "Delete this assessment and all its local photos and reports? This cannot be undone.",
                )
              )
                return;
              try {
                await deleteAssessment(a.id);
                setRows(rows.filter((r) => r.id !== a.id));
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          >
            <Trash2 size={17} />
          </button>
        </div>
      ))}
    </section>
  );
}

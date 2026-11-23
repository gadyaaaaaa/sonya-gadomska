// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import { useState } from "react";
import { allCountries } from "country-region-data";
const countries = [...allCountries].sort((a, b) =>
  a[0].localeCompare(b[0], "en"),
);
import {
  buildingSchema,
  uses,
  systems,
  incidents,
  type Building,
} from "@/lib/types";
export function BuildingDetails({
  building,
  busy,
  onRefine,
}: {
  building: Building;
  busy: boolean;
  onRefine: (building: Building) => Promise<void>;
}) {
  const [draft, setDraft] = useState(building);
  const [error, setError] = useState("");
  const country = countries.find((c) => c[0] === draft.country);
  const regions = [...(country?.[2] ?? [])].sort((a, b) =>
    a[0].localeCompare(b[0], "en"),
  );
  const [customRegion, setCustomRegion] = useState(
    () =>
      !!building.jurisdiction &&
      !countries
        .find((c) => c[0] === building.country)?.[2]
        .some((r) => r[0] === building.jurisdiction),
  );
  const field = (
    key: keyof Building,
    label: string,
    options?: readonly string[],
  ) => (
    <label className="field" key={key}>
      <span>{label}</span>
      {options ? (
        <select
          value={String(draft[key] ?? "")}
          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          value={String(draft[key] ?? "")}
          maxLength={240}
          onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
        />
      )}
    </label>
  );
  return (
    <section id="building-details" className="result-section context-form">
      <h2>Refine with building details</h2>
      <p>
        Everything is optional. Add what you know; your first result will stay
        available.
      </p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = buildingSchema.safeParse(draft);
          if (!result.success) {
            setError(result.error.issues.map((i) => i.message).join(" "));
            return;
          }
          setError("");
          await onRefine(result.data);
        }}
      >
        <fieldset disabled={busy}>
          <div className="form-grid">
            {field("projectName", "Project name")}
            <label className="field">
              <span>Country</span>
              <select
                aria-label="Country"
                value={draft.country}
                onChange={(e) => {
                  setDraft({
                    ...draft,
                    country: e.target.value,
                    jurisdiction: "",
                  });
                  setCustomRegion(false);
                }}
              >
                <option value="">Select a country (optional)</option>
                {draft.country && !country && (
                  <option value={draft.country}>
                    {draft.country} (saved value)
                  </option>
                )}
                {countries.map(([name, code]) => (
                  <option key={code} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            {field("address", "Building address / location")}
            <div>
              <label className="field">
                <span>Province, region or district</span>
                <select
                  aria-label="Province, region or district"
                  value={
                    customRegion ? "__custom__" : (draft.jurisdiction ?? "")
                  }
                  disabled={!draft.country}
                  onChange={(e) => {
                    setCustomRegion(e.target.value === "__custom__");
                    setDraft({
                      ...draft,
                      jurisdiction:
                        e.target.value === "__custom__" ? "" : e.target.value,
                    });
                  }}
                >
                  <option value="">
                    {draft.country
                      ? "Select a region (optional)"
                      : "Select a country first"}
                  </option>
                  {regions.map(([name, code]) => (
                    <option key={code || name} value={name}>
                      {name}
                    </option>
                  ))}
                  <option value="__custom__">
                    Not listed — enter manually
                  </option>
                </select>
              </label>
              {customRegion && (
                <label className="field">
                  <span>District or municipality (not listed)</span>
                  <input
                    maxLength={240}
                    value={draft.jurisdiction ?? ""}
                    onChange={(e) =>
                      setDraft({ ...draft, jurisdiction: e.target.value })
                    }
                  />
                </label>
              )}
            </div>
            {field("buildingUse", "Building use", uses)}
            {field("structuralSystem", "Known structural system", systems)}
            {field("constructionYear", "Approximate construction year")}
            {field("floors", "Number of floors")}
            {field("area", "Approximate area (m²)")}
            {field("incidentType", "Known cause of damage", incidents)}
            {field("incidentDate", "Incident date (YYYY-MM-DD)")}
          </div>
          <label className="field">
            <span>Notes</span>
            <textarea
              maxLength={4000}
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Building norms or reference excerpts (optional)</span>
            <textarea
              maxLength={6000}
              value={draft.buildingNorms ?? ""}
              onChange={(e) =>
                setDraft({ ...draft, buildingNorms: e.target.value })
              }
            />
          </label>
          <p className="fineprint">
            Include the source, edition and relevant excerpt if you have them.
            Remainable can discuss supplied references and jurisdiction-specific
            questions; it does not verify current building codes or certify
            compliance.
          </p>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <button className="button primary" type="submit">
            {busy ? "Refining…" : "Save details & refine result"}
          </button>
        </fieldset>
      </form>
    </section>
  );
}

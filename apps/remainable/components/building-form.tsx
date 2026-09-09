// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Building2 } from "lucide-react";
import {
  buildingSchema,
  type Building,
  uses,
  systems,
  incidents,
} from "@/lib/types";
import { createAssessment, demoBuilding } from "@/lib/demo";
import { saveAssessment } from "@/lib/store";
import { DemoNotice, Steps } from "./shell";
export function BuildingForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [sample, setSample] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Building>({
    resolver: zodResolver(buildingSchema),
    defaultValues: {
      projectName: "",
      address: "",
      country: "",
      buildingUse: "residential",
      constructionYear: "",
      floors: "",
      area: "",
      structuralSystem: "unknown",
      incidentType: "unknown",
      incidentDate: "",
      notes: "",
      acknowledged: false,
    },
  });
  const field = (
    name: keyof Building,
    label: string,
    placeholder = "",
    type = "text",
  ) => (
    <label className="field" key={name}>
      <span>{label}</span>
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <small className="field-error" id={`${name}-error`}>
          {errors[name]?.message}
        </small>
      )}
    </label>
  );
  const select = (
    name: "buildingUse" | "structuralSystem" | "incidentType",
    label: string,
    options: readonly string[],
  ) => (
    <label className="field">
      <span>{label}</span>
      <select {...register(name)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o[0].toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <>
      <DemoNotice />
      <Steps active={1} />
      <div className="page-title">
        <p className="eyebrow">01 / BUILDING INFORMATION</p>
        <h1>Start with what you know.</h1>
        <p>
          Unknown details can stay unknown. Clear documentation begins with an
          honest record.
        </p>
      </div>
      <div className="form-layout">
        <form
          onSubmit={handleSubmit(async (b) => {
            setError("");
            try {
              const a = createAssessment(b, sample);
              await saveAssessment(a);
              router.push(`/assessment/?id=${a.id}`);
            } catch (e) {
              setError((e as Error).message);
            }
          })}
          noValidate
        >
          <section className="form-section">
            <h2>
              <span>01</span> Project & location
            </h2>
            <div className="form-grid">
              {field(
                "projectName",
                "Project name *",
                "e.g. Residential building A-17",
              )}
              {field("country", "Country *", "Country")}
              {field(
                "address",
                "Building address / location *",
                "Address, coordinates or a site reference",
              )}
              {select("buildingUse", "Building use", uses)}
            </div>
          </section>
          <section className="form-section">
            <h2>
              <span>02</span> Building details
            </h2>
            <div className="form-grid">
              {field(
                "constructionYear",
                "Approximate construction year",
                "Optional",
                "number",
              )}
              {field("floors", "Number of floors *", "e.g. 5", "number")}
              {field("area", "Approximate area (m²)", "Optional", "number")}
              {select("structuralSystem", "Known structural system", systems)}
            </div>
          </section>
          <section className="form-section">
            <h2>
              <span>03</span> Incident & context
            </h2>
            <div className="form-grid">
              {select("incidentType", "Known cause of damage", incidents)}
              {field("incidentDate", "Date of incident", "Optional", "date")}
            </div>
            <label className="field">
              <span>Notes</span>
              <textarea
                {...register("notes")}
                rows={4}
                placeholder="What is known about the incident, the building and the evidence?"
              />
              {errors.notes && (
                <small className="field-error">{errors.notes.message}</small>
              )}
            </label>
          </section>
          <label className="check-field">
            <input type="checkbox" {...register("acknowledged")} />
            <span>
              I understand this is a preliminary documentation tool and not a
              structural safety assessment.
            </span>
          </label>
          {errors.acknowledged && (
            <p role="alert" className="field-error">
              {errors.acknowledged.message}
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            <span>* Required information</span>
            <button
              disabled={isSubmitting}
              className="button primary"
              type="submit"
            >
              {isSubmitting ? "Saving…" : "Continue to photographs"}
              <ArrowRight size={17} />
            </button>
          </div>
        </form>
        <aside className="side-note">
          <Building2 size={32} strokeWidth={1} />
          <h3>A record, not a verdict.</h3>
          <p>
            You do not need to be an engineer to collect useful evidence. Record
            only what you know.
          </p>
          <hr />
          <p>Just exploring?</p>
          <button
            className="text-link"
            type="button"
            onClick={() => {
              reset({ ...demoBuilding, acknowledged: false });
              setSample(true);
            }}
          >
            Use the fictional example <ArrowRight size={16} />
          </button>
          {sample && (
            <p className="fineprint">
              Fictional building details filled. Three labeled schematic images
              will be included.
            </p>
          )}
          <hr />
          <p className="fineprint">
            Information and photos stay on this device. No cloud storage or AI
            service is connected in this version.
          </p>
        </aside>
      </div>
    </>
  );
}

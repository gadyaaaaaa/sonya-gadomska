// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { preparePhoto, MAX_PHOTOS } from "@/lib/photos";
import { createAssessment, createDemo } from "@/lib/demo";
import { emptyBuilding } from "@/lib/initial";
import { saveAssessment } from "@/lib/store";
import { Steps } from "./shell";
export function PhotoStart() {
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function start(files: FileList | null) {
    if (!files?.length || busy) return;
    setError("");
    setBusy(true);
    try {
      if (files.length > MAX_PHOTOS)
        throw new Error(`Choose at most ${MAX_PHOTOS} photographs.`);
      const a = createAssessment({ ...emptyBuilding });
      a.photos = await Promise.all(Array.from(files).map(preparePhoto));
      await saveAssessment(a);
      router.push(`/assessment/?id=${a.id}`);
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }
  return (
    <>
      <Steps active={1} />
      <div className="page-title">
        <p className="eyebrow">01 / PHOTO EVIDENCE</p>
        <h1>Start with your photographs.</h1>
        <p>
          Get an initial visual review. Add building details and jurisdiction
          afterwards to refine it.
        </p>
      </div>
      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void start(e.dataTransfer.files);
        }}
      >
        <Upload size={34} strokeWidth={1} />
        <h2>Add your photographs</h2>
        <p>No project name, address or building details required.</p>
        <button
          className="button primary"
          disabled={busy}
          onClick={() => input.current?.click()}
        >
          {busy ? "Preparing photographs…" : "Choose photographs"}
        </button>
        <input
          ref={input}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          aria-label="Upload photographs"
          disabled={busy}
          onChange={(e) => void start(e.target.files)}
        />
        <small>JPEG, PNG or WebP · up to 30 images · 15 MB per original</small>
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <p className="fineprint">
        Uploads are saved in this browser. Photographs are sent to Muse only
        when you choose to run an AI review. This is preliminary documentation,
        not a structural safety assessment.
      </p>
      <button
        className="text-link add-sample"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            const a = createDemo();
            await saveAssessment(a);
            router.push(`/assessment/?id=${a.id}`);
          } catch (e) {
            setError((e as Error).message);
            setBusy(false);
          }
        }}
      >
        Use the fictional example
      </button>
    </>
  );
}

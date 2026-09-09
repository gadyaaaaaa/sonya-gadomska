// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Assessment } from "@/lib/types";
import { getAssessment, saveAssessment } from "@/lib/store";
import { createDemo } from "@/lib/demo";
export function useAssessment() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get("id");
  const sample = params.get("sample");
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const sampleRequest = useRef<Promise<Assessment> | null>(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let a: Assessment | null;
        if (id) {
          a = await getAssessment(id);
        } else if (sample) {
          if (!sampleRequest.current)
            sampleRequest.current = (async () => {
              const demo = createDemo();
              await saveAssessment(demo);
              return demo;
            })();
          a = await sampleRequest.current;
          if (!cancelled)
            router.replace(`${window.location.pathname}?id=${a.id}`);
        } else {
          throw new Error(
            "No assessment selected. Start an assessment or open the sample.",
          );
        }
        if (!a)
          throw new Error(
            "This assessment is not in this browser. It may have been deleted or created on another device.",
          );
        if (!cancelled) setAssessment(a);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, sample, router]);
  return { assessment, setAssessment, error, setError, loading };
}

// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { Suspense } from "react";
import { Report } from "@/components/report";
export default function Page() {
  return (
    <main id="main">
      <Suspense fallback={<p className="loading">Preparing report…</p>}>
        <Report />
      </Suspense>
    </main>
  );
}

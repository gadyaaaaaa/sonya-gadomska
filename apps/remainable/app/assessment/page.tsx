// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { Suspense } from "react";
import { AssessmentWorkspace } from "@/components/assessment-workspace";
export default function Page() {
  return (
    <main id="main" className="workspace">
      <Suspense fallback={<p className="loading">Opening assessment…</p>}>
        <AssessmentWorkspace />
      </Suspense>
    </main>
  );
}

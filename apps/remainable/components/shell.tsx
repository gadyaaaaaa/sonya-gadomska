// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import Link from "next/link";
import { ArrowUpRight, ScanLine } from "lucide-react";
import { COPYRIGHT } from "@/lib/policy";
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Remainable home">
        <ScanLine size={23} strokeWidth={1.5} />
        remainable<span className="brand-dot">.</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/assessment/?sample=1">Sample assessment</Link>
        <Link href="/new/" className="nav-cta">
          Start an assessment <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark" href="/">
          remainable.
        </Link>
        <p>Experimental engineering technology.</p>
      </div>
      <div>
        <p>
          For preliminary documentation and professional review. Does not
          determine structural safety.
        </p>
        <small>{COPYRIGHT}</small>
      </div>
    </footer>
  );
}
export function DemoNotice() {
  return (
    <aside className="demo-notice">
      <span className="live-dot" /> <strong>Working prototype</strong>
      <span>
        Photos stay in this browser. Findings are fictional examples; uploaded
        photos are not analyzed.
      </span>
    </aside>
  );
}
export function Steps({ active }: { active: number }) {
  return (
    <ol className="steps" aria-label="Assessment progress">
      {["Building details", "Photo evidence", "Screening & review"].map(
        (s, i) => (
          <li
            key={s}
            aria-current={active === i + 1 ? "step" : undefined}
            className={active === i + 1 ? "active" : ""}
          >
            <span>0{i + 1}</span>
            {s}
          </li>
        ),
      )}
    </ol>
  );
}

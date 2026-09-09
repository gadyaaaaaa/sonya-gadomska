// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Plus } from "lucide-react";
import { SavedAssessments } from "@/components/saved-assessments";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-top eyebrow">
          <span>REMAINABLE / FIELD NOTES 001</span>
          <span>PRELIMINARY DOCUMENTATION</span>
        </div>
        <div className="hero-grid">
          <div>
            <p className="eyebrow intro-label">
              <span className="live-dot" /> A clearer starting point for
              reconstruction
            </p>
            <h1>
              Can this building
              <br />
              be <em>saved?</em>
            </h1>
            <p className="hero-sub">
              Document the damage.
              <br />
              Know what to inspect next.
            </p>
            <div className="actions">
              <Link className="button primary" href="/new/">
                Start an assessment <ArrowUpRight size={19} />
              </Link>
              <Link className="text-link" href="/report/?sample=1">
                View sample report <ArrowRight size={17} />
              </Link>
            </div>
            <p className="fineprint hero-disclaimer">
              Remainable supports preliminary documentation and triage. It does
              not determine structural safety or replace an engineer.
            </p>
          </div>
          <div className="hero-drawing">
            <div className="drawing-label">
              <span>01 / EVIDENCE BEFORE CONCLUSIONS</span>
              <Plus size={16} />
            </div>
            <img
              src="/demo/elevation.svg"
              alt="Conceptual line drawing of a five-storey building; fictional demonstration illustration"
            />
            <div className="drawing-caption">
              <span>OBSERVE. DOCUMENT. REVIEW.</span>
              <span>FIG. 01 / SCHEMATIC</span>
            </div>
            <div className="drawing-note">
              <span>01</span>
              <p>
                Some answers need
                <br />a closer look.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>FOR ENGINEERS & DISASTER-RESPONSE TEAMS</span>
          <span>
            BUILT TO SUPPORT PROFESSIONAL JUDGMENT <ArrowUpRight size={14} />
          </span>
        </div>
      </section>
      <section className="section process">
        <div className="section-heading">
          <p className="eyebrow">THE PROCESS</p>
          <h2>
            From scattered photographs
            <br />
            to structured evidence.
          </h2>
        </div>
        <div className="process-grid">
          {[
            [
              "01",
              "Capture",
              "Upload photographs or conduct a guided site survey.",
            ],
            [
              "02",
              "Triage",
              "Organize visible damage, uncertainty and missing evidence.",
            ],
            [
              "03",
              "Review",
              "Prepare an evidence package for a qualified engineer.",
            ],
          ].map(([n, title, body]) => (
            <article key={n}>
              <span className="index">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="statement section">
        <p className="eyebrow">WHEN ACCESS IS LIMITED. WHEN TIME MATTERS.</p>
        <h2>
          Built for the moments
          <br />
          when engineers cannot
          <br />
          be everywhere.
        </h2>
        <div>
          <p>
            Remainable helps gather the evidence needed to ask better questions.
            Decisions remain with appropriately qualified professionals.
          </p>
          <p className="use-cases">
            War damage · Earthquakes · Explosions
            <br />
            Fire · Severe weather
          </p>
          <span className="tag">Phase 1 · Local demonstration</span>
        </div>
      </section>
      <section className="section founder" aria-labelledby="founder-heading">
        <div className="founder-profile">
          <img
            src="/sonya-gadomska.png"
            alt="Sonya Gadomska"
            width={460}
            height={460}
            loading="lazy"
          />
          <h3>Sonya Gadomska</h3>
          <p className="founder-credentials">
            Architectural Engineering student @ University of Waterloo, Creative
            Destruction Lab apprentice alumna
          </p>
          <div className="founder-links">
            <a
              className="text-link"
              href="https://www.linkedin.com/in/sonya-gadomska-4833113b6/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={16} />
            </a>
            <a
              className="text-link"
              href="https://github.com/gadyaaaaaa"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="founder-letter">
          <h2 id="founder-heading">
            Dear future co-founders, investors &amp; mentors,
          </h2>
          <p>
            I’m Sonya, a Ukrainian studying Architectural Engineering at
            Waterloo. My studies are about how buildings stand up. Remainable
            asks what comes next when they’re damaged or destroyed.
          </p>
          <p>
            The idea is this: turn scattered photographs into organized evidence
            for engineers, showing what’s visible, what’s missing, and what to
            inspect next.
          </p>
          <p>
            Ukraine will be the first place to test it. Damaged buildings are
            unfortunately not hard to find there, and better assessment tools
            could help make reconstruction faster.
          </p>
          <p>
            Remainable is an early experiment. If you know buildings,
            reconstruction, startups, or simply think this is worth exploring,
            I’d love to talk.
          </p>
          <p className="founder-signature">
            Sonya Gadomska<span>Founder, Remainable</span>
          </p>
        </div>
      </section>
      <SavedAssessments />
    </main>
  );
}

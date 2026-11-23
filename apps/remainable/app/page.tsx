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
                Try the prototype <ArrowUpRight size={19} />
              </Link>
              <Link className="text-link" href="/report/?sample=1">
                View sample report <ArrowRight size={17} />
              </Link>
            </div>
            <p className="fineprint hero-disclaimer">
              Early documentation prototype. Uploaded photos are not analysed.
              Remainable does not determine structural safety or replace an
              engineer.
            </p>
          </div>
          <div className="hero-drawing">
            <div className="drawing-label">
              <span>01 / EVIDENCE BEFORE CONCLUSIONS</span>
              <Plus size={16} />
            </div>
            <img
              src="/remainable-cutaway.jpg"
              alt="Architectural cutaway illustration of a fictional damaged residential building, showing exposed rooms and floor slabs"
            />
            <div className="drawing-caption">
              <span>OBSERVE. DOCUMENT. REVIEW.</span>
              <span>FIG. 01 / CONCEPT</span>
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
              "Add photographs you are authorised to use. No building details are required to start.",
            ],
            [
              "02",
              "Organise",
              "Get an initial visual review with Muse, or keep a local documentation-only record.",
            ],
            [
              "03",
              "Review",
              "Add building and jurisdiction details to refine the result, then export for professional review.",
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
          <span className="tag">Working prototype · Preliminary review</span>
        </div>
      </section>
      <section className="section process" aria-labelledby="research-heading">
        <div className="section-heading">
          <p className="eyebrow">WHAT WE ARE TESTING</p>
          <h2 id="research-heading">
            A useful handover
            <br />
            starts with a real workflow.
          </h2>
        </div>
        <div className="process-grid">
          <article>
            <span className="index">01</span>
            <h3>Engineering teams</h3>
            <p>
              Can a clearer evidence package reduce the work of preparing and
              reviewing building documentation? We want to compare it with the
              tools teams already use.
            </p>
          </article>
          <article>
            <span className="index">02</span>
            <h3>A photo-first prototype</h3>
            <p>
              Upload photos first, then add context. Records stay in this
              browser; running an AI review sends photos and details to Muse.
              Professional verification remains necessary.
            </p>
          </article>
          <article>
            <span className="index">03</span>
            <h3>Practitioner feedback</h3>
            <p>
              We are seeking conversations with engineers and reconstruction
              coordinators about evidence preparation, missing information and
              the cost of rework.
            </p>
          </article>
        </div>
        <div className="actions research-actions">
          <Link className="button primary" href="/research/">
            Explore the research plan <ArrowUpRight size={19} />
          </Link>
          <a
            className="text-link"
            href="https://www.linkedin.com/in/sonya-gadomska-4833113b6/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Sonya on LinkedIn <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="section founder" aria-labelledby="founder-heading">
        <div className="founder-profile">
          <img
            src="/sonya-gadomska-editorial.jpg"
            alt="Sonya Gadomska"
            width={900}
            height={900}
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
            I’m Sonya, studying Architectural Engineering at Waterloo. My
            studies are about how buildings stand up. Remainable asks what comes
            next when they’re damaged or destroyed.
          </p>
          <p>
            The idea is this: turn scattered photographs into organized evidence
            for engineers, showing what’s visible, what’s missing, and what to
            inspect next.
          </p>
          <p>Better assessment tools could help make reconstruction faster.</p>
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

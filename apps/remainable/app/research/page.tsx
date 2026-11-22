// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research and prototype | Remainable",
  description: "What Remainable demonstrates today, the customer hypotheses being explored and an invitation to practitioners to discuss their documentation workflow.",
};

export default function ResearchPage() {
  return (
    <main id="main" className="research-page">
      <p className="eyebrow">REMAINABLE / RESEARCH</p>
      <h1>Does a clearer record<br />make review easier?</h1>
      <p>Remainable explores how photographs and building information can become a more useful starting point for professional review. Our immediate question is whether organising that information helps enough to justify a change to a team’s existing workflow.</p>
      <p>This page describes an early prototype and proposed experiments. The demonstration does not establish customer demand, time savings or engineering accuracy.</p>
      <div className="actions research-actions">
        <Link className="button primary" href="/assessment/?sample=1">Explore the fictional example</Link>
        <Link className="text-link" href="/report/?sample=1">Read the sample report</Link>
      </div>

      <h2>What works today</h2>
      <ul>
        <li>Enter building details, add photographs and organise them with notes and categories.</li>
        <li>Prepare a documentation-only report and retain earlier report versions as the evidence changes.</li>
        <li>Print or save a report as a PDF using the browser.</li>
      </ul>
      <p>The sample case uses fictional illustrations and example observations. Uploaded photographs are not analysed, and no AI model runs. General follow-up prompts are demonstration checklists, not findings about a real building.</p>
      <p>Records stay in this browser and are not shared across devices. Browser storage is not a permanent archive. The app uses resized image copies without the original image metadata: retain original evidence separately. Use fictional or non-sensitive material to explore the prototype.</p>
      <p>Remainable does not determine structural safety, occupancy, repairability or demolition. It does not authorise site access. Those decisions remain with appropriately qualified professionals.</p>

      <h2>Two routes to investigate</h2>
      <div className="research-routes">
        <section aria-labelledby="software-route">
          <h3 id="software-route">Software for engineering teams</h3>
          <p>An engineering consultancy’s staff prepare the package; its engineer reviews the evidence. A team subscription could make sense if the task recurs and the tool fits the firm’s reporting process.</p>
          <p>The test: can staff use the workflow with little assistance, and does it improve preparation or review enough for a budget owner to consider paying?</p>
        </section>
        <section aria-labelledby="service-route">
          <h3 id="service-route">A documentation service</h3>
          <p>A reconstruction organisation receives help preparing a defined evidence package for its appointed engineering reviewer. A fee per project is a possible model.</p>
          <p>The test: does the organisation value the preparation service, and can it be delivered at a cost that supports a business? Engineering assessment would be a separate responsibility.</p>
        </section>
      </div>
      <p>These are alternative hypotheses. No price or purchasing model has been validated. Shared folders, spreadsheets, report templates and existing inspection software are the baseline to compare against.</p>

      <h2>What would count as useful evidence</h2>
      <ul>
        <li>A practitioner can describe a recent task, the information they needed and the work caused by incomplete documentation.</li>
        <li>A comparison using the same authorised material records preparation time, reviewer effort and requests for clarification, including cases where the existing method works better.</li>
        <li>A potential buyer identifies a recurring need, a budget and a concrete scope they would consider purchasing.</li>
      </ul>
      <p>AI-assisted interpretation may become a later experiment if the workflow research supports it. It would require a separate evaluation with qualified reviewers. The current demonstration makes no claim to have completed that evaluation.</p>

      <h2>Why investigate this problem</h2>
      <p>The joint Ukraine recovery assessment published in February 2026 reported that 14 percent of housing had been damaged or destroyed by the end of 2025, affecting more than three million households. This illustrates the reconstruction context; it does not measure demand for Remainable. <a href="https://www.worldbank.org/en/news/press-release/2026/02/23/updated-ukraine-recovery-and-reconstruction-needs-assessment-released">Read the World Bank announcement.</a></p>
      <p>Documentation requirements also show why photographs need context. FEMA’s US disaster-damage documentation guidance includes location, facility details, photographs and damage descriptions. It is an example of a documentation need, not a certification or a claim that Remainable meets a particular jurisdiction’s requirements. <a href="https://emilms.fema.gov/IS1006/groups/69.html">Read the FEMA guidance.</a></p>

      <h2>Help shape the next test</h2>
      <p>Sonya Gadomska is an Architectural Engineering student at Waterloo and the founder of Remainable. She is seeking conversations with engineers who review building evidence and coordinators who prepare it. A useful starting point is a recent documentation task: what was collected, what the reviewer needed and what had to be done again.</p>
      <p>Please start with a description of your workflow. Do not send confidential project records or photographs of people or sensitive sites through an introductory message.</p>
      <a className="button primary" href="https://www.linkedin.com/in/sonya-gadomska-4833113b6/" target="_blank" rel="noopener noreferrer">Contact Sonya on LinkedIn</a>
    </main>
  );
}

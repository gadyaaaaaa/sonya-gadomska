# Research presentation update

23 November 2026. Previous source commit: `c01bfda8062a327950c47fd3dd1c8183c574d47b`.

The homepage now distinguishes the working documentation prototype from future analysis experiments. A linked `/research/` page explains current features, limitations, two possible business routes and the evidence needed to evaluate them. The pitch uses the same distinction. Existing assessment data, fictional fixtures and reporting behaviour are unchanged.

The two business routes and proposed tests are hypotheses, not validated findings. No customer endorsements, pilot results, revenue claims or AI-analysis results have been added. No model calls or cloud storage have been enabled.

Validation: lint, TypeScript checks, eight unit tests, production export and all thirteen existing browser tests passed. Browser tests used installed Chrome because the Playwright-managed browser was unavailable. The homepage and research page were also inspected at desktop and mobile widths and checked for horizontal overflow and JavaScript errors.

## Publishing and rollback

This source change is not a live hosting deployment. The hosting account did not authenticate during this session. Before publishing, archive the existing verified Remainable document root and record the release commit. Deploy only the static `out/` build, then verify the homepage, research page, pitch, assessment and report routes.

To undo the source changes, revert the commit that introduced this file. To undo a live deployment, restore its pre-release hosting archive or redeploy a tested build of the previous commit. Reverting GitHub alone does not change the hosting files. Preserve browser-local records throughout.

Application documents and personal student information are deliberately excluded from this public repository.

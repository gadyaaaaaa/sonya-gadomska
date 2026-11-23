# Muse connection and rollback

Copyright (c) 2026 Sonya Gadomska. All rights reserved.

The browser uploads photographs into the existing IndexedDB database. Nothing is sent to Muse until the user explicitly agrees and runs a review. Optional context is entered after the first report. Each report stores a frozen building/evidence snapshot; an API failure keeps the previous report.

## Hosting

Build with `npm ci && npm run build`. The export includes `api/muse.php`, which requires PHP 7.4+ with curl, mbstring and image inspection support. A static-only host cannot execute the gateway. Do not serve PHP source as plain text. On the existing host, deploy `out/` to `/home/dls0/remainable.ca/www` only after deployment is authorized.

Create `/home/dls0/remainable.ca/private-remainable/muse.json` outside the webroot, readable only by the site's PHP user, with `api_key` and `origin` (`https://remainable.ca`). Alternatively set `REMAINABLE_MUSE_CONFIG` to a private JSON file. Never commit this file or place it in `out/`. The existing account key can be securely provisioned on the server; do not embed it in JavaScript. Verify the PHP pool can read the private directory and write `usage.json` there.

GET `/api/muse.php` returns only configuration status. POST accepts same-origin JSON with explicit consent, optional building fields and 1–30 validated image data URLs. It sends `store:false` to Meta's Responses API using `muse-ember-1.0`. No raw requests, photos, model responses or credentials are logged or stored by the gateway. Provider processing still occurs; `store:false` is not a guarantee of zero provider retention. The app's assessment records remain in the browser.

Public usage is bounded to 10 requests per IP per UTC day, 100 per day overall and 500 per month, with 15 seconds between requests per IP and one concurrent request. Counts include failures. These are request caps, not a guaranteed dollar budget. Payloads are capped at 24 MB, original resized images at 1800px, output at 5000 tokens. Proxy-forwarded IP headers are not trusted. Limit exhaustion is explicit and never replaces a report with a fake analysis.

Muse produces preliminary image-linked observations and questions for professional review. It cannot certify structural safety or compliance. Jurisdiction and norm excerpts are user-supplied, unverified context: this version does not retrieve or verify legislation, building codes or editions.

## Validation and release

Run lint, typecheck, unit tests, browser flow tests, production build and PHP lint/validator tests. Browser API responses are mocked to check consent, errors and historical preservation; separately make a bounded provider smoke test with a non-sensitive synthetic image. Confirm the deployed browser flow and gateway status before claiming live availability.

Before release, archive the current webroot and record its checksum. Preserve `.htaccess` and other host configuration. The earlier source revision is `1949dc25d1a5d16d9f36ae10cb3d4a21da16cf84`.

Rollback: restore the webroot archive, disable/remove the private Muse configuration to stop new calls, and revert the feature commit in GitHub. Do not delete browser data or change `remainable-local-v1`. Existing records and prior versions remain intact. Existing historical reports lacking a snapshot retain their current recorded building context when they are next refined; the app cannot reconstruct past context that was never stored.

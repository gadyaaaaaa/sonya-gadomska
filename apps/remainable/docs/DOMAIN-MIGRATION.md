# remainable.ca migration — staged, awaiting domain activation

© 2026 Sonya Gadomska. All rights reserved.

## Completed on 9 September 2026

The current live Remainable static site was copied from `/home/dls0/hrnftr.com/remainable` to `/home/dls0/remainable.ca/www` on `dls0.ftp.tools`. Every copied file matched the source SHA-256 manifest. The source application release corresponds to commit `00a31f9d219b2ac343be10b4d783007a7f6e5318`.

Both `remainable.ca` and `www.remainable.ca` serve the application when requests are directed to hosting IP `185.104.45.108`. The new-origin browser flow (building form → example photos → screening → report) passed using explicit test-only DNS mapping and certificate bypass. This is not evidence of working public DNS or trusted HTTPS.

## Cutover blockers observed

- `.ca` authoritative DNS (`any.ca-servers.ca`) returned NXDOMAIN for the domain: public nameserver delegation has not been published. Cloudflare and Google public DNS also returned NXDOMAIN.
- The provider's prepared zone on `ns12.inhostedns.com` listed these nameservers: `ns12.inhostedns.com`, `ns22.inhostedns.net`, `ns32.inhostedns.org`.
- That zone pointed both the root domain and `www` to `91.206.201.54`, which returned HTTP 404 and `Site remainable.ca not configured`.
- The existing hosting server at `185.104.45.108` serves the copied site correctly for both hostname variants.
- The hosting TLS certificate did not cover `remainable.ca` during the check.

Confirm registration is active and delegate to the provider's intended nameservers. In the intended zone, configure root and www to the verified hosting server (or the equivalent records explicitly provided by the hosting control panel). Issue a valid certificate covering both names. Recheck authoritative DNS, public DNS, HTTPS, asset loading and the full browser workflow before redirecting the old site or describing the move as live.

No nameserver, DNS, TLS, mail or old-site redirect changes were made. The current connection provides server file access, not registrar/control-panel management.

## Rollback and local data

Backup directory: `/home/dls0/deploy-backups/remainable-ca-migration-20260909/`.

- `new-domain-before.tar.gz`: original new-domain placeholder.
- `source-site.tar.gz`: complete existing Remainable site before copying.
- `source.sha256`: copied-file verification manifest.

The old address https://remainable.hrnftr.com remains operational. Assessments are stored in browser IndexedDB and belong to the old origin; copying server files does not transfer them to a new domain. Preserve old-origin access to existing assessments. Do not redirect saved assessment/report URLs without a tested data-transfer or export path.

To roll back the new folder, extract `new-domain-before.tar.gz` into an empty private directory, inspect it, then synchronize only to `/home/dls0/remainable.ca/www`. The original site does not need restoring because it was not changed.

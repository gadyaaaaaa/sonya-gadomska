# Remainable deployment

© 2026 Sonya Gadomska. All rights reserved.

Live demo: https://remainable.hrnftr.com

Deployed 9 September 2026. Application source commit: `88393ca5a4b1d5a1f7116c5bfd119bc4bc68c2a7`.

Only the 56 static public build files were uploaded. No credentials, source, personal documents or dependency directories were deployed. The demo continues to use browser-local storage and fictional findings; no AI or cloud account integration was enabled.

## Verification

Valid HTTPS; all four app routes and required scripts/styles return 200. Every deployed file matches the tested release SHA-256 manifest. The live browser completed the form, fictional screening, follow-up revision, printable report, reload and PDF printing with no JavaScript page errors.

## Server locations

- Host: `dls0.ftp.tools`
- Document root: `/home/dls0/hrnftr.com/remainable`
- Original-site backup: `/home/dls0/deploy-backups/remainable-88393ca-20260909/before.tar.gz`
- Retained release and checksum manifest: `/home/dls0/deploy-releases/remainable-88393ca-20260909/`

## Rollback

The archive contains the original hosting placeholder. To restore it, first confirm the document root and retain a copy of the current release. Extract `before.tar.gz` into an empty private directory, inspect the contents, then synchronize that directory to the exact Remainable document root with deletion enabled for obsolete release files. Verify the homepage after restoration. Do not restore into another HRNFTR directory or clear browser-local assessment data. Reverting a GitHub commit alone does not roll back the server.

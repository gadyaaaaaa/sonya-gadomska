// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import { defineConfig } from "@playwright/test";
const port = Number(process.env.REMAINABLE_TEST_PORT || 3100);
export default defineConfig({
  testDir: "./tests/e2e",
  use: { baseURL: `http://127.0.0.1:${port}`, headless: true },
  webServer: {
    command: `npm run dev -- --port ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
    timeout: 120000,
  },
  workers: 1,
});

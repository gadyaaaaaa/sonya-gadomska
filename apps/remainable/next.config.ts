// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;

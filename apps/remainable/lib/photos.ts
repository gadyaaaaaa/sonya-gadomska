// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Photo } from "./types";
export const MAX_PHOTOS = 30;
export const MAX_FILE_SIZE = 15 * 1024 * 1024;
export async function preparePhoto(file: File): Promise<Photo> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type))
    throw new Error(`${file.name}: use JPEG, PNG or WebP.`);
  if (file.size > MAX_FILE_SIZE)
    throw new Error(`${file.name}: maximum original file size is 15 MB.`);
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    if (!img.naturalWidth || !img.naturalHeight)
      throw new Error("Unreadable image.");
    const scale = Math.min(
      1,
      1800 / Math.max(img.naturalWidth, img.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Image processing is unavailable.");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return {
      id: crypto.randomUUID(),
      src: canvas.toDataURL("image/jpeg", 0.85),
      filename: file.name,
      category: "unknown",
      note: "",
      isSample: false,
      addedAt: new Date().toISOString(),
    };
  } catch (e) {
    throw new Error(
      `${file.name}: ${e instanceof Error ? e.message : "Could not read this image."}`,
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

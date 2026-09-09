// Copyright (c) 2026 Sonya Gadomska. All rights reserved.
import type { Assessment } from "./types";
const DB = "remainable-local-v1";
function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () =>
      req.result.createObjectStore("assessments", { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () =>
      reject(
        new Error(
          "Local storage could not be opened. Check your browser’s storage settings.",
        ),
      );
  });
}
export async function saveAssessment(value: Assessment): Promise<void> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("assessments", "readwrite");
    tx.objectStore("assessments").put(value);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(
        new Error(
          "Could not save locally. Browser storage may be full; remove some photos or free storage and retry.",
        ),
      );
    };
  });
}
export async function getAssessment(id: string): Promise<Assessment | null> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("assessments", "readonly");
    const req = tx.objectStore("assessments").get(id);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () =>
      reject(new Error("Could not read the saved assessment."));
    tx.oncomplete = () => db.close();
  });
}
export async function listAssessments(): Promise<Assessment[]> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("assessments", "readonly");
    const req = tx.objectStore("assessments").getAll();
    req.onsuccess = () =>
      resolve(
        (req.result as Assessment[]).sort((a, b) =>
          b.updatedAt.localeCompare(a.updatedAt),
        ),
      );
    req.onerror = () => reject(new Error("Could not load saved assessments."));
    tx.oncomplete = () => db.close();
  });
}
export async function deleteAssessment(id: string): Promise<void> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("assessments", "readwrite");
    tx.objectStore("assessments").delete(id);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => reject(new Error("Could not remove this assessment."));
  });
}

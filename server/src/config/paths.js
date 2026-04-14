import fs from "node:fs";
import path from "node:path";

const defaultDataDir = path.resolve(process.cwd(), "data");

export const dataDir = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : defaultDataDir;

export const uploadsDir = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(dataDir, "uploads");

export const databaseFilePath = process.env.DB_PATH
  ? path.resolve(process.env.DB_PATH)
  : path.join(dataDir, "fansite.sqlite");

fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(uploadsDir, { recursive: true });

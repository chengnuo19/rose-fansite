import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uploadsDir } from "./config/paths.js";
import { initializeDatabase } from "./db/database.js";
import adminRouter from "./routes/admin.js";
import imagesRouter from "./routes/images.js";

dotenv.config();

if (!process.env.ADMIN_KEY) {
  process.env.ADMIN_KEY = "rose-admin-2026";
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 4000);
const clientDistPath = path.resolve(__dirname, "../../client/dist");
const clientPublicPath = path.resolve(__dirname, "../../client/public");

fs.mkdirSync(uploadsDir, { recursive: true });
initializeDatabase();

app.use(cors());
app.use(express.json({ limit: "12mb" }));
app.use("/media", express.static(path.join(clientDistPath, "media")));
app.use("/media", express.static(path.join(clientPublicPath, "media")));
app.use("/media", express.static(uploadsDir));

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    database: "sqlite",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/images", imagesRouter);
app.use("/api/admin", adminRouter);

app.use(express.static(clientDistPath));

app.get("*", (request, response, next) => {
  if (request.path.startsWith("/api")) {
    next();
    return;
  }

  response.sendFile(path.join(clientDistPath, "index.html"), (error) => {
    if (error) {
      response.status(404).json({
        error: "前端尚未构建。请先运行 npm.cmd run build 或使用开发模式启动。",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Rosé fan server running on http://localhost:${port}`);
});

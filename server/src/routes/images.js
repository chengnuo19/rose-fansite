import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Router } from "express";
import { uploadsDir } from "../config/paths.js";
import { all, get, mapCommentRow, mapImageRow, mapSubmissionRow, run } from "../db/database.js";

const router = Router();

const imageSummaryQuery = `
  SELECT
    i.*,
    COUNT(c.id) AS comment_count
  FROM images i
  LEFT JOIN comments c ON c.image_id = i.id
  GROUP BY i.id
`;

const mimeExtensions = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

router.get("/comments/recent", (_request, response) => {
  const comments = all(
    `
      SELECT c.*, i.title AS image_title
      FROM comments c
      JOIN images i ON i.id = c.image_id
      ORDER BY c.created_at DESC, c.id DESC
      LIMIT 6
    `,
  );

  response.json({
    comments: comments.map(mapCommentRow),
  });
});

router.post("/submissions", (request, response) => {
  const author = String(request.body.author || "").trim();
  const authorBadge = String(request.body.authorBadge || "").trim();
  const avatarEmoji = String(request.body.avatarEmoji || "🌹").trim();
  const visitorId = String(request.body.visitorId || "").trim();
  const title = String(request.body.title || "").trim();
  const description = String(request.body.description || "").trim();
  const imageBase64 = String(request.body.imageBase64 || "");
  const mimeType = String(request.body.mimeType || "").trim().toLowerCase();

  if (!author || !title || !description || !imageBase64 || !mimeType) {
    response.status(400).json({ error: "请填写完整的投稿信息并选择图片。" });
    return;
  }

  if (!mimeExtensions[mimeType]) {
    response.status(400).json({ error: "仅支持 JPG、PNG 或 WEBP 图片。" });
    return;
  }

  const matches = imageBase64.match(/^data:(.+);base64,(.+)$/);
  const base64Payload = matches ? matches[2] : imageBase64;

  if (!base64Payload) {
    response.status(400).json({ error: "图片数据无效，请重新选择文件。" });
    return;
  }

  const buffer = Buffer.from(base64Payload, "base64");

  if (buffer.length > 8 * 1024 * 1024) {
    response.status(400).json({ error: "图片不能超过 8MB。" });
    return;
  }

  const storedName = `${Date.now()}-${randomUUID()}.${mimeExtensions[mimeType]}`;
  const fileName = `uploads/${storedName}`;
  const absolutePath = path.join(uploadsDir, storedName);

  fs.writeFileSync(absolutePath, buffer);

  const result = run(
    `
      INSERT INTO fan_submissions (author, author_badge, avatar_emoji, visitor_id, title, description, file_name, mime_type, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
    [author, authorBadge || null, avatarEmoji || "🌹", visitorId || null, title, description, fileName, mimeType],
  );

  const submission = get("SELECT * FROM fan_submissions WHERE id = ?", [
    result.lastInsertRowid,
  ]);

  response.status(201).json({
    message: "投稿已提交，等待管理员审核后会展示到首页。",
    submission: mapSubmissionRow(submission),
  });
});

router.get("/", (_request, response) => {
  const rows = all(`${imageSummaryQuery} ORDER BY i.featured DESC, i.id ASC`);

  response.json({
    images: rows.map(mapImageRow),
  });
});

router.get("/:id", (request, response) => {
  const row = get(`${imageSummaryQuery} HAVING i.id = ?`, [
    Number(request.params.id),
  ]);

  if (!row) {
    response.status(404).json({ error: "图片不存在" });
    return;
  }

  response.json({
    image: mapImageRow(row),
  });
});

router.get("/:id/comments", (request, response) => {
  const comments = all(
    `
      SELECT c.*, i.title AS image_title
      FROM comments c
      JOIN images i ON i.id = c.image_id
      WHERE c.image_id = ?
      ORDER BY c.created_at DESC, c.id DESC
    `,
    [Number(request.params.id)],
  );

  response.json({
    comments: comments.map(mapCommentRow),
  });
});

router.post("/:id/like", (request, response) => {
  const imageId = Number(request.params.id);
  const result = run("UPDATE images SET like_count = like_count + 1 WHERE id = ?", [
    imageId,
  ]);

  if (!result.changes) {
    response.status(404).json({ error: "图片不存在" });
    return;
  }

  const row = get(`${imageSummaryQuery} HAVING i.id = ?`, [imageId]);

  response.json({
    image: mapImageRow(row),
  });
});

router.post("/:id/comments", (request, response) => {
  const imageId = Number(request.params.id);
  const author = String(request.body.author || "").trim();
  const authorBadge = String(request.body.authorBadge || "").trim();
  const avatarEmoji = String(request.body.avatarEmoji || "🌹").trim();
  const visitorId = String(request.body.visitorId || "").trim();
  const content = String(request.body.content || "").trim();

  if (!author || !content) {
    response.status(400).json({ error: "昵称和评论内容不能为空" });
    return;
  }

  if (author.length > 30 || content.length > 500) {
    response.status(400).json({ error: "评论内容过长，请稍微精简一点" });
    return;
  }

  const image = get("SELECT id FROM images WHERE id = ?", [imageId]);

  if (!image) {
    response.status(404).json({ error: "图片不存在" });
    return;
  }

  const result = run(
    "INSERT INTO comments (image_id, author, author_badge, avatar_emoji, visitor_id, content) VALUES (?, ?, ?, ?, ?, ?)",
    [imageId, author, authorBadge || null, avatarEmoji || "🌹", visitorId || null, content],
  );

  const comment = get(
    `
      SELECT c.*, i.title AS image_title
      FROM comments c
      JOIN images i ON i.id = c.image_id
      WHERE c.id = ?
    `,
    [result.lastInsertRowid],
  );

  const summary = get(`${imageSummaryQuery} HAVING i.id = ?`, [imageId]);

  response.status(201).json({
    comment: mapCommentRow(comment),
    image: mapImageRow(summary),
  });
});

export default router;

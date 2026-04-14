import { Router } from "express";
import { all, get, mapCommentRow, mapSubmissionRow, run } from "../db/database.js";

const router = Router();

function requireAdminKey(request, response, next) {
  const adminKey = request.header("x-admin-key");

  if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
    response.status(401).json({ error: "管理员密钥不正确" });
    return;
  }

  next();
}

router.use(requireAdminKey);

router.get("/comments", (_request, response) => {
  const comments = all(
    `
      SELECT c.*, i.title AS image_title
      FROM comments c
      JOIN images i ON i.id = c.image_id
      ORDER BY c.created_at DESC, c.id DESC
    `,
  );

  response.json({
    comments: comments.map(mapCommentRow),
  });
});

router.delete("/comments/:commentId", (request, response) => {
  const commentId = Number(request.params.commentId);
  const result = run("DELETE FROM comments WHERE id = ?", [commentId]);

  if (!result.changes) {
    response.status(404).json({ error: "评论不存在" });
    return;
  }

  response.json({ success: true });
});

router.get("/submissions", (_request, response) => {
  const submissions = all(
    `
      SELECT *
      FROM fan_submissions
      ORDER BY CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END, created_at DESC, id DESC
    `,
  );

  response.json({
    submissions: submissions.map(mapSubmissionRow),
  });
});

router.post("/submissions/:submissionId/approve", (request, response) => {
  const submissionId = Number(request.params.submissionId);
  const submission = get("SELECT * FROM fan_submissions WHERE id = ?", [submissionId]);

  if (!submission) {
    response.status(404).json({ error: "投稿不存在" });
    return;
  }

  if (submission.status === "approved") {
    response.json({ submission: mapSubmissionRow(submission) });
    return;
  }

  const slug = `fan-${submissionId}-${Date.now()}`;
  const imageResult = run(
    `
      INSERT INTO images (slug, title, subtitle, description, filename, fan_count, like_count, featured, tag)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      slug,
      submission.title,
      `粉丝投稿 by ${submission.author}${submission.author_badge ? ` ${submission.author_badge}` : ""}`,
      submission.description,
      submission.file_name,
      120,
      0,
      0,
      "Fan Shot",
    ],
  );

  run(
    `
      UPDATE fan_submissions
      SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP, approved_image_id = ?
      WHERE id = ?
    `,
    [imageResult.lastInsertRowid, submissionId],
  );

  const updated = get("SELECT * FROM fan_submissions WHERE id = ?", [submissionId]);
  response.json({ submission: mapSubmissionRow(updated) });
});

router.post("/submissions/:submissionId/reject", (request, response) => {
  const submissionId = Number(request.params.submissionId);
  const submission = get("SELECT * FROM fan_submissions WHERE id = ?", [submissionId]);

  if (!submission) {
    response.status(404).json({ error: "投稿不存在" });
    return;
  }

  run(
    `
      UPDATE fan_submissions
      SET status = 'rejected', reviewed_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
    [submissionId],
  );

  const updated = get("SELECT * FROM fan_submissions WHERE id = ?", [submissionId]);
  response.json({ submission: mapSubmissionRow(updated) });
});

export default router;

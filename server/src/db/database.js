import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import initSqlJs from "sql.js";
import { databaseFilePath } from "../config/paths.js";
import { seedComments, seedImages } from "../data/seed.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlJsDistPath = path.resolve(__dirname, "../../../node_modules/sql.js/dist");

const SQL = await initSqlJs({
  locateFile: (file) => path.join(sqlJsDistPath, file),
});

const fileBuffer = fs.existsSync(databaseFilePath)
  ? fs.readFileSync(databaseFilePath)
  : null;
const database = fileBuffer ? new SQL.Database(fileBuffer) : new SQL.Database();

function saveDatabase() {
  const data = database.export();
  fs.writeFileSync(databaseFilePath, Buffer.from(data));
}

function exec(sql) {
  database.run(sql);
}

function all(sql, params = []) {
  const statement = database.prepare(sql);
  statement.bind(params);
  const rows = [];

  while (statement.step()) {
    rows.push(statement.getAsObject());
  }

  statement.free();
  return rows;
}

function get(sql, params = []) {
  return all(sql, params)[0] || null;
}

function run(sql, params = []) {
  database.run(sql, params);
  const changes = database.getRowsModified();
  const row = get("SELECT last_insert_rowid() AS id");
  saveDatabase();

  return {
    changes,
    lastInsertRowid: row?.id ?? null,
  };
}

function createTables() {
  exec(`
    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      filename TEXT NOT NULL,
      fan_count INTEGER NOT NULL DEFAULT 0,
      like_count INTEGER NOT NULL DEFAULT 0,
      featured INTEGER NOT NULL DEFAULT 0,
      tag TEXT NOT NULL DEFAULT 'Daily',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_id INTEGER NOT NULL,
      author TEXT NOT NULL,
      author_badge TEXT,
      avatar_emoji TEXT,
      visitor_id TEXT,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS fan_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      author_badge TEXT,
      avatar_emoji TEXT,
      visitor_id TEXT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      file_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      reviewed_at TEXT,
      approved_image_id INTEGER,
      FOREIGN KEY (approved_image_id) REFERENCES images(id) ON DELETE SET NULL
    );
  `);

  const commentColumns = all("PRAGMA table_info(comments)");
  const submissionColumns = all("PRAGMA table_info(fan_submissions)");

  if (!commentColumns.some((column) => column.name === "author_badge")) {
    exec("ALTER TABLE comments ADD COLUMN author_badge TEXT");
  }
  if (!commentColumns.some((column) => column.name === "avatar_emoji")) {
    exec("ALTER TABLE comments ADD COLUMN avatar_emoji TEXT");
  }
  if (!commentColumns.some((column) => column.name === "visitor_id")) {
    exec("ALTER TABLE comments ADD COLUMN visitor_id TEXT");
  }
  if (!submissionColumns.some((column) => column.name === "author_badge")) {
    exec("ALTER TABLE fan_submissions ADD COLUMN author_badge TEXT");
  }
  if (!submissionColumns.some((column) => column.name === "avatar_emoji")) {
    exec("ALTER TABLE fan_submissions ADD COLUMN avatar_emoji TEXT");
  }
  if (!submissionColumns.some((column) => column.name === "visitor_id")) {
    exec("ALTER TABLE fan_submissions ADD COLUMN visitor_id TEXT");
  }

  saveDatabase();
}

function seedIfEmpty() {
  const countRow = get("SELECT COUNT(*) AS count FROM images");

  if (Number(countRow?.count || 0) > 0) {
    return;
  }

  seedImages.forEach((image) => {
    run(
      `
        INSERT INTO images (slug, title, subtitle, description, filename, fan_count, like_count, featured, tag)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        image.slug,
        image.title,
        image.subtitle,
        image.description,
        image.filename,
        image.fanCount,
        image.likeCount,
        image.featured,
        image.tag,
      ],
    );
  });

  seedComments.forEach((comment) => {
    const image = get("SELECT id FROM images WHERE slug = ?", [comment.imageSlug]);

    if (image) {
      run(
        "INSERT INTO comments (image_id, author, content) VALUES (?, ?, ?)",
        [image.id, comment.author, comment.content],
      );
    }
  });
}

export function initializeDatabase() {
  createTables();
  seedIfEmpty();
}

export function mapImageRow(row) {
  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    tag: row.tag,
    fanCount: Number(row.fan_count),
    likeCount: Number(row.like_count),
    commentCount: Number(row.comment_count ?? 0),
    featured: Boolean(Number(row.featured)),
    imageUrl: `/media/${row.filename}`,
    createdAt: row.created_at,
  };
}

export function mapCommentRow(row) {
  return {
    id: Number(row.id),
    imageId: Number(row.image_id),
    author: row.author,
    authorBadge: row.author_badge || null,
    avatarEmoji: row.avatar_emoji || "🌹",
    visitorId: row.visitor_id || null,
    content: row.content,
    createdAt: row.created_at,
    imageTitle: row.image_title,
  };
}

export function mapSubmissionRow(row) {
  return {
    id: Number(row.id),
    author: row.author,
    authorBadge: row.author_badge || null,
    avatarEmoji: row.avatar_emoji || "🌹",
    visitorId: row.visitor_id || null,
    title: row.title,
    description: row.description,
    fileName: row.file_name,
    mimeType: row.mime_type,
    status: row.status,
    createdAt: row.created_at,
    reviewedAt: row.reviewed_at,
    approvedImageId: row.approved_image_id ? Number(row.approved_image_id) : null,
    imageUrl: `/media/${row.file_name}`,
  };
}

export { all, get, run };

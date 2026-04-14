import { CheckCircle2, Shield, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";

function formatTime(value) {
  return new Date(value).toLocaleString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [comments, setComments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLoadAdminData(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const [commentsData, submissionsData] = await Promise.all([
        api.getAdminComments(adminKey.trim()),
        api.getAdminSubmissions(adminKey.trim()),
      ]);

      setComments(commentsData.comments);
      setSubmissions(submissionsData.submissions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await api.deleteComment(commentId, adminKey.trim());
      setComments((current) => current.filter((item) => item.id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleApproveSubmission(submissionId) {
    try {
      const data = await api.approveSubmission(submissionId, adminKey.trim());
      setSubmissions((current) =>
        current.map((item) => (item.id === submissionId ? data.submission : item)),
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRejectSubmission(submissionId) {
    try {
      const data = await api.rejectSubmission(submissionId, adminKey.trim());
      setSubmissions((current) =>
        current.map((item) => (item.id === submissionId ? data.submission : item)),
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="section-shell py-12">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blush-500/15 p-3 text-blush-200">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blush-200/70">
              Admin Panel
            </p>
            <h1 className="text-3xl font-semibold text-white">评论与投稿审核后台</h1>
          </div>
        </div>

        <form onSubmit={handleLoadAdminData} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="password"
            value={adminKey}
            onChange={(event) => setAdminKey(event.target.value)}
            placeholder="输入管理员密钥"
            className="flex-1 rounded-full border border-white/10 bg-black/20 px-5 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blush-300/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "加载中..." : "读取后台数据"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">粉丝投稿审核</h2>
          <span className="text-sm text-slate-400">共 {submissions.length} 条投稿</span>
        </div>

        <div className="space-y-4">
          {submissions.map((submission) => (
            <article
              key={submission.id}
              className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
            >
              <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/5">
                  <img
                    src={submission.imageUrl}
                    alt={submission.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{submission.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${submission.status === "approved" ? "bg-emerald-400/15 text-emerald-200" : submission.status === "rejected" ? "bg-rose-400/15 text-rose-200" : "bg-amber-400/15 text-amber-200"}`}>
                      {submission.status === "approved" ? "已通过" : submission.status === "rejected" ? "已拒绝" : "待审核"}
                    </span>
                  </div>

                  <p className="text-sm text-slate-400">
                    投稿人：{submission.author} · 提交于 {formatTime(submission.createdAt)}
                  </p>
                  <p className="text-sm leading-7 text-slate-300">{submission.description}</p>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleApproveSubmission(submission.id)}
                      disabled={submission.status === "approved"}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      审核通过
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRejectSubmission(submission.id)}
                      disabled={submission.status === "rejected"}
                      className="inline-flex items-center gap-2 rounded-full border border-rose-300/30 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-100 transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" />
                      拒绝投稿
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {!submissions.length ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center text-slate-400">
              输入管理员密钥后，这里会显示粉丝投稿。
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">评论审核</h2>
          <span className="text-sm text-slate-400">共 {comments.length} 条评论</span>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{comment.author}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    图片：{comment.imageTitle} · {formatTime(comment.createdAt)}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                    {comment.content}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20"
                >
                  <Trash2 className="h-4 w-4" />
                  删除评论
                </button>
              </div>
            </article>
          ))}

          {!comments.length ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/5 px-6 py-10 text-center text-slate-400">
              输入管理员密钥后，这里会显示所有评论。
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

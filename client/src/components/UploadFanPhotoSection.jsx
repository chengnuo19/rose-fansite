import { ImagePlus, LoaderCircle, UploadCloud } from "lucide-react";
import { useState } from "react";
import IdentityBadge from "./IdentityBadge";
import { useFanIdentity } from "../hooks/useFanIdentity";
import { availableAvatars } from "../lib/identity";
import { api } from "../lib/api";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("图片读取失败，请重新选择。"));
    reader.readAsDataURL(file);
  });
}

export default function UploadFanPhotoSection() {
  const { identity, setIdentity } = useFanIdentity();
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    setMessage("");
    setError("");

    if (!selected) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!identity.nickname.trim() || !form.title.trim() || !form.description.trim() || !file) {
      setError("请先填写昵称、标题、描述并选择一张图片。");
      return;
    }

    setSubmitting(true);

    try {
      const imageBase64 = await fileToDataUrl(file);
      const data = await api.submitPhoto({
        author: identity.nickname.trim(),
        authorBadge: identity.badge,
        avatarEmoji: identity.avatarEmoji,
        visitorId: identity.visitorId,
        title: form.title.trim(),
        description: form.description.trim(),
        imageBase64,
        mimeType: file.type,
      });

      setForm({ title: "", description: "" });
      setFile(null);
      setPreview("");
      setMessage(data.message || "投稿成功，等待审核中。");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-shell pt-14">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.28em] text-blush-100/80">
            <ImagePlus className="h-4 w-4 text-blush-300" />
            Fan Upload
          </div>
          <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">
            粉丝也可以投稿自己的 Rosé 收藏图。
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            现在支持粉丝上传照片了。投稿不会立刻公开，管理员审核通过后，
            它会自动进入首页图片墙，继续参与点赞和评论互动。
          </p>

          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              仅支持 JPG、PNG、WEBP 图片，单张不超过 8MB。
            </div>
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              推荐上传清晰、适合公开展示的照片，并填写简短标题和描述。
            </div>
            <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
              审核通过后会自动加入图片墙，成为新的互动内容。
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-7">
          <div className="space-y-4">
            <IdentityBadge identity={identity} />
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={identity.nickname}
                onChange={(event) => setIdentity((current) => ({ ...current, nickname: event.target.value.slice(0, 20) }))}
                placeholder="你的昵称"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blush-300/50"
              />
              <div className="flex flex-wrap gap-2">
                {availableAvatars.map((avatar) => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setIdentity((current) => ({ ...current, avatarEmoji: avatar }))}
                    className={`rounded-2xl border px-3 py-2 text-lg transition ${identity.avatarEmoji === avatar ? "border-blush-300 bg-blush-400/15" : "border-white/10 bg-white/5"}`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
            <input
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="这张图想取什么标题"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blush-300/50"
            />
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              placeholder="写一句你为什么喜欢这张照片"
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blush-300/50"
            />
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-white/15 bg-black/20 px-5 py-8 text-center text-slate-300 transition hover:border-blush-300/40 hover:bg-white/5">
              <UploadCloud className="h-8 w-8 text-blush-300" />
              <span className="mt-3 text-sm">点击选择一张粉丝投稿图片</span>
              <span className="mt-1 text-xs text-slate-500">JPG / PNG / WEBP，最多 8MB</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {preview ? (
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
              <img src={preview} alt="投稿预览" className="h-72 w-full object-cover" />
            </div>
          ) : null}

          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
          {message ? <p className="mt-4 text-sm text-emerald-300">{message}</p> : null}

          <button type="submit" disabled={submitting} className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            {submitting ? "投稿提交中..." : "提交粉丝投稿"}
          </button>
        </form>
      </div>
    </section>
  );
}

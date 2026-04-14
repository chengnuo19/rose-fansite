import { Heart, MessageCircleMore, Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import IdentityBadge from "./IdentityBadge";
import { useFanIdentity } from "../hooks/useFanIdentity";
import { availableAvatars } from "../lib/identity";
import { api } from "../lib/api";
import { commentReactionOptions } from "../lib/siteFun";

const REACTIONS_STORAGE_KEY = "rose-fansite-comment-reactions";

function formatTime(value) {
  return new Date(value).toLocaleString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function readReactionStore() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(window.localStorage.getItem(REACTIONS_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeReactionStore(value) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(REACTIONS_STORAGE_KEY, JSON.stringify(value));
}

function normalizeReactionMap(commentId, reactionStore) {
  const commentRecord = reactionStore[commentId] || { totals: {}, voters: {} };
  const totals = commentReactionOptions.reduce((result, reaction) => {
    result[reaction.id] = Number(commentRecord.totals?.[reaction.id] || 0);
    return result;
  }, {});

  return {
    totals,
    voters: commentRecord.voters || {},
  };
}

export default function FanModal({ image, isOpen, onClose, onLike, onCommentCreated }) {
  const { identity, setIdentity } = useFanIdentity();
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState("");
  const [reactionStore, setReactionStore] = useState(() => readReactionStore());

  useEffect(() => {
    if (!isOpen || !image) {
      return;
    }

    let mounted = true;
    setLoadingComments(true);
    setError("");

    api.getComments(image.id)
      .then((data) => {
        if (mounted) {
          setComments(data.comments);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoadingComments(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [image, isOpen]);

  if (!isOpen || !image) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!identity.nickname.trim() || !form.content.trim()) {
      setError("昵称和评论内容都要填写。");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const data = await api.createComment(image.id, {
        author: identity.nickname.trim(),
        authorBadge: identity.badge,
        avatarEmoji: identity.avatarEmoji,
        visitorId: identity.visitorId,
        content: form.content.trim(),
      });

      setComments((current) => [data.comment, ...current]);
      setForm({ content: "" });
      onCommentCreated(data.image);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReaction(commentId, reactionId) {
    const voterKey = identity.visitorId || "guest";

    setReactionStore((current) => {
      const next = { ...current };
      const normalized = normalizeReactionMap(commentId, current);
      const previousReaction = normalized.voters[voterKey];

      if (previousReaction) {
        normalized.totals[previousReaction] = Math.max(
          0,
          normalized.totals[previousReaction] - 1,
        );
      }

      if (previousReaction === reactionId) {
        delete normalized.voters[voterKey];
      } else {
        normalized.totals[reactionId] += 1;
        normalized.voters[voterKey] = reactionId;
      }

      next[commentId] = normalized;
      writeReactionStore(next);
      return next;
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-md sm:items-center sm:p-4">
      <div className="max-h-[96vh] w-full overflow-hidden rounded-t-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/50 sm:max-w-6xl sm:rounded-[2rem]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blush-200/70">Fan Interaction</p>
            <h3 className="mt-1 text-xl font-semibold text-white">{image.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:bg-white/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid max-h-[calc(96vh-76px)] overflow-y-auto lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
            <img src={image.imageUrl} alt={image.title} className="h-full max-h-[70vh] w-full object-cover" />
          </div>

          <div className="flex flex-col">
            <div className="border-b border-white/10 px-5 py-5 sm:px-6">
              <p className="text-sm leading-7 text-slate-300">{image.description}</p>
              <div className="mt-5 flex gap-3">
                <button type="button" onClick={() => onLike(image.id)} className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blush-400">
                  <Heart className="h-4 w-4" />
                  点赞 {image.likeCount}
                </button>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200">
                  <MessageCircleMore className="h-4 w-4 text-sky-300" />
                  评论 {image.commentCount}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-b border-white/10 px-5 py-5 sm:px-6">
              <div className="space-y-4">
                <IdentityBadge identity={identity} />
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input
                    value={identity.nickname}
                    onChange={(event) => setIdentity((current) => ({ ...current, nickname: event.target.value.slice(0, 20) }))}
                    placeholder="你的昵称"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blush-300/50"
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
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={(event) => setForm({ content: event.target.value })}
                  placeholder="写下你想对 Rosé 说的话..."
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blush-300/50"
                />
              </div>

              {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}

              <button type="submit" disabled={submitting} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
                <Send className="h-4 w-4" />
                {submitting ? "提交中..." : "发布评论"}
              </button>
            </form>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">粉丝评论</h4>
                <span className="text-sm text-slate-400">{loadingComments ? "加载中..." : `${comments.length} 条`}</span>
              </div>

              <div className="space-y-3">
                {!loadingComments && comments.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 px-5 py-8 text-center text-sm text-slate-400">
                    还没有评论，来做第一个留言的人吧。
                  </div>
                ) : null}

                {comments.map((comment) => {
                  const reactionState = normalizeReactionMap(comment.id, reactionStore);
                  const activeReaction = reactionState.voters[identity.visitorId || "guest"];

                  return (
                    <article key={comment.id} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
                            {comment.avatarEmoji || "🌹"}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {comment.author} {comment.authorBadge ? <span className="text-blush-200">{comment.authorBadge}</span> : null}
                            </p>
                            {comment.visitorId ? <p className="text-xs text-slate-500">{comment.visitorId}</p> : null}
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">{formatTime(comment.createdAt)}</p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{comment.content}</p>

                      <div className="mt-4 border-t border-white/10 pt-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">评论表情反应</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {commentReactionOptions.map((reaction) => (
                            <button
                              key={reaction.id}
                              type="button"
                              onClick={() => handleReaction(comment.id, reaction.id)}
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                                activeReaction === reaction.id
                                  ? "border-blush-300/40 bg-blush-400/10 text-white"
                                  : "border-white/10 bg-black/20 text-slate-300 hover:bg-white/10"
                              }`}
                            >
                              <span>{reaction.emoji}</span>
                              <span>{reaction.label}</span>
                              <span className="text-xs text-slate-400">{reactionState.totals[reaction.id]}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

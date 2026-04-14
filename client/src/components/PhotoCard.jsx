import { Heart, MessageCircleMore, Users } from "lucide-react";

function formatCompact(value) {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function PhotoCard({ image, onOpen, onLike }) {
  return (
    <article className="group photo-card-shell relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-blush-300/30">
      <button
        type="button"
        className="relative block aspect-[4/5] w-full overflow-hidden"
        onClick={() => onOpen(image)}
      >
        <img
          src={image.imageUrl}
          alt={image.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="photo-card-glow absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-left">
          <p className="text-xs uppercase tracking-[0.28em] text-blush-200/80">
            {image.tag}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{image.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{image.subtitle}</p>
        </div>
      </button>

      <div className="space-y-4 px-5 py-4">
        <div className="grid grid-cols-3 gap-2 text-xs text-slate-300 sm:text-sm">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-sky-300" />
              <span>粉丝</span>
            </div>
            <p className="mt-1 font-semibold text-white">{formatCompact(image.fanCount)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-blush-300" />
              <span>点赞</span>
            </div>
            <p className="mt-1 font-semibold text-white">{formatCompact(image.likeCount)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
            <div className="flex items-center gap-2">
              <MessageCircleMore className="h-4 w-4 text-amber-300" />
              <span>评论</span>
            </div>
            <p className="mt-1 font-semibold text-white">{image.commentCount}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onLike(image.id)}
            className="flex-1 rounded-full bg-blush-500 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-blush-400 active:scale-[0.98]"
          >
            点赞应援
          </button>
          <button
            type="button"
            onClick={() => onOpen(image)}
            className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            看评论
          </button>
        </div>
      </div>
    </article>
  );
}

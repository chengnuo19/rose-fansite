import { Flame, Heart, ImagePlus, MessageCircleMore, Mic2, Sparkles } from "lucide-react";

function formatCompact(value) {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

const fanLines = [
  "今天也在为 Rosé 的每个瞬间心动。",
  "欢迎把喜欢写成评论，让这面照片墙更有温度。",
  "每一次点赞，都会让应援热度再往上跳一点。",
  "粉丝互动会持续汇聚到这面照片墙与热度榜单中。",
];

export default function FanPulseSection({ images, recentComments, activeFans, currentLine }) {
  const hottest = [...images]
    .sort(
      (a, b) =>
        b.likeCount + b.commentCount * 12 + b.fanCount / 1000 -
        (a.likeCount + a.commentCount * 12 + a.fanCount / 1000),
    )
    .slice(0, 5);
  const latestFanShots = [...images]
    .filter((item) => item.tag === "Fan Shot")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <section className="section-shell pt-14">
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blush-500/12 via-white/5 to-sky-400/10 p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-blush-200/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-blush-100/80">
              <Flame className="h-4 w-4 text-blush-300" />
              Fan Pulse
            </span>
            <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm text-emerald-200">
              当前活跃粉丝约 {formatCompact(activeFans)}
            </span>
          </div>

          <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">
            首页互动内容实时汇聚在这里。
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
            首页会同时展示最热内容、最新评论和粉丝投稿内容，方便集中查看当前互动热度与更新动态。
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
            <div className="rounded-2xl bg-white/10 p-3 text-blush-200">
              <Mic2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">今日应援语录</p>
              <p className="mt-2 text-lg leading-8 text-white">{currentLine}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {fanLines.map((line) => (
              <div key={line} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-300">
                {line}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-blush-200">
            <Heart className="h-4 w-4 fill-current" />
            <p className="text-sm uppercase tracking-[0.3em]">首页最热榜</p>
          </div>
          <div className="mt-5 space-y-3">
            {hottest.map((item, index) => (
              <div key={item.id} className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">No.{index + 1}</p>
                    <p className="mt-1 font-medium text-white">{item.title}</p>
                  </div>
                  <p className="text-sm font-semibold text-blush-200">{formatCompact(item.likeCount)} 赞</p>
                </div>
                <div className="mt-3 flex gap-4 text-xs text-slate-400">
                  <span>{item.commentCount} 条评论</span>
                  <span>{formatCompact(item.fanCount)} 粉丝热度</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-amber-200">
            <Sparkles className="h-4 w-4" />
            <p className="text-sm uppercase tracking-[0.3em]">最新评论预览</p>
          </div>

          <div className="mt-5 grid gap-4">
            {recentComments.map((comment) => (
              <article key={comment.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg">
                      {comment.avatarEmoji || "🌹"}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {comment.author}
                        {comment.authorBadge ? <span className="ml-2 text-blush-200">{comment.authorBadge}</span> : null}
                      </p>
                      {comment.visitorId ? <p className="text-xs text-slate-500">{comment.visitorId}</p> : null}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{comment.imageTitle}</span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-300">{comment.content}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-sky-200">
            <ImagePlus className="h-4 w-4" />
            <p className="text-sm uppercase tracking-[0.3em]">最新投稿专区</p>
          </div>

          {latestFanShots.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {latestFanShots.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                  <img src={item.imageUrl} alt={item.title} className="h-52 w-full object-cover" />
                  <div className="p-4">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.subtitle}</p>
                    <div className="mt-3 flex gap-4 text-xs text-slate-500">
                      <span>{item.likeCount} 赞</span>
                      <span>{item.commentCount} 评论</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 px-5 py-10 text-center text-sm text-slate-400">
              还没有审核通过的粉丝投稿。可以先去首页下方提交第一张粉丝照片。
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

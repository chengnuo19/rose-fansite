import { MessageCircleMore, PlayCircle, Sparkles, Users } from "lucide-react";

function formatCompact(value) {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function HeroSection({ stats }) {
  const items = [
    { label: "图片数量", value: stats.totalPhotos, icon: PlayCircle },
    { label: "总粉丝热度", value: formatCompact(stats.totalFans), icon: Users },
    { label: "累计评论", value: stats.totalComments, icon: MessageCircleMore },
  ];

  return (
    <section className="section-shell pt-8 sm:pt-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-black/40">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          src="/media/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-blush-500/20" />

        <div className="relative grid gap-10 px-6 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blush-100">
              <Sparkles className="h-4 w-4 text-blush-300" />
              Rosé fan-made archive with love
            </div>
            <h1 className="headline max-w-3xl">
              为喜欢朴彩英的人，做一个会发光的互动图片站。
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              首页展示你提供的图片素材，支持点赞、评论和管理员删评。
              整个站点围绕粉丝互动设计，既能看图，也能留下自己的应援留言。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#gallery"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
              >
                进入图片墙
              </a>
              <a
                href="#community"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                查看粉丝互动
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="glass-panel rounded-[1.75rem] p-5 shadow-xl shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-white">
                        {item.value}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-3 text-blush-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

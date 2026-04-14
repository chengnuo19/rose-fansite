import { CalendarDays, ExternalLink, Flame, Radio, Sparkles } from "lucide-react";
import { roseUpdateSnapshot } from "../lib/roseUpdates";

const accentBlocks = [
  "from-fuchsia-500/15 to-white/[0.04]",
  "from-sky-400/15 to-white/[0.04]",
  "from-amber-300/15 to-white/[0.04]",
];

export default function AboutPage() {
  const { lastChecked, socialPlatforms, recentUpdates, recentActivities, sourceNote } =
    roseUpdateSnapshot;

  return (
    <main className="section-shell py-12">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-blush-200/70">
            About Rosé
          </p>
          <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
            Rosé 最近动态与公开活动
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
            这里整理了 Rosé 最近可追踪的社媒入口、公开活动和近况节点。
            页面数据按 {lastChecked} 核对，方便粉丝快速查看近期动态。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={socialPlatforms[0]?.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
            >
              直达 Instagram
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={socialPlatforms[1]?.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              直达 TikTok
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
          <img
            src="/media/e44ccaac0ac9681bf82d2909403ab35f.jpg"
            alt="Rosé recent portrait"
            className="h-full min-h-[360px] w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-center gap-3">
          <Radio className="h-5 w-5 text-blush-300" />
          <h2 className="text-2xl font-semibold text-white">官方社媒入口</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {socialPlatforms.map((item, index) => (
            <article
              key={item.name}
              className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${accentBlocks[index % accentBlocks.length]} p-6`}
            >
              <p className="text-sm uppercase tracking-[0.28em] text-slate-300">{item.name}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{item.handle}</h3>
              <p className="mt-2 text-sm text-slate-400">约 {item.followers} followers</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.note}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blush-200 transition hover:text-white"
              >
                打开官方主页
                <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-amber-300" />
            <h2 className="text-2xl font-semibold text-white">最近动态</h2>
          </div>

          <div className="mt-6 space-y-4">
            {recentUpdates.map((item) => (
              <article
                key={`${item.date}-${item.title}`}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-blush-200/70">{item.date}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.summary}</p>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-white"
                >
                  来源：{item.sourceLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-sky-300" />
            <h2 className="text-2xl font-semibold text-white">最近参加的活动</h2>
          </div>

          <div className="mt-6 space-y-4">
            {recentActivities.map((item) => (
              <article
                key={`${item.date}-${item.name}`}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-blush-200/70">{item.date}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.name}</h3>
                  </div>
                  <Flame className="mt-1 h-5 w-5 text-blush-300" />
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-slate-200 transition hover:text-white"
                >
                  查看来源：{item.sourceLabel}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-white/10 bg-black/20 px-6 py-6 sm:px-8">
        <p className="text-sm uppercase tracking-[0.3em] text-blush-200/70">Notes</p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">{sourceNote}</p>
      </section>
    </main>
  );
}

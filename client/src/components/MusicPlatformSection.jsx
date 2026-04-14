import { ExternalLink, Music4, Radio, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { bgmTracks } from "../lib/siteFun";

const artistLinks = [
  {
    id: "apple",
    label: "Apple Music",
    url: "https://music.apple.com/us/artist/ros%C3%A9/1553255346",
    description:
      "直接进入 Rosé 的 Apple Music 歌手页，可继续浏览单曲、专辑与相关推荐。",
  },
  {
    id: "qq",
    label: "QQ 音乐",
    url: "https://y.qq.com/n/ryqq/search?w=ROS%C3%89",
    description:
      "直接进入 QQ 音乐的 Rosé 页面入口，适合继续在平台内播放与查看相关内容。",
  },
];

export default function MusicPlatformSection() {
  const [activeTrackId, setActiveTrackId] = useState(bgmTracks[0].id);
  const [isExpanded, setIsExpanded] = useState(false);

  const activeIndex = useMemo(
    () => bgmTracks.findIndex((track) => track.id === activeTrackId),
    [activeTrackId],
  );
  const activeTrack = bgmTracks[activeIndex] || bgmTracks[0];

  return (
    <section className="section-shell pt-14">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-aurora-300/10 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
              Music Station
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              直达 Rosé 的音乐平台主页
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              这里整合了常用听歌平台入口，点击后会直接跳转到 Rosé 的平台页面，
              方便继续浏览歌手主页、作品列表与平台内推荐内容。
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            {isExpanded ? "收起音乐入口" : "展开音乐入口"}
          </button>
        </div>

        {isExpanded ? (
          <div className="mt-8 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-black/25 via-lilac-300/10 to-aurora-300/10 p-6">
              <div className="flex items-center gap-4">
                <img
                  src={activeTrack.poster}
                  alt={activeTrack.title}
                  className="h-24 w-24 rounded-[1.4rem] object-cover shadow-xl shadow-black/30"
                />
                <div>
                  <p className="text-sm text-slate-400">当前推荐曲目</p>
                  <h3 className="mt-1 text-2xl font-semibold text-white">{activeTrack.title}</h3>
                  <p className="mt-2 text-sm text-sky-200">{activeTrack.subtitle}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">{activeTrack.vibe}</p>

              <div className="mt-6 grid gap-4">
                {artistLinks.map((platform) => (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-blush-300/35 hover:bg-white/[0.08]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-blush-200/70">
                          {platform.label}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                          打开 Rosé 歌手页面
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                          {platform.description}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white/10 p-3 text-blush-200">
                        <ExternalLink className="h-5 w-5" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blush-400/15 p-3 text-blush-200">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                      平台入口说明
                    </p>
                    <p className="mt-1 text-sm leading-7 text-slate-300">
                      当前音乐区采用平台跳转方式，点击后会直接进入 Rosé 的平台页面继续播放与浏览。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {bgmTracks.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`rounded-[1.4rem] border px-5 py-4 text-left transition ${
                    track.id === activeTrackId
                      ? "border-blush-300/40 bg-gradient-to-br from-blush-400/12 to-aurora-300/12"
                      : "border-white/10 bg-black/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={track.poster}
                      alt={track.title}
                      className="h-16 w-16 rounded-[1rem] object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{track.title}</p>
                      <p className="mt-1 text-sm text-sky-200">{track.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{track.vibe}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                      <Music4 className="h-3.5 w-3.5" />
                      Apple Music
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      QQ 音乐
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

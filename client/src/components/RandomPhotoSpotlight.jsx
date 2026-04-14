import { Shuffle } from "lucide-react";

export default function RandomPhotoSpotlight({ onPick }) {
  return (
    <section className="section-shell pt-12">
      <div className="rounded-[2rem] border border-white/10 bg-black/20 p-6 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
              Surprise Me
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">随机看一张 Rosé</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              不想自己选图的时候，就让站点随机翻到一张。这个按钮特别适合做“今日第一张图”的感觉。
            </p>
          </div>
          <button
            type="button"
            onClick={onPick}
            className="inline-flex items-center gap-2 rounded-full bg-blush-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blush-400"
          >
            <Shuffle className="h-4 w-4" />
            随机打开一张
          </button>
        </div>
      </div>
    </section>
  );
}

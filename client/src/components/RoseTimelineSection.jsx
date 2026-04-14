import { timelineMoments } from "../lib/siteFun";

export default function RoseTimelineSection() {
  return (
    <section className="section-shell pt-14">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
          Timeline
        </p>
        <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
          Rosé 时间轴
        </h2>
        <div className="mt-8 space-y-4">
          {timelineMoments.map((moment) => (
            <article
              key={`${moment.year}-${moment.title}`}
              className="timeline-item grid gap-4 rounded-[1.6rem] border border-white/10 bg-black/20 px-5 py-5 md:grid-cols-[120px_1fr]"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
                  {moment.year}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{moment.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{moment.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

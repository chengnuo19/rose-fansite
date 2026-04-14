import { driftQuotes } from "../lib/siteFun";

export default function FloatingCommentWall({ comments }) {
  const items = comments.slice(0, 6);

  return (
    <section className="section-shell pt-14">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
              Drift Wall
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              粉丝留言漂流墙
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-300">
            {driftQuotes[items.length % driftQuotes.length]}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {items.map((comment, index) => (
            <article
              key={comment.id}
              className="drift-card rounded-[1.7rem] border border-white/10 bg-black/20 px-5 py-5"
              style={{ animationDelay: `${index * 0.7}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-lg">
                  {comment.avatarEmoji || "🌹"}
                </div>
                <div>
                  <p className="font-medium text-white">
                    {comment.author}
                    {comment.authorBadge ? (
                      <span className="ml-2 text-blush-200">{comment.authorBadge}</span>
                    ) : null}
                  </p>
                  <p className="text-xs text-slate-500">来自 {comment.imageTitle}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{comment.content}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

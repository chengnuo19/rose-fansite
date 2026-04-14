import { useMemo, useState } from "react";
import { quizQuestions, quizResults } from "../lib/siteFun";

export default function QuizSection() {
  const [answers, setAnswers] = useState({});

  const result = useMemo(() => {
    const values = Object.values(answers);

    if (values.length < quizQuestions.length) {
      return null;
    }

    const score = values.reduce((map, value) => {
      map[value] = (map[value] || 0) + 1;
      return map;
    }, {});

    const top = Object.entries(score).sort((a, b) => b[1] - a[1])[0]?.[0];
    return quizResults[top] || null;
  }, [answers]);

  return (
    <section className="section-shell pt-14">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
          Fan Quiz
        </p>
        <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
          小测试：你更像哪一种 Rosé 氛围粉丝？
        </h2>

        <div className="mt-8 grid gap-4 xl:grid-cols-3">
          {quizQuestions.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <p className="text-lg font-semibold text-white">{item.question}</p>
              <div className="mt-4 space-y-3">
                {item.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() =>
                      setAnswers((current) => ({ ...current, [item.id]: option.result }))
                    }
                    className={`block w-full rounded-[1rem] border px-4 py-3 text-left text-sm transition ${
                      answers[item.id] === option.result
                        ? "border-blush-300/40 bg-blush-400/10 text-white"
                        : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        {result ? (
          <div className="mt-6 rounded-[1.7rem] border border-blush-300/20 bg-gradient-to-r from-blush-400/12 to-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-blush-200/80">Quiz Result</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{result.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{result.description}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

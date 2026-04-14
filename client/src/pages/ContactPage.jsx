import { ExternalLink, Mail, Radio, Star } from "lucide-react";

const fanAccounts = [
  {
    name: "fanpagerosie Linktree",
    handle: "@fanpagerosie",
    description: "集合了 Rosé 相关官方入口和部分粉丝站跳转，适合放在联系页做导航入口。",
    url: "https://linktr.ee/fanpagerosie",
  },
  {
    name: "BLACKPINK GLOBAL",
    handle: "@BLACKPINKGLOBAL",
    description: "活跃度很高的 BLACKPINK 全球粉丝资讯账号，也会持续转发 Rosé 相关活动和热度动态。",
    url: "https://x.com/BLACKPINKGLOBAL",
  },
  {
    name: "Fansé with Rosé - FWR",
    handle: "@fwr_vn",
    description: "偏 Rosé 向的粉丝应援账号，内容更集中在投票、打榜和生日应援等互动活动。",
    url: "https://twstalker.com/fwr_vn",
  },
];

const cards = [
  {
    title: "联系邮箱",
    description: "如果你想继续补图、换文案、加模块，或者把这个站继续做成长期运营版，可以先从邮箱联系开始。",
  },
  {
    title: "粉丝站入口",
    description: "这里放了几条 Rosé 相关粉丝账号链接，方便从站内直接跳过去补近况、找应援信息或继续扩展内容。",
  },
  {
    title: "页面用途",
    description: "这一块现在更像一个联系与扩展面板，不只是占位文案，后面也可以继续接更多官方站和粉丝站入口。",
  },
];

export default function ContactPage() {
  return (
    <main className="section-shell py-12">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-blush-200/70">
          Contact
        </p>
        <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">
          想继续改这个站，可以从这里开始。
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          我已经把你提供的邮箱加入到这里，同时补了一些 Rosé 粉丝站账号入口。
          如果后面你想把这块继续做成真正的联络页，也可以再补更多站点、社媒和投稿方式。
        </p>

        <div className="mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <a
            href="mailto:roiseareroses@yeah.net"
            className="group rounded-[1.75rem] border border-blush-300/20 bg-gradient-to-br from-blush-400/10 to-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blush-300/40"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blush-200/70">
                  Email
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  roiseareroses@yeah.net
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  点击这里就可以直接调用本机邮箱应用。如果你之后要把它改成商务合作、
                  投稿联系或粉丝来信入口，这个位置也很合适。
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 text-blush-200 transition group-hover:bg-white/15">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </a>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
            <div className="flex items-center gap-2 text-blush-200">
              <Radio className="h-4 w-4" />
              <p className="text-xs uppercase tracking-[0.3em]">Fan Links</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              下面这些是我帮你补进去的第三方粉丝账号入口，适合放在联系页做延伸跳转。
            </p>
            <p className="mt-3 text-xs leading-6 text-slate-500">
              注：它们不是官方账号，而是粉丝维护的资讯/应援入口。
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.title}
            className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6"
          >
            <h2 className="text-xl font-semibold text-white">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {card.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-6 sm:p-8">
        <div className="mb-5 flex items-center gap-3">
          <Star className="h-5 w-5 text-amber-300" />
          <h2 className="text-2xl font-semibold text-white">Rosé 粉丝站账号链接</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {fanAccounts.map((account) => (
            <a
              key={account.name}
              href={account.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-blush-300/30 hover:bg-white/[0.06]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-blush-200/70">
                Fan Account
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{account.name}</h3>
              <p className="mt-2 text-sm text-sky-200">{account.handle}</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {account.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                打开链接
                <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

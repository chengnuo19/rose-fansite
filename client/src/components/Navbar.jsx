import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "首页" },
  { to: "/about", label: "偶像近况" },
  { to: "/contact", label: "联系我们" },
  { to: "/admin", label: "管理员" },
];

export default function Navbar({ theme }) {
  const themeLabel =
    theme === "cream"
      ? "Soft Cream"
      : theme === "editorial"
        ? "Editorial"
        : "Night Stage";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blush-400 to-sky-400 text-slate-950 shadow-glow">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-blush-200/80">
              Fan Site
            </p>
            <p className="font-display text-2xl text-white">Rosé Gallery</p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
            {themeLabel}
          </span>
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

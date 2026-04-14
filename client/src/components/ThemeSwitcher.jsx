import { themePresets } from "../lib/siteFun";

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  return (
    <section className="section-shell pt-12">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-7">
        <p className="text-sm uppercase tracking-[0.3em] text-blush-200/80">
          Theme Switch
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">切换粉丝站的氛围皮肤</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              现在整个站支持三种主题，你可以按当天心情切成舞台夜色、软奶油或复古杂志。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {themePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onThemeChange(preset.id)}
                className={`rounded-[1.4rem] border px-4 py-4 text-left transition ${
                  currentTheme === preset.id
                    ? "border-blush-300/40 bg-blush-400/10"
                    : "border-white/10 bg-black/20 hover:bg-white/10"
                }`}
              >
                <p className="text-sm font-semibold text-white">{preset.name}</p>
                <p className="mt-2 text-xs leading-6 text-slate-400">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

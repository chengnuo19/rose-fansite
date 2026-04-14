export default function IdentityBadge({ identity, compact = false }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 ${compact ? "px-3 py-2" : "px-4 py-3"}`}>
      <div className={`${compact ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl"} flex items-center justify-center rounded-2xl bg-white/10`}>
        {identity.avatarEmoji}
      </div>
      <div>
        <p className="text-sm font-medium text-white">
          {identity.nickname} <span className="text-blush-200">{identity.badge}</span>
        </p>
        <p className="text-xs text-slate-500">访客 ID: {identity.visitorId}</p>
      </div>
    </div>
  );
}

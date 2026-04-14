const STORAGE_KEY = "rose-fan-identity";
const avatarPool = ["🌹", "✨", "🎤", "🖤", "💿", "🎀", "⭐"];

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

function createIdentity() {
  const visitorId = `blink-${randomId()}`;
  const short = visitorId.slice(-4).toUpperCase();

  return {
    visitorId,
    nickname: "Rosé粉丝",
    badge: `#${short}`,
    avatarEmoji: avatarPool[Math.floor(Math.random() * avatarPool.length)],
  };
}

export function getStoredIdentity() {
  if (typeof window === "undefined") {
    return createIdentity();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const created = createIdentity();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    return created;
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.visitorId && parsed?.nickname && parsed?.badge && parsed?.avatarEmoji) {
      return parsed;
    }
  } catch {}

  const created = createIdentity();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
  return created;
}

export function saveStoredIdentity(identity) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
  }
}

export const availableAvatars = avatarPool;

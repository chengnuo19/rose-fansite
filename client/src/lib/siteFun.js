export const themePresets = [
  {
    id: "nightstage",
    name: "舞台夜色",
    description: "冷蓝灯光和玫瑰粉边缘，像演出刚结束后的后台空气。",
  },
  {
    id: "cream",
    name: "软奶油",
    description: "更柔和、更日常，像 Rosé 私下自拍和生活碎片。",
  },
  {
    id: "editorial",
    name: "复古杂志",
    description: "偏棕金和纸张感，适合杂志页、拍立得和时间轴内容。",
  },
];

export const driftQuotes = [
  "今天也有人在这里认真喜欢 Rosé。",
  "最新评论会慢慢飘过，就像粉丝站里一直有人在说话。",
  "喜欢一张图的时候，记得顺手留下一句应援。",
  "有些瞬间像舞台，有些瞬间像日记，这个站想把它们都留下来。",
];

export const timelineMoments = [
  {
    year: "2016",
    title: "BLACKPINK 出道期",
    description: "作为主唱之一登上大众视野，舞台气质和辨识度很快就被注意到。",
  },
  {
    year: "2021",
    title: "单曲专辑《R》",
    description: "《On The Ground》和《Gone》让个人叙事更加完整，Rosé 的声音风格也被更多人记住。",
  },
  {
    year: "2024",
    title: "《APT.》引发全球热度",
    description: "与 Bruno Mars 的合作让 Rosé 的个人热度和大众传播度进一步放大。",
  },
  {
    year: "2026",
    title: "GRAMMY 舞台与《DEADLINE》周期",
    description: "一边是高关注度公开舞台，一边是 BLACKPINK 新一轮作品与活动周期，讨论度持续上升。",
  },
];

export const bgmTracks = [
  {
    id: "fansite-live",
    title: "Fansite Live Mix",
    subtitle: "站内本地播放",
    vibe: "使用站内现有本地媒体做成可直接播放的 BGM 版本，先让整个站真正动起来。",
    audioSrc: "/media/hero-video.mp4",
    poster: "/media/e44ccaac0ac9681bf82d2909403ab35f.jpg",
  },
  {
    id: "soft-room",
    title: "Soft Room Mood",
    subtitle: "站内本地播放",
    vibe: "更适合夜里刷图、切主题和做拍立得时开着循环。",
    audioSrc: "/media/hero-video.mp4",
    poster: "/media/2f7a49b05ed7d261d54f3e6d7550ca06.jpg",
  },
  {
    id: "editorial-night",
    title: "Editorial Night",
    subtitle: "站内本地播放",
    vibe: "搭配杂志风和时间轴模块时会更有沉浸感，后面也可以替换成你自己的授权音频。",
    audioSrc: "/media/hero-video.mp4",
    poster: "/media/13ee2758cbc3c7c2f06c615b3b2f85b9.jpg",
  },
];

export const quizQuestions = [
  {
    id: "scene",
    question: "你更想收藏哪一种 Rosé 画面？",
    options: [
      { label: "舞台灯光里的强气瞬间", result: "stage" },
      { label: "日常自拍和生活碎片", result: "soft" },
      { label: "杂志大片和高定造型", result: "editorial" },
    ],
  },
  {
    id: "message",
    question: "你来粉丝站最常做的一件事是？",
    options: [
      { label: "刷最新照片", result: "soft" },
      { label: "留评论和应援", result: "stage" },
      { label: "做壁纸和收藏图", result: "editorial" },
    ],
  },
  {
    id: "mood",
    question: "你心里的 Rosé 更像哪种情绪？",
    options: [
      { label: "闪闪发亮、很有舞台气场", result: "stage" },
      { label: "温柔安静、适合反复回看", result: "soft" },
      { label: "精致冷感、像电影画面", result: "editorial" },
    ],
  },
];

export const quizResults = {
  stage: {
    title: "你属于“舞台夜色”型粉丝",
    description: "你会被强烈的灯光、现场感和高热度时刻击中，最适合追最新舞台和高讨论图。",
  },
  soft: {
    title: "你属于“日常收藏”型粉丝",
    description: "你更在意照片里的情绪和陪伴感，偏爱私服、自拍、生活流和留言互动。",
  },
  editorial: {
    title: "你属于“杂志大片”型粉丝",
    description: "你喜欢有构图、有造型、有故事感的视觉时刻，最适合玩拍立得和时间轴模块。",
  },
};

export const commentReactionOptions = [
  { id: "love", emoji: "💗", label: "心动" },
  { id: "wow", emoji: "✨", label: "惊艳" },
  { id: "miss", emoji: "🥹", label: "想念" },
  { id: "fire", emoji: "🔥", label: "绝美" },
];

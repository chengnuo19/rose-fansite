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
    id: "apt",
    title: "APT.",
    subtitle: "ROSÉ & Bruno Mars",
    vibe: "适合放在首页做高热度代表曲，页面一打开就会更有当下感和讨论度。",
    poster: "/media/e44ccaac0ac9681bf82d2909403ab35f.jpg",
    appleMusicUrl: "https://music.apple.com/us/song/apt/1773452221",
    appleEmbedUrl:
      "https://embed.music.apple.com/us/song/apt/1773452221?theme=dark",
    qqMusicUrl:
      "https://y.qq.com/n/ryqq/search?w=APT%20ROS%C3%89%20Bruno%20Mars",
  },
  {
    id: "on-the-ground",
    title: "On The Ground",
    subtitle: "ROSÉ",
    vibe: "更适合搭配日常感和大图浏览，气质会更柔和，也很适合粉丝站常驻播放。",
    poster: "/media/2f7a49b05ed7d261d54f3e6d7550ca06.jpg",
    appleMusicUrl: "https://music.apple.com/us/song/on-the-ground/1557745420",
    appleEmbedUrl:
      "https://embed.music.apple.com/us/song/on-the-ground/1557745420?theme=dark",
    qqMusicUrl:
      "https://y.qq.com/n/ryqq/search?w=On%20The%20Ground%20ROS%C3%89",
  },
  {
    id: "gone",
    title: "Gone",
    subtitle: "ROSÉ",
    vibe: "适合夜间浏览、时间轴和拍立得留言页，情绪会更浓一点。",
    poster: "/media/13ee2758cbc3c7c2f06c615b3b2f85b9.jpg",
    appleMusicUrl: "https://music.apple.com/us/song/gone/1557745423",
    appleEmbedUrl:
      "https://embed.music.apple.com/us/song/gone/1557745423?theme=dark",
    qqMusicUrl: "https://y.qq.com/n/ryqq/search?w=Gone%20ROS%C3%89",
  },
  {
    id: "number-one-girl",
    title: "number one girl",
    subtitle: "ROSÉ",
    vibe: "偏近年的个人作品，适合放进歌单区做情绪切换，也能让页面更像完整歌单站。",
    poster: "/media/94509c19f893c6c33e95f785c4c8d566.jpg",
    appleMusicUrl:
      "https://music.apple.com/us/song/number-one-girl/1771105923",
    appleEmbedUrl:
      "https://embed.music.apple.com/us/song/number-one-girl/1771105923?theme=dark",
    qqMusicUrl:
      "https://y.qq.com/n/ryqq/search?w=number%20one%20girl%20ROS%C3%89",
  },
  {
    id: "toxic-till-the-end",
    title: "toxic till the end",
    subtitle: "ROSÉ",
    vibe: "更适合杂志风主题和夜色主题一起用，视觉和听感会更统一。",
    poster: "/media/e6eacc1b032f8d984cac0cbce7efa19a.jpg",
    appleMusicUrl:
      "https://music.apple.com/us/song/toxic-till-the-end/1771105929",
    appleEmbedUrl:
      "https://embed.music.apple.com/us/song/toxic-till-the-end/1771105929?theme=dark",
    qqMusicUrl:
      "https://y.qq.com/n/ryqq/search?w=toxic%20till%20the%20end%20ROS%C3%89",
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

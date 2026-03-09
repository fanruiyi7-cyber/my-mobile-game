// 自我侧写文案库
export const profiles = {
  // 深度灵魂探索者: C高 + B高
  deepExplorer: {
    name: "深度灵魂探索者",
    description: "你厌恶社交中的虚伪，因为你比任何人都清楚时间的珍贵。你之所以渴望 Nerd，是因为你内心期待一种'不被修饰的真实'。在你看来，浅层的社交消耗能量，而深度的精神共鸣才是真正的补给。",
    tags: ["Nerd/智性恋", "内核驱动", "深度交流"]
  },

  // 温柔秩序守护者: B高 + V高
  gentleGuardian: {
    name: "温柔秩序守护者",
    description: "在你的世界里，爱是细水长流的照顾，也是把生活理成诗的决心。你欣赏年上感，是因为你渴望一种被引领的成长，期待对方为你打开新世界的大门。稳定不是平淡，而是彼此最好的安全感和港湾。",
    tags: ["年上感", "稳定依赖", "长期主义"]
  },

  // 自由的风向探测器: E高 + B低
  freeWind: {
    name: "自由的风向探测器",
    description: "你像一阵自由的风，更在乎两个人在一起时是否能看到更广阔的世界。你不喜欢被束缚，但渴望与有趣的灵魂并肩同行。你的理想型是能与你一同探索未知、共同成长的伴侣。",
    tags: ["共同成长", "户外探索", "新鲜感"]
  },

  // 温暖的共情灯塔: C低 + E高
  warmBeacon: {
    name: "温暖的共情灯塔",
    description: "你拥有敏锐察觉情绪的天赋，总是习惯照亮别人。你渴望被看见、被理解，理想的关系是彼此温暖的陪伴。你像一个小太阳，用热量温暖身边的人，同时也期待被同样温柔地对待。",
    tags: ["情感支持", "陪伴", "共情力"]
  },

  // 智性恋理想主义者: C高 + V高
  intellectualIdealist: {
    name: "智性恋理想主义者",
    description: "你迷恋脑电波同频的战栗感，认为大脑的性感胜过一切。你渴望找到那个能与你进行深度思想碰撞的灵魂，期待在交流中获得灵感和成长。你的理想型是能与你精神共振的伴侣。",
    tags: ["智性恋", "精神共鸣", "理想主义"]
  },

  // 内敛边界观察员: B极高
  introvertedObserver: {
    name: "内敛边界观察员",
    description: "你的爱像文火慢炖，极度专一，但也极度需要空间。你不善于表达情感，但内心深处有着丰富的情感世界。你欣赏清冷感，是因为你渴望一种低频次但高质量的连接，不需要过多言语就能懂你。",
    tags: ["清冷感", "边界感", "专一深情"]
  }
};

// 理想型标签解释
export const idealTypes = {
  nerd: {
    name: "Nerd/智性恋",
    description: "迷恋专注带来的生命力，渴望精神同频。你欣赏那些在某个领域深耕的人，他们的专注让你感受到一种纯粹的魅力。",
    mustHave: "精神共鸣、思维深度、专注力",
    niceToHave: "幽默感、生活情趣",
    redFlags: "浮夸炫耀、浅尝辄止"
  },
  nianshang: {
    name: "年上感",
    description: "追求稳定性与指引感，渴望被包容的成长。你欣赏成熟稳重的人，希望在关系中获得指引和安全感。",
    mustHave: "成熟稳重、包容心、规划能力",
    niceToHave: "浪漫惊喜、适度空间",
    redFlags: "控制欲强、过度依赖"
  },
  qingleng: {
    name: "清冷感",
    description: "尊重独立人格，追求低频次但高质量的连接。你欣赏那些有独立精神世界的人，不需要时刻黏在一起，但彼此心照不宣。",
    mustHave: "独立人格、边界感、内涵深度",
    niceToHave: "偶尔的温暖惊喜",
    redFlags: "社交悍匪、过度热情"
  }
};

// Must-have / Nice-to-have / Red-flags 映射
export const profileLabels = {
  deepExplorer: {
    must: "Nerd/智性恋",
    nice: "独立空间/深度对谈",
    red: "浮夸炫耀/浅尝辄止"
  },
  gentleGuardian: {
    must: "年上感/稳定性",
    nice: "生活仪式感/浪漫惊喜",
    red: "不稳定/缺乏规划"
  },
  freeWind: {
    must: "共同成长/探索精神",
    nice: "户外活动/新鲜体验",
    red: "控制欲/黏人"
  },
  warmBeacon: {
    must: "情感回应/陪伴",
    nice: "社交能力/幽默感",
    red: "冷暴力/情感忽视"
  },
  intellectualIdealist: {
    must: "智性吸引/思想深度",
    nice: "理想主义/共同愿景",
    red: "思维浅薄/拒绝交流"
  },
  introvertedObserver: {
    must: "清冷感/边界尊重",
    nice: "独立人格/默契沉默",
    red: "社交悍匪/过度打扰"
  }
};

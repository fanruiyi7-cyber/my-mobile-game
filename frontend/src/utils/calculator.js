// 结果计算引擎

// 维度得分统计
export const calculateScores = (answers) => {
  const scores = { E: 0, B: 0, C: 0, V: 0 };

  answers.forEach(type => {
    if (scores.hasOwnProperty(type)) {
      scores[type]++;
    }
  });

  return scores;
};

// 根据维度得分匹配自我侧写
export const matchProfile = (scores) => {
  const { E, B, C, V } = scores;

  // 获取最高维度
  const maxScore = Math.max(E, B, C, V);

  // 边界情况：得分都很低
  if (maxScore <= 2) {
    return "intellectualIdealist"; // 默认
  }

  // 匹配规则（根据 PRD）
  if (C >= 4 && B >= 4) {
    return "deepExplorer"; // 深度灵魂探索者: C高, B高
  } else if (B >= 4 && V >= 4) {
    return "gentleGuardian"; // 温柔秩序守护者: B高, V高
  } else if (E >= 4 && B <= 2) {
    return "freeWind"; // 自由的风向探测器: E高, B低
  } else if (C <= 3 && E >= 4) {
    return "warmBeacon"; // 温暖的共情灯塔: C低, E高
  } else if (C >= 4 && V >= 4) {
    return "intellectualIdealist"; // 智性恋理想主义者: C高, V高
  } else if (B >= 5) {
    return "introvertedObserver"; // 内敛边界观察员: B极高
  }

  // 次优匹配
  if (C >= E && C >= B && C >= V) {
    return "intellectualIdealist";
  } else if (B >= E && B >= C && B >= V) {
    return "introvertedObserver";
  } else if (E >= B && E >= C && E >= V) {
    return "warmBeacon";
  } else {
    return "gentleGuardian";
  }
};

// 根据内核维度得分提取理想型
export const extractIdealType = (scores) => {
  const { C, V } = scores;

  // C 维度高 + V 维度高 = 智性恋
  if (C >= 4 && V >= 4) {
    return "nerd";
  }
  // B 维度高 + V 维度高 = 年上感
  else if (scores.B >= 4 && V >= 3) {
    return "nianshang";
  }
  // B 维度极高 = 清冷感
  else if (scores.B >= 5) {
    return "qingleng";
  }
  // 默认返回 nerd
  return "nerd";
};

// 生成完整结果
export const calculateResult = (answers) => {
  const scores = calculateScores(answers);
  const profileKey = matchProfile(scores);
  const idealType = extractIdealType(scores);

  return {
    scores,
    profileKey,
    idealType
  };
};

// 结果计算引擎

// 维度得分统计
export const calculateScores = (answers) => {
  const scores = { E: 0, B: 0, C: 0, V: 0 };

  answers.forEach(typeOrObj => {
    const type = typeof typeOrObj === 'object' ? typeOrObj.type : typeOrObj;
    if (scores.hasOwnProperty(type)) {
      scores[type]++;
    }
  });

  return scores;
};

// 根据维度得分匹配自我侧写（9种）
export const matchProfile = (scores) => {
  const { E, B, C, V } = scores;

  // 获取最高维度
  const maxScore = Math.max(E, B, C, V);

  // 边界情况：得分都很低
  if (maxScore <= 2) {
    return "gentleGuardian"; // 默认
  }

  // 匹配规则 - 提高阈值避免趋同
  if (E >= 5 && V >= 4) {
    return "romanticAesthetic"; // 浪漫唯美主义者: E高, V高
  } else if (C >= 5 && V >= 4) {
    return "intellectualIdealist"; // 智性恋理想主义者: C高, V高
  } else if (C >= 5 && B >= 5) {
    return "deepExplorer"; // 深度灵魂探索者: C高, B高
  } else if (E >= 5 && B <= 2 && C <= 3) {
    return "emotionalDependent"; // 情感依赖型: E高, B低, C低
  } else if (E >= 5 && B <= 2) {
    return "freeWind"; // 自由的风向探测器: E高, B低
  } else if (B >= 5 && V >= 4 && C <= 3) {
    return "gentleGuardian"; // 温柔秩序守护者: B高, V高, C低
  } else if (B >= 5 && C >= 4) {
    return "pragmaticLife"; // 务实生活家: B极高, C高
  } else if (B >= 5) {
    return "introvertedObserver"; // 内敛边界观察员: B极高
  } else if (C <= 3 && E >= 4) {
    return "warmBeacon"; // 温暖的共情灯塔: C低, E高
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

// 根据内核维度得分提取理想型（9种）
export const extractIdealType = (scores) => {
  const { E, B, C, V } = scores;

  // 独立事业型
  if (C >= 5 && E >= 4) {
    return "independentCareer";
  }
  // 精神导师型
  else if (B >= 4 && C >= 4) {
    return "spiritualMentor";
  }
  // 自由探索型
  else if (E >= 5 && V >= 3) {
    return "freeExplorer";
  }
  // 浪漫艺术家型
  else if (E >= 4 && V >= 5) {
    return "romanticArtist";
  }
  // 阳光活力型
  else if (E >= 5 && B <= 2) {
    return "sunnyEnergetic";
  }
  // 年上感
  else if (B >= 4 && V >= 3) {
    return "nianshang";
  }
  // 温柔陪伴型
  else if (B >= 4 && E <= 3) {
    return "gentleCompanion";
  }
  // 智性恋
  else if (C >= 4) {
    return "nerd";
  }
  // 清冷感
  else if (B >= 5) {
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
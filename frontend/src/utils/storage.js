// 状态持久化工具

const STORAGE_KEY = "echo_love_data";

// 保存用户答案
export const saveAnswers = (answers) => {
  try {
    const data = getStorageData();
    data.answers = answers;
    data.timestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("保存答案失败:", error);
    return false;
  }
};

// 获取保存的答案
export const getSavedAnswers = () => {
  try {
    const data = getStorageData();
    return data.answers || [];
  } catch (error) {
    console.error("读取答案失败:", error);
    return [];
  }
};

// 保存测试结果
export const saveResult = (result) => {
  try {
    const data = getStorageData();
    data.result = result;
    data.timestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("保存结果失败:", error);
    return false;
  }
};

// 获取保存的结果
export const getSavedResult = () => {
  try {
    const data = getStorageData();
    return data.result || null;
  } catch (error) {
    console.error("读取结果失败:", error);
    return null;
  }
};

// 清除所有数据
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("清除数据失败:", error);
    return false;
  }
};

// 检查是否有未完成的测试
export const hasUnfinishedTest = () => {
  const answers = getSavedAnswers();
  return answers.length > 0 && answers.length < 20;
};

// 辅助函数：获取本地存储数据
const getStorageData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
};

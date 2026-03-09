// Canvas 生成长图工具

import html2canvas from "html2canvas";

// 生成并下载长图
export const generateImage = async (elementId, filename = "echo-love-result") => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error("未找到目标元素");
      return false;
    }

    // 配置选项
    const options = {
      scale: 2, // 提高清晰度
      backgroundColor: "#FDF9F3", // 背景色
      useCORS: true,
      allowTaint: true,
      logging: false
    };

    // 生成 canvas
    const canvas = await html2canvas(element, options);

    // 转换为 blob
    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}-${Date.now()}.png`;

    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 释放资源
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("生成图片失败:", error);
    return false;
  }
};

// 生成 base64 图片（用于分享）
export const generateImageBase64 = async (elementId) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      return null;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#FDF9F3",
      useCORS: true,
      allowTaint: true,
      logging: false
    });

    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("生成 Base64 图片失败:", error);
    return null;
  }
};

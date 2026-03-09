// 邀请码验证 API
// 存储已使用的邀请码
const usedCodes = new Set();

// 有效的邀请码列表（可以添加更多）
const validCodes = new Set([
  'ECHO2024',
  'LOVE123',
  'TEST001',
  'VIP2024',
  // 在这里添加更多邀请码
]);

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: '请输入邀请码' });
    }

    // 检查邀请码格式
    const normalizedCode = code.toUpperCase().trim();

    // 检查是否已使用
    if (usedCodes.has(normalizedCode)) {
      return res.status(400).json({ error: '该邀请码已被使用' });
    }

    // 检查是否有效
    if (!validCodes.has(normalizedCode)) {
      return res.status(400).json({ error: '邀请码无效' });
    }

    // 标记为已使用
    usedCodes.add(normalizedCode);

    return res.status(200).json({
      success: true,
      message: '验证成功'
    });

  } catch (error) {
    console.error('验证错误:', error);
    return res.status(500).json({ error: '服务器错误，请稍后重试' });
  }
}

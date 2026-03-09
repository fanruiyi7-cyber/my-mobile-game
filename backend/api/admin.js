// 管理邀请码 API
// 存储已使用的邀请码
const usedCodes = new Set();

// 有效的邀请码列表
const validCodes = new Set([
  'ECHO2024',
  'LOVE123',
  'TEST001',
  'VIP2024',
]);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: 获取邀请码状态
  if (req.method === 'GET') {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: '请提供邀请码' });
    }
    const normalizedCode = code.toUpperCase();
    return res.status(200).json({
      valid: validCodes.has(normalizedCode),
      used: usedCodes.has(normalizedCode),
      totalValid: validCodes.size,
      totalUsed: usedCodes.size
    });
  }

  // POST: 添加新邀请码
  if (req.method === 'POST') {
    const { code, adminKey } = req.body;

    // 简单的管理密码验证（生产环境应该使用更安全的方式）
    if (adminKey !== 'echo_admin_2024') {
      return res.status(401).json({ error: '管理密钥错误' });
    }

    if (!code) {
      return res.status(400).json({ error: '请提供邀请码' });
    }

    const normalizedCode = code.toUpperCase().trim();

    if (validCodes.has(normalizedCode)) {
      return res.status(400).json({ error: '邀请码已存在' });
    }

    validCodes.add(normalizedCode);

    return res.status(200).json({
      success: true,
      message: '邀请码添加成功',
      code: normalizedCode
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

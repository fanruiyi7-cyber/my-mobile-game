// 管理邀请码 API (Netlify Functions)
// 存储已使用的邀请码
const usedCodes = new Set();

// 有效的邀请码列表
const validCodes = new Set([
  'ECHO2024',
  'LOVE123',
  'TEST001',
  'VIP2024',
  'WELCOME',
  'SPRING2024',
  'SUMMER2024',
  'AUTUMN2024',
  'WINTER2024',
  'FRIEND001',
  'FRIEND002',
  'FRIEND003',
  'FRIEND004',
  'FRIEND005',
  'NEWYEAR',
  'VALENTINE',
  'MATCH2024',
  'HEART001',
  'HEART002',
  'HEART003',
  'DREAM001',
  'DREAM002',
  'LOVE2024',
  'ECHO001',
  'ECHO002',
  'START001',
  'START002',
  'HOPE001',
  'HOPE002',
  'FOREVER',
  'TOMORROW',
  'MAGIC001',
  'MAGIC002',
  'STORY001',
  'STORY002',
  'CUTE001',
  'CUTE002',
  'SWEET001',
  'SWEET002',
  'KIND001',
  'KIND002',
  'WARM001',
  'WARM002',
  // 新增50个邀请码
  'BLUE001',
  'BLUE002',
  'BLUE003',
  'BLUE004',
  'BLUE005',
  'PINK001',
  'PINK002',
  'PINK003',
  'PINK004',
  'PINK005',
  'STAR001',
  'STAR002',
  'STAR003',
  'STAR004',
  'STAR005',
  'MOON001',
  'MOON002',
  'MOON003',
  'MOON004',
  'MOON005',
  'SUN001',
  'SUN002',
  'SUN003',
  'SUN004',
  'SUN005',
  'CLOUD001',
  'CLOUD002',
  'CLOUD003',
  'CLOUD004',
  'CLOUD005',
  'RAIN001',
  'RAIN002',
  'RAIN003',
  'RAIN004',
  'RAIN005',
  'WIND001',
  'WIND002',
  'WIND003',
  'WIND004',
  'WIND005',
  'SKY001',
  'SKY002',
  'SKY003',
  'SKY004',
  'SKY005',
  'SEA001',
  'SEA002',
  'SEA003',
  'SEA004',
  'SEA005',
  'WAVE001',
  'WAVE002',
  'WAVE003',
  'WAVE004',
  'WAVE005',
  'GOLD001',
  'GOLD002',
  'GOLD003',
  'GOLD004',
  'GOLD005',
  'SILVER001',
  'SILVER002',
  'SILVER003',
  'SILVER004',
  'SILVER005',
]);

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // GET: 获取邀请码状态
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters || {};
    const code = params.code;

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '请提供邀请码' })
      };
    }

    const normalizedCode = code.toUpperCase();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        valid: validCodes.has(normalizedCode),
        used: usedCodes.has(normalizedCode),
        totalValid: validCodes.size,
        totalUsed: usedCodes.size
      })
    };
  }

  // POST: 添加新邀请码
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { code, adminKey } = body;

      // 简单的管理密码验证
      if (adminKey !== 'echo_admin_2024') {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: '管理密钥错误' })
        };
      }

      if (!code) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: '请提供邀请码' })
        };
      }

      const normalizedCode = code.toUpperCase().trim();

      if (validCodes.has(normalizedCode)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: '邀请码已存在' })
        };
      }

      validCodes.add(normalizedCode);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: '邀请码添加成功',
          code: normalizedCode
        })
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '请求格式错误' })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

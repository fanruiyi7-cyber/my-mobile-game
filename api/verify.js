// 邀请码验证 API (Netlify Functions)
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
  // 设置 CORS 头
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // 处理预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // 只允许 POST 请求
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { code } = body;

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '请输入邀请码' })
      };
    }

    // 检查邀请码格式
    const normalizedCode = code.toUpperCase().trim();

    // 检查是否已使用
    if (usedCodes.has(normalizedCode)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '该邀请码已被使用' })
      };
    }

    // 检查是否有效
    if (!validCodes.has(normalizedCode)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: '邀请码无效' })
      };
    }

    // 标记为已使用
    usedCodes.add(normalizedCode);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: '验证成功'
      })
    };

  } catch (error) {
    console.error('验证错误:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: '服务器错误，请稍后重试' })
    };
  }
};

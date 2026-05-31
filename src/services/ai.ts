// AI 服务层 - 支持 Gemini API（免费）和 DeepSeek API（新用户免费额度）

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

// 胡同记忆 AI 系统提示词
const SYSTEM_PROMPT = `你是"胡同记忆"项目的AI助手，专门帮助用户了解北京胡同的历史文化。

你的知识范围包括：
- 北京胡同的历史（元代至今）
- 砖塔胡同、南锣鼓巷等著名胡同
- 万松老人塔、鲁迅故居等文化遗迹
- 胡同中的元曲文化、四合院建筑
- 老北京民俗、胡同保护现状

请用友好、知识渊博的语气回答，回答简洁精炼（200字以内），并使用中文。如果问题超出胡同文化范围，可以简单回应并引导回胡同话题。`

export interface AIMessage {
  role: 'user' | 'ai' | 'system'
  content: string
}

export async function callGeminiAPI(
  messages: AIMessage[],
  apiKey: string
): Promise<string> {
  // 构建对话历史
  const contents = messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }))

  // 注入系统提示词到第一条消息
  const systemInstruction = {
    parts: [{ text: SYSTEM_PROMPT }]
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction,
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`Gemini API 错误: ${response.status} - ${JSON.stringify(errorData)}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '抱歉，我暂时无法回答这个问题。'
}

export async function callDeepSeekAPI(
  messages: AIMessage[],
  apiKey: string
): Promise<string> {
  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.filter(m => m.role !== 'system').map(m => ({
          role: m.role === 'ai' ? 'assistant' : m.role,
          content: m.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 500,
    })
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`DeepSeek API 错误: ${response.status} - ${JSON.stringify(errorData)}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content || '抱歉，我暂时无法回答这个问题。'
}

// 自动选择 API：优先 DeepSeek，回退 Gemini
export async function callAI(
  messages: AIMessage[],
  geminiKey?: string,
  deepseekKey?: string
): Promise<string> {
  if (deepseekKey) {
    return callDeepSeekAPI(messages, deepseekKey)
  }
  if (geminiKey) {
    return callGeminiAPI(messages, geminiKey)
  }
  throw new Error('未配置任何 AI API Key。请在 .env 文件中设置 VITE_DEEPSEEK_API_KEY 或 VITE_GEMINI_API_KEY')
}

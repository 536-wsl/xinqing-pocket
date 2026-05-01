export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: '只支持POST请求' });
    }

    try {
        const { message, history } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ success: false, message: '消息不能为空' });
        }

        const API_KEY = process.env.API_KEY || 'sk-c497c3de006045ce8920f725eb6f10c3';

        let conversationHistory = '';
        if (history && Array.isArray(history) && history.length > 0) {
            conversationHistory = history.map(msg =>
                `${msg.sender === 'user' ? '用户' : '助手'}：${msg.text}`
            ).join('\n');
        }

        const systemPrompt = `你是一个温暖、共情能力强的心理疗愈助手，名叫'心晴'。你善于倾听用户的情绪表达，提供温柔的安慰和正向引导。注意：不提供医疗诊断，只提供情绪支持。`;

        const fullPrompt = conversationHistory
            ? `${systemPrompt}\n\n对话历史：\n${conversationHistory}\n\n当前用户说："${message}"`
            : `${systemPrompt}\n\n当前用户说："${message}"`;

        const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'qwen-turbo',
                input: {
                    prompt: fullPrompt
                },
                parameters: {
                    temperature: 0.8,
                    max_new_tokens: 500,
                    top_p: 0.8
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            return res.status(500).json({
                success: false,
                message: 'AI 服务暂时不可用，请稍后再试'
            });
        }

        const data = await response.json();

        if (data.output && data.output.text) {
            return res.status(200).json({
                success: true,
                message: data.output.text.trim()
            });
        } else if (data.error) {
            return res.status(500).json({
                success: false,
                message: data.error.message || 'AI 服务返回错误'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'AI 服务响应格式错误'
            });
        }

    } catch (error) {
        console.error('Serverless Function Error:', error);
        return res.status(500).json({
            success: false,
            message: '服务器错误，请稍后再试'
        });
    }
}
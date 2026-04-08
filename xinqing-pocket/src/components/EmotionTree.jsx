import React, { useState } from 'react'

const EmotionTree = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '你好！我是你的情绪树洞，有什么想倾诉的吗？',
      sender: 'ai'
    }
  ])
  const [inputText, setInputText] = useState('')

  const handleSend = async () => {
    if (!inputText.trim()) return

    // 添加用户消息
    const newUserMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user'
    }
    setMessages([...messages, newUserMessage])
    setInputText('')

    // 添加AI正在输入的提示
    const typingMessage = {
      id: Date.now() + 1,
      text: '...',
      sender: 'ai',
      typing: true
    }
    setMessages(prev => [...prev, typingMessage])

    try {
      // 调用阿里云通义千问API
      const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-c497c3de006045ce8920f725eb6f10c3'
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          input: {
            prompt: `你是一个温柔的情绪树洞，善于倾听和安抚。请以温和、理解的语气回应用户的情绪表达。用户说："${inputText}"`
          },
          parameters: {
            temperature: 0.7,
            max_new_tokens: 1000
          }
        })
      })

      const data = await response.json()
      
      // 移除正在输入的提示
      setMessages(prev => prev.filter(msg => !msg.typing))

      if (data.output && data.output.text) {
        const aiResponse = {
          id: Date.now() + 2,
          text: data.output.text.trim(),
          sender: 'ai'
        }
        setMessages(prev => [...prev, aiResponse])
      } else {
        throw new Error('API response error')
      }
    } catch (error) {
      console.error('API调用失败:', error)
      // 移除正在输入的提示
      setMessages(prev => prev.filter(msg => !msg.typing))
      // 显示错误信息
      const errorMessage = {
        id: Date.now() + 2,
        text: '抱歉，暂时无法获取回复，请稍后再试。',
        sender: 'ai'
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  return (
    <div className="container">
      <div className="back-btn" onClick={() => onNavigate('home')}>←</div>
      <h1 className="title">AI情绪树洞</h1>
      <p className="subtitle">匿名倾诉，AI陪伴，释放情绪</p>
      
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="输入你想倾诉的内容..." 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>发送</button>
        </div>
      </div>
    </div>
  )
}

export default EmotionTree
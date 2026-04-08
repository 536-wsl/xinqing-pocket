import React, { useState } from 'react'

const Meditation = ({ onNavigate }) => {
  const [selectedMeditation, setSelectedMeditation] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const meditationOptions = [
    { id: 1, name: '5分钟正念冥想', duration: '5分钟', description: '适合初学者的基础冥想' },
    { id: 2, name: '10分钟深度放松', duration: '10分钟', description: '缓解压力，放松身心' },
    { id: 3, name: '睡前冥想', duration: '8分钟', description: '帮助入睡，改善睡眠质量' },
    { id: 4, name: '晨间冥想', duration: '5分钟', description: '开启美好一天的冥想' }
  ]

  const handleSelectMeditation = (meditation) => {
    setSelectedMeditation(meditation)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container">
      <div className="back-btn" onClick={() => onNavigate('home')}>←</div>
      <h1 className="title">AI冥想引导</h1>
      <p className="subtitle">通过AI语音引导，帮助您放松身心</p>
      
      <div className="meditation-container">
        <h2>选择冥想类型</h2>
        <div className="meditation-options">
          {meditationOptions.map(option => (
            <div 
              key={option.id} 
              className="meditation-option"
              onClick={() => handleSelectMeditation(option)}
            >
              <h3>{option.name}</h3>
              <p>{option.duration} | {option.description}</p>
            </div>
          ))}
        </div>

        {selectedMeditation && (
          <div className="meditation-player">
            <h3>{selectedMeditation.name}</h3>
            <div className="player-controls">
              <div className="player-btn" onClick={togglePlay}>
                {isPlaying ? '⏸️' : '▶️'}
              </div>
            </div>
            <p>正在播放：{selectedMeditation.name}</p>
            <p>时长：{selectedMeditation.duration}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Meditation
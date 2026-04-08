import React, { useState } from 'react'

const Yoga = ({ onNavigate }) => {
  const [selectedRoutine, setSelectedRoutine] = useState(null)

  const yogaRoutines = [
    { 
      id: 1, 
      name: '晨起瑜伽', 
      duration: '10分钟', 
      description: '唤醒身体，开启活力一天',
      videoUrl: 'https://www.youtube.com/embed/d6wRkzCW5qM' 
    },
    { 
      id: 2, 
      name: '办公室瑜伽', 
      duration: '8分钟', 
      description: '缓解久坐疲劳，舒展身体',
      videoUrl: 'https://www.youtube.com/embed/3-0yA8t0B68' 
    },
    { 
      id: 3, 
      name: '睡前瑜伽', 
      duration: '10分钟', 
      description: '放松身心，改善睡眠质量',
      videoUrl: 'https://www.youtube.com/embed/0XxT1y2b25s' 
    }
  ]

  const handleSelectRoutine = (routine) => {
    setSelectedRoutine(routine)
  }

  return (
    <div className="container">
      <div className="back-btn" onClick={() => onNavigate('home')}>←</div>
      <h1 className="title">轻瑜伽练习</h1>
      <p className="subtitle">通过简单的瑜伽动作，放松身体，缓解压力</p>
      
      <div className="yoga-container">
        <h2>选择瑜伽类型</h2>
        <div className="yoga-routines">
          {yogaRoutines.map(routine => (
            <div 
              key={routine.id} 
              className="yoga-routine"
              onClick={() => handleSelectRoutine(routine)}
            >
              <h3>{routine.name}</h3>
              <p>{routine.duration} | {routine.description}</p>
            </div>
          ))}
        </div>

        {selectedRoutine && (
          <div className="yoga-video">
            <h3>{selectedRoutine.name}</h3>
            <iframe 
              src={selectedRoutine.videoUrl} 
              title={selectedRoutine.name}
              allowFullScreen
            ></iframe>
            <p>时长：{selectedRoutine.duration}</p>
            <p>{selectedRoutine.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Yoga
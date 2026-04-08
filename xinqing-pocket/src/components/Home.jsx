import React from 'react'

const Home = ({ onNavigate }) => {
  return (
    <div className="container">
      <h1 className="title">情绪舒缓</h1>
      <p className="subtitle">轻量化情绪舒缓工具，为您提供一站式情绪放松与自我疗愈</p>
      
      <div className="menu">
        <div className="menu-item" onClick={() => onNavigate('emotion-tree')}>
          <div className="icon">🎭</div>
          <text>AI情绪树洞</text>
          <div className="icon">→</div>
        </div>
        <div className="menu-item" onClick={() => onNavigate('meditation')}>
          <div className="icon">🧘</div>
          <text>AI冥想引导</text>
          <div className="icon">→</div>
        </div>
        <div className="menu-item" onClick={() => onNavigate('yoga')}>
          <div className="icon">🧠</div>
          <text>轻瑜伽练习</text>
          <div className="icon">→</div>
        </div>
      </div>
    </div>
  )
}

export default Home
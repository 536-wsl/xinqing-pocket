import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import EmotionTree from './components/EmotionTree'
import Meditation from './components/Meditation'
import Yoga from './components/Yoga'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />
      case 'emotion-tree':
        return <EmotionTree onNavigate={setCurrentPage} />
      case 'meditation':
        return <Meditation onNavigate={setCurrentPage} />
      case 'yoga':
        return <Yoga onNavigate={setCurrentPage} />
      default:
        return <Home onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  )
}

export default App
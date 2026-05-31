import { HashRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import MapPage from './pages/MapPage'
import HutongDetailPage from './pages/HutongDetailPage'
import HistoryPage from './pages/HistoryPage'
import CulturePage from './pages/CulturePage'
import StatusPage from './pages/StatusPage'
import MemoryPage from './pages/MemoryPage'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-hutong-paper paper-texture">
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/hutong/:id" element={<HutongDetailPage />} />
          <Route path="/hutong/:id/history" element={<HistoryPage />} />
          <Route path="/hutong/:id/culture" element={<CulturePage />} />
          <Route path="/hutong/:id/status" element={<StatusPage />} />
          <Route path="/hutong/:id/memory" element={<MemoryPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App

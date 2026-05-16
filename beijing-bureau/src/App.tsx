import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import { Landing } from './pages/Landing'
import { Report } from './pages/Report'
import { Processing } from './pages/Processing'
import { Results } from './pages/Results'
import { Dashboard } from './pages/Dashboard'
import { Scanner } from './pages/Scanner'
import { Leaderboard } from './pages/Leaderboard'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/report" element={<Report />} />
            <Route path="/processing" element={<Processing />} />
            <Route path="/results" element={<Results />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}

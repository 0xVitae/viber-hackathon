import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { searchExa, runExaSearchTool, exaSearchTool } from './utils/exaSearch'

if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).exa = { searchExa, runExaSearchTool, exaSearchTool }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

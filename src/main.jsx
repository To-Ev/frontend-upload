import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

export const server = "http://localhost:5000"

const container = document.getElementById('root')

if (!window.__REACT_ROOT__) {
  window.__REACT_ROOT__ = createRoot(container)
}

window.__REACT_ROOT__.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

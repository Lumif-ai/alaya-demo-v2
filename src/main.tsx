import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const HASH = '0bd6161722e4b99336f09dbfedd28c8d6a7f20cb16e0199db99f3735c5fadbef'

async function sha256(s: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('alaya-auth') === '1')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  if (authed) return <>{children}</>

  const handleSubmit = async () => {
    const v = inputRef.current?.value || ''
    if (await sha256(v) === HASH) {
      sessionStorage.setItem('alaya-auth', '1')
      setAuthed(true)
    } else {
      setError(true)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#FAFAFA', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: 360, width: '100%', padding: '0 24px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#121212', marginBottom: 4 }}>Lumif.ai</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Alaya Demo — Enter password to continue</div>
        <input
          ref={inputRef}
          type="password"
          placeholder="Password"
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          onFocus={() => setError(false)}
          style={{
            width: '100%', padding: '12px 16px', border: `1px solid ${error ? '#EF4444' : '#E5E7EB'}`,
            borderRadius: 12, fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none',
            marginBottom: 12, boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: 12, background: '#E94D35', color: 'white', border: 'none',
            borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
          }}
        >
          Enter
        </button>
        {error && <div style={{ color: '#EF4444', fontSize: 13, marginTop: 8 }}>Incorrect password</div>}
      </div>
    </div>
  )
}

// Anti-copy protections
;(() => {
  // Disable right-click context menu
  document.addEventListener('contextmenu', e => e.preventDefault())
  // Disable common copy/inspect shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'F12') e.preventDefault()
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) e.preventDefault()
    if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'U') e.preventDefault()
    if ((e.ctrlKey || e.metaKey) && e.key.toUpperCase() === 'S') e.preventDefault()
  })
  // Console warning
  console.log('%c⚠️ This is a confidential demo. Unauthorized copying or redistribution is prohibited.', 'color:#E94D35;font-size:16px;font-weight:bold;')
  // Disable text selection via CSS
  const style = document.createElement('style')
  style.textContent = 'body{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}input,textarea{-webkit-user-select:text;-moz-user-select:text;user-select:text;}'
  document.head.appendChild(style)
})()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthGate>
      <App />
    </AuthGate>
  </React.StrictMode>,
)

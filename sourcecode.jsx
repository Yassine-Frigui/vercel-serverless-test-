import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        name: name,
        date_time: new Date().toISOString()
      }
      const response = await fetch(import.meta.env.VITE_VERCEL_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      setMessage(data.message || 'Data sent successfully')
    } catch (error) {
      setMessage('Error sending data: ' + error.message)
    }
  }

  return (
    <div className="center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <button type="submit">
          Send to Vercel Server
        </button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default App

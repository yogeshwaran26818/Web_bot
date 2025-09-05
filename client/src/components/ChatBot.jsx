import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useParams } from 'react-router-dom'
import { queryRAG } from '../services/api'

export default function ChatBot() {
  const { linkId } = useParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const token = await getToken()
      const response = await queryRAG(input, linkId, token)
      const botMessage = { role: 'bot', content: response.data.answer }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Query error:', error)
      const errorMessage = { role: 'bot', content: 'Sorry, I encountered an error.' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow h-96 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-xs ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-4">
            <div className="inline-block p-3 rounded-lg bg-gray-200">
              Thinking...
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}
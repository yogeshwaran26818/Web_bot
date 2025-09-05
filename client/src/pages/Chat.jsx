import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import ChatBot from '../components/ChatBot'
import { getLink, trainRAG } from '../services/api'

export default function Chat() {
  const { linkId } = useParams()
  const { getToken } = useAuth()
  const [link, setLink] = useState(null)
  const [isTraining, setIsTraining] = useState(false)

  useEffect(() => {
    loadLink()
  }, [linkId])

  const loadLink = async () => {
    try {
      const token = await getToken()
      const response = await getLink(linkId, token)
      setLink(response.data)
      
      if (!response.data.isEmbedded) {
        await trainModel()
      }
    } catch (error) {
      console.error('Error loading link:', error)
    }
  }

  const trainModel = async () => {
    try {
      setIsTraining(true)
      const token = await getToken()
      await trainRAG(linkId, token)
      setLink(prev => ({ ...prev, isEmbedded: true }))
    } catch (error) {
      console.error('Training error:', error)
    } finally {
      setIsTraining(false)
    }
  }

  if (!link) return <div className="p-6">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Chat with {link.originalUrl}</h1>
        <p className="text-gray-600">{link.anchorTags.length} pages scraped</p>
      </div>
      
      {isTraining ? (
        <div className="text-center py-8">
          <p>Training AI model with your data...</p>
        </div>
      ) : (
        <ChatBot />
      )}
    </div>
  )
}
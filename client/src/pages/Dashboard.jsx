import { useState, useEffect } from 'react'
import { useAuth, UserButton } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import UploadLink from '../components/UploadLink'
import ScrapedLinks from '../components/ScrapedLinks'
import { getLinks } from '../services/api'

export default function Dashboard() {
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [links, setLinks] = useState([])

  useEffect(() => {
    loadLinks()
  }, [])

  const loadLinks = async () => {
    try {
      const token = await getToken()
      const response = await getLinks(token)
      setLinks(response.data)
    } catch (error) {
      console.error('Error loading links:', error)
    }
  }

  const handleLinkUploaded = (link) => {
    setLinks([...links, link])
  }

  const handleChatClick = (linkId) => {
    navigate(`/chat/${linkId}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton />
      </div>
      
      <UploadLink onLinkUploaded={handleLinkUploaded} />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Scraped Links</h2>
        <div className="space-y-6">
          {links.map((link) => (
            <div key={link._id} className="space-y-4">
              <ScrapedLinks link={link} />
              <button
                onClick={() => handleChatClick(link._id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Chat with this data
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
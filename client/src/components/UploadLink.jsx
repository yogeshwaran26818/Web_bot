import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { uploadLink } from '../services/api'

export default function UploadLink({ onLinkUploaded }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return

    try {
      setLoading(true)
      const token = await getToken()
      const response = await uploadLink(url, token)
      onLinkUploaded(response.data)
      setUrl('')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Website Link</h2>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Scraping...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}
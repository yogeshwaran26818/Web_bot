export default function ScrapedLinks({ link }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium text-lg mb-2">{link.originalUrl}</h3>
      <p className="text-sm text-gray-600 mb-3">{link.anchorCount || link.anchorTags?.length || 0} links found</p>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {link.anchorTags?.map((tag, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-3 py-1">
            <a 
              href={tag.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {tag.text || tag.url}
            </a>
            <p className="text-xs text-gray-500 truncate">{tag.url}</p>
          </div>
        )) || <p className="text-gray-500">No links available</p>}
      </div>
    </div>
  )
}
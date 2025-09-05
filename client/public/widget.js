(function() {
  // Create chatbot button
  function createChatButton() {
    const button = document.createElement('div');
    button.id = 'web-bot-widget';
    button.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: #2563eb;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: all 0.3s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
        </svg>
      </div>
    `;
    
    button.onclick = function() {
      const currentUrl = window.location.href;
      const chatUrl = `http://localhost:3000/external-chat?url=${encodeURIComponent(currentUrl)}`;
      window.open(chatUrl, '_blank', 'width=400,height=600,scrollbars=yes,resizable=yes');
    };
    
    document.body.appendChild(button);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatButton);
  } else {
    createChatButton();
  }
})();
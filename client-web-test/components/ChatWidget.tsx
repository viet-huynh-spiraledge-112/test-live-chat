'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    LiveChatWidget?: {
      init: (config: {
        widgetKey: string;
        apiUrl: string;
      }) => void;
    };
  }
}

export default function ChatWidget() {
  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector('script[src="https://cdn.example.com/widget/v1/widget.js"]');
    if (existingScript) {
      // Script already exists, just initialize if widget is available
      if (window.LiveChatWidget) {
        window.LiveChatWidget.init({
          widgetKey: '9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88',
          apiUrl: 'http://crm-api-staging.spiraledge.com/api/widget'
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.example.com/widget/v1/widget.js';
    script.async = true;
    script.onload = function() {
      if (window.LiveChatWidget) {
        window.LiveChatWidget.init({
          widgetKey: '9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88',
          apiUrl: 'http://crm-api-staging.spiraledge.com/api/widget'
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.querySelector('script[src="https://cdn.example.com/widget/v1/widget.js"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);

  return null;
}


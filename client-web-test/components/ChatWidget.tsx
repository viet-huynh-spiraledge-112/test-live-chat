'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    SpiraledgeChat?: {
      init: (config: {
        apiUrl: string;
        widgetId: string;
        pusherKey: string;
        pusherCluster: string;
      }) => void;
    };
  }
}

export default function ChatWidget() {
  useEffect(() => {
    // Check if script is already loaded
    const scriptSrc = 'https://storage.googleapis.com/resource-staging.tend.com/crm/widget/widget.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    
    if (existingScript) {
      // Script already exists, just initialize if widget is available
      if (window.SpiraledgeChat) {
        // Use window.location.origin to route through Next.js proxy (avoids CORS)
        const apiUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000';
        window.SpiraledgeChat.init({
          apiUrl: apiUrl,
          widgetId: '9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88',
          pusherKey: '64b7865cd83eddfb95c1',
          pusherCluster: 'mt1'
        });
      }
      return;
    }

    // Load Spiraledge Chat Widget script
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = function() {
      if (window.SpiraledgeChat) {
        // Use window.location.origin to route through Next.js proxy (avoids CORS)
        const apiUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000';
        window.SpiraledgeChat.init({
          apiUrl: apiUrl,
          widgetId: '9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88',
          pusherKey: '64b7865cd83eddfb95c1',
          pusherCluster: 'mt1'
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.querySelector(`script[src="${scriptSrc}"]`);
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);

  return null;
}


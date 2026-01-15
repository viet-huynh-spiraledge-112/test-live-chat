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
    const scriptSrc = 'https://storage.googleapis.com/resource-staging.tend.com/crm/widget/widget-2.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    
    const initWidget = () => {
      // Wait a bit to ensure widget script is fully loaded
      setTimeout(() => {
        if (window.SpiraledgeChat && typeof window.SpiraledgeChat.init === 'function') {
          const apiUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4000';
          const config = {
            apiUrl: apiUrl,
            widgetId: '9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88',
            pusherKey: '64b7865cd83eddfb95c1',
            pusherCluster: 'mt1'
          };
          
          console.log('[ChatWidget] Initializing with config:', config);
          
          try {
            window.SpiraledgeChat.init(config);
          } catch (error) {
            console.error('[ChatWidget] Init error:', error);
          }
        } else {
          console.warn('[ChatWidget] SpiraledgeChat not available yet');
        }
      }, 100);
    };
    
    if (existingScript) {
      // Script already exists, wait a bit then initialize
      initWidget();
      return;
    }

    // Load Spiraledge Chat Widget script
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.onload = initWidget;
    script.onerror = (error) => {
      console.error('[ChatWidget] Script load error:', error);
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


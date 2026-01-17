'use client';

import Script from 'next/script';
import { useCallback, useRef, useEffect } from 'react';

interface SpiraledgeChatWidgetProps {
  apiUrl: string;
  widgetId: string;
  pusherKey: string;
  pusherCluster: string;
}

interface SpiraledgeChat {
  init: (config: SpiraledgeChatWidgetProps) => void;
}

declare global {
  interface Window {
    SpiraledgeChat?: SpiraledgeChat;
  }
}

export function SpiraledgeChatWidget({
  apiUrl,
  widgetId,
  pusherKey,
  pusherCluster,
}: SpiraledgeChatWidgetProps) {
  // Use refs to always have latest prop values
  const apiUrlRef = useRef(apiUrl);
  const widgetIdRef = useRef(widgetId);
  const pusherKeyRef = useRef(pusherKey);
  const pusherClusterRef = useRef(pusherCluster);
  
  // Update refs when props change
  useEffect(() => {
    apiUrlRef.current = apiUrl;
    widgetIdRef.current = widgetId;
    pusherKeyRef.current = pusherKey;
    pusherClusterRef.current = pusherCluster;
  }, [apiUrl, widgetId, pusherKey, pusherCluster]);

  const initializeWidget = useCallback(() => {
    // Retry mechanism in case global isn't immediately available
    const tryInit = (attempts = 0) => {
      // Always use latest props from refs
      const currentConfig = {
        apiUrl: apiUrlRef.current,
        widgetId: widgetIdRef.current,
        pusherKey: pusherKeyRef.current,
        pusherCluster: pusherClusterRef.current,
      };
      
      if (window.SpiraledgeChat) {
        try {
          // Validate config before passing
          if (!currentConfig.apiUrl || !currentConfig.widgetId) {
            console.error('Invalid config:', currentConfig);
            return;
          }
          
          console.log('Initializing Spiraledge widget with config:', currentConfig);
          window.SpiraledgeChat.init(currentConfig);
        } catch (error) {
          console.error('Failed to initialize Spiraledge widget:', error);
        }
      } else if (attempts < 5) {
        // Retry up to 5 times with increasing delay
        setTimeout(() => tryInit(attempts + 1), 100 * (attempts + 1));
      } else {
        console.error('SpiraledgeChat not available after multiple attempts');
      }
    };
    
    tryInit();
  }, []); // No dependencies - always use refs

  const handleScriptReady = useCallback(() => {
    initializeWidget();
  }, [initializeWidget]);

  const handleScriptError = useCallback((error: Error) => {
    console.error('Failed to load Spiraledge widget script:', error);
  }, []);

  return (
    <>
      <Script
        id="pusher-js"
        src="https://js.pusher.com/8.4.0/pusher.min.js"
        strategy="beforeInteractive"
      />
      <Script
        id="spiraledge-widget"
        src="https://storage.googleapis.com/resource-staging.tend.com/crm/widget/widget-6.js"
        strategy="afterInteractive"
        onReady={handleScriptReady}
        onError={handleScriptError}
      />
    </>
  );
}

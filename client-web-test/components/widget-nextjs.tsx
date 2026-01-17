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
  getState?: () => { isInitialized: boolean };
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
  const isInitializingRef = useRef(false); // Prevent duplicate init
  const hasInitializedRef = useRef(false); // Track if ever initialized
  
  // Update refs when props change
  useEffect(() => {
    apiUrlRef.current = apiUrl;
    widgetIdRef.current = widgetId;
    pusherKeyRef.current = pusherKey;
    pusherClusterRef.current = pusherCluster;
  }, [apiUrl, widgetId, pusherKey, pusherCluster]);

  // Monitor and remove duplicate widget elements
  useEffect(() => {
    const checkForDuplicates = () => {
      const widgets = document.querySelectorAll('#spiraledge-chat-widget');
      if (widgets.length > 1) {
        console.warn(`[SpiraledgeChat] Found ${widgets.length} widget elements, removing duplicates...`);
        // Keep the first one, remove the rest
        for (let i = 1; i < widgets.length; i++) {
          widgets[i].remove();
        }
      }
    };

    // Check immediately
    checkForDuplicates();

    // Set up interval to check periodically (in case duplicates are created later)
    const interval = setInterval(checkForDuplicates, 1000);

    return () => clearInterval(interval);
  }, []);

  const initializeWidget = useCallback(() => {
    console.log('[DEBUG] initializeWidget called, hasInitialized:', hasInitializedRef.current);
    
    // Check if widget DOM element already exists
    const existingWidget = document.getElementById('spiraledge-chat-widget');
    if (existingWidget) {
      console.log('[SpiraledgeChat] Widget DOM element already exists, skipping initialization...');
      return;
    }
    
    // Skip if already initialized once
    if (hasInitializedRef.current) {
      console.log('[SpiraledgeChat] Already initialized once, skipping...');
      return;
    }
    
    // Prevent duplicate initialization
    if (isInitializingRef.current) {
      console.log('[SpiraledgeChat] Already initializing, skipping...');
      return;
    }
    
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
          
          // Check if already initialized
          const widgetState = window.SpiraledgeChat.getState?.();
          if (widgetState?.isInitialized) {
            console.log('[SpiraledgeChat] Already initialized, skipping...');
            return;
          }
          
          // Double-check DOM element doesn't exist before init
          if (document.getElementById('spiraledge-chat-widget')) {
            console.log('[SpiraledgeChat] Widget DOM element found before init, skipping...');
            return;
          }
          
          isInitializingRef.current = true;
          console.log('Initializing Spiraledge widget with config:', currentConfig);
          window.SpiraledgeChat.init(currentConfig);
          hasInitializedRef.current = true; // Mark as initialized
          isInitializingRef.current = false;
        } catch (error) {
          console.error('Failed to initialize Spiraledge widget:', error);
          isInitializingRef.current = false;
        }
      } else if (attempts < 5) {
        // Retry up to 5 times with increasing delay
        setTimeout(() => tryInit(attempts + 1), 100 * (attempts + 1));
      } else {
        console.error('SpiraledgeChat not available after multiple attempts');
        isInitializingRef.current = false;
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
        src="https://storage.googleapis.com/resource-staging.tend.com/crm/widget/widget-8.js"
        strategy="afterInteractive"
        onReady={handleScriptReady}
        onError={handleScriptError}
      />
    </>
  );
}

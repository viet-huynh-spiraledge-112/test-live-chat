'use client';

import Script from 'next/script';
import { useCallback, useRef, useEffect } from 'react';

interface SpiraledgeWidgetConfig {
  apiUrl: string;
  widgetId: string;
  pusherKey: string;
  pusherCluster: string;
}

interface SpiraledgeChat {
  init: (config: SpiraledgeWidgetConfig) => void;
  getState?: () => { isInitialized: boolean };
}

declare global {
  interface Window {
    SpiraledgeChat?: SpiraledgeChat;
  }
}

interface SpiraledgeWidgetProps {
  config: SpiraledgeWidgetConfig;
}

export default function SpiraledgeWidget({ config }: SpiraledgeWidgetProps) {
  // Use ref to always have latest config value
  const configRef = useRef(config);
  const isInitializingRef = useRef(false); // Prevent duplicate init
  
  // Update ref when config changes
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const initializeWidget = useCallback(() => {
    // Prevent duplicate initialization
    if (isInitializingRef.current) {
      console.log('[SpiraledgeChat] Already initializing, skipping...');
      return;
    }
    
    // Retry mechanism in case global isn't immediately available
    const tryInit = (attempts = 0) => {
      // Always use latest config from ref
      const currentConfig = configRef.current;
      
      if (window.SpiraledgeChat) {
        try {
          // Validate config before passing
          if (!currentConfig || !currentConfig.apiUrl || !currentConfig.widgetId) {
            console.error('Invalid config:', currentConfig);
            return;
          }
          
          // Check if already initialized
          const widgetState = window.SpiraledgeChat.getState?.();
          if (widgetState?.isInitialized) {
            console.log('[SpiraledgeChat] Already initialized, skipping...');
            return;
          }
          
          // Create a plain object to ensure widget library can read properties correctly
          const plainConfig = {
            apiUrl: currentConfig.apiUrl,
            widgetId: currentConfig.widgetId,
            pusherKey: currentConfig.pusherKey,
            pusherCluster: currentConfig.pusherCluster
          };
          
          isInitializingRef.current = true;
          console.log('Initializing Spiraledge widget with config:', plainConfig);
          window.SpiraledgeChat.init(plainConfig);
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
  }, []); // No dependencies - always use ref

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

'use client';

import { useEffect } from 'react';
import { SpiraledgeChatWidget } from './widget-nextjs';

interface SpiraledgeWidgetWrapperProps {
  apiUrl: string;
  widgetId: string;
  pusherKey: string;
  pusherCluster: string;
}

export default function SpiraledgeWidgetWrapper(props: SpiraledgeWidgetWrapperProps) {
  useEffect(() => {
    // Listen for widget events and auto-start conversation if needed
    const handleWidgetMessage = (event: MessageEvent) => {
      if (event.data?.type === 'spiraledge-widget-message') {
        // Auto-start conversation on first message
        if (window.SpiraledgeChat && typeof (window.SpiraledgeChat as any).startConversation === 'function') {
          (window.SpiraledgeChat as any).startConversation();
        }
      }
    };

    window.addEventListener('message', handleWidgetMessage);
    return () => window.removeEventListener('message', handleWidgetMessage);
  }, []);

  return <SpiraledgeChatWidget {...props} />;
}

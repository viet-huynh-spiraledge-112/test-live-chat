'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Pusher, { Channel } from 'pusher-js';
import type {
  WidgetConfig,
  Message,
  ConversationUpdateEvent,
  LiveChatWidgetProps,
} from './types';

const SESSION_STORAGE_KEYS = {
  SESSION_ID: 'widget_session_id',
  CONVERSATION_ID: 'conversation_id',
  PUSHER_KEY: 'pusher_key',
  PUSHER_CLUSTER: 'pusher_cluster',
  SESSION_TIME: 'session_time',
} as const;

const SESSION_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

export function useChatWidget({
  apiUrl,
  widgetKey,
  pusherKey,
  pusherCluster,
  visitorEmail,
  visitorName,
}: LiveChatWidgetProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isConversationClosed, setIsConversationClosed] = useState(false);
  const [typingAgent, setTypingAgent] = useState<string | null>(null);
  const [isPusherConnected, setIsPusherConnected] = useState(false);

  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<Channel | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isSessionValid = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    const storedSessionId = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_ID);
    const sessionTime = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_TIME);

    if (!storedSessionId || !sessionTime) return false;

    const now = Date.now();
    const sessionAge = now - parseInt(sessionTime);

    return sessionAge < SESSION_MAX_AGE;
  }, []);

  const clearSession = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    Object.values(SESSION_STORAGE_KEYS).forEach((key) => {
      sessionStorage.removeItem(key);
    });
    setSessionId(null);
    setConversationId(null);
    setMessages([]);
    setIsInitialized(false);
  }, []);

  const handleConversationUpdate = useCallback((data: ConversationUpdateEvent) => {
    console.log('Conversation update received:', data);

    switch (data.event_type) {
      case 'message_sent':
        if (data.data.message && data.data.message.sender_type === 'AGENT') {
          setMessages((prev) => [...prev, data.data.message!]);
          
          if (config?.behavior_settings.sound_enabled) {
            const audio = new Audio('/notification.mp3');
            audio.play().catch((err) => console.log('Could not play sound:', err));
          }

          if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(`New message from ${data.data.message.sender_name}`, {
              body: data.data.message.content,
              icon: data.data.message.sender_avatar || '/default-avatar.png',
            });
          }
        }
        break;

      case 'status_changed':
        if (data.data.new_status === 'CLOSED') {
          setIsConversationClosed(true);
        }
        break;

      case 'agent_typing':
        if (data.data.agent_name && config?.behavior_settings.show_agent_typing) {
          setTypingAgent(data.data.agent_name);
          
          if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
          }
          
          typingTimeoutRef.current = setTimeout(() => {
            setTypingAgent(null);
          }, 3000);
        }
        break;
    }
  }, [config]);

  const setupPusher = useCallback(
    (convId: string) => {
      const storedPusherKey = sessionStorage.getItem(SESSION_STORAGE_KEYS.PUSHER_KEY) || pusherKey;
      const storedPusherCluster = sessionStorage.getItem(SESSION_STORAGE_KEYS.PUSHER_CLUSTER) || pusherCluster;
      const storedSessionId = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_ID);

      if (!storedPusherKey || !storedPusherCluster || !storedSessionId) {
        console.error('Missing Pusher configuration');
        return;
      }

      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }

      pusherRef.current = new Pusher(storedPusherKey, {
        cluster: storedPusherCluster,
        authEndpoint: `${apiUrl}/api/widget/pusher/auth/`,
        auth: {
          params: {
            session_id: storedSessionId,
          },
        },
      });

      pusherRef.current.connection.bind('connected', () => {
        console.log('✅ Pusher connected successfully');
        setIsPusherConnected(true);
      });

      pusherRef.current.connection.bind('error', (err: Error) => {
        console.error('❌ Pusher connection error:', err);
        setIsPusherConnected(false);
      });

      pusherRef.current.connection.bind('disconnected', () => {
        console.log('Pusher disconnected, attempting to reconnect...');
        setIsPusherConnected(false);
        setTimeout(() => {
          pusherRef.current?.connect();
        }, 5000);
      });

      channelRef.current = pusherRef.current.subscribe(`private-conversations.${convId}`);

      channelRef.current.bind('pusher:subscription_succeeded', () => {
        console.log('✅ Subscribed to conversation channel');
      });

      channelRef.current.bind('pusher:subscription_error', (status: number) => {
        console.error('❌ Subscription error:', status);
        if (status === 403) {
          setError('Unauthorized to access this conversation');
        }
      });

      channelRef.current.bind('conversation_updated', handleConversationUpdate);
    },
    [apiUrl, pusherKey, pusherCluster, handleConversationUpdate]
  );

  const initializeWidget = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/widget/init/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          widget_key: widgetKey,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          visitor_email: visitorEmail || null,
          visitor_name: visitorName || null,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const { session_id, config: widgetConfig, pusher_key, pusher_cluster } = data.data;

        sessionStorage.setItem(SESSION_STORAGE_KEYS.SESSION_ID, session_id);
        sessionStorage.setItem(SESSION_STORAGE_KEYS.PUSHER_KEY, pusher_key);
        sessionStorage.setItem(SESSION_STORAGE_KEYS.PUSHER_CLUSTER, pusher_cluster);
        sessionStorage.setItem(SESSION_STORAGE_KEYS.SESSION_TIME, Date.now().toString());

        setSessionId(session_id);
        setConfig(widgetConfig);
        setIsInitialized(true);

        console.log('✅ Widget initialized');
        return true;
      } else {
        setError(data.message || 'Failed to initialize widget');
        return false;
      }
    } catch (err) {
      console.error('❌ Initialization error:', err);
      setError('Failed to connect to chat service');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, widgetKey, visitorEmail, visitorName]);

  const startConversation = useCallback(
    async (initialMessage: string) => {
      const currentSessionId = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_ID);

      if (!currentSessionId) {
        setError('No session ID found. Please initialize widget first.');
        return false;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}/api/widget/conversations/start/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: currentSessionId,
            initial_message: initialMessage,
            visitor_email: visitorEmail || null,
            visitor_name: visitorName || null,
          }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          const convId = data.data.conversation_id;

          sessionStorage.setItem(SESSION_STORAGE_KEYS.CONVERSATION_ID, convId);
          setConversationId(convId);
          setIsConversationClosed(false);

          setMessages([
            {
              id: `temp-${Date.now()}`,
              conversation_id: convId,
              content: initialMessage,
              sender_type: 'CUSTOMER',
              timestamp: new Date().toISOString(),
            },
          ]);

          setupPusher(convId);

          console.log('✅ Conversation started');
          return true;
        } else {
          setError(data.message || 'Failed to start conversation');
          return false;
        }
      } catch (err) {
        console.error('❌ Start conversation error:', err);
        setError('Failed to start conversation');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, visitorEmail, visitorName, setupPusher]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const currentSessionId = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_ID);
      const currentConversationId = sessionStorage.getItem(SESSION_STORAGE_KEYS.CONVERSATION_ID);

      if (!currentSessionId || !currentConversationId) {
        setError('No active conversation');
        return false;
      }

      if (isConversationClosed) {
        setError('This conversation has been closed');
        return false;
      }

      const trimmedContent = content.trim();
      if (!trimmedContent || trimmedContent.length > 5000) {
        setError(trimmedContent ? 'Message too long (max 5000 characters)' : 'Message cannot be empty');
        return false;
      }

      try {
        const response = await fetch(
          `${apiUrl}/api/widget/conversations/${currentConversationId}/messages/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: currentSessionId,
              content: trimmedContent,
            }),
          }
        );

        const data = await response.json();

        if (data.status === 'success') {
          setMessages((prev) => [...prev, data.data]);
          return true;
        } else {
          setError(data.message || 'Failed to send message');
          return false;
        }
      } catch (err) {
        console.error('❌ Send message error:', err);
        setError('Failed to send message');
        return false;
      }
    },
    [apiUrl, isConversationClosed]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isSessionValid()) {
      const storedSessionId = sessionStorage.getItem(SESSION_STORAGE_KEYS.SESSION_ID);
      const storedConversationId = sessionStorage.getItem(SESSION_STORAGE_KEYS.CONVERSATION_ID);

      setSessionId(storedSessionId);
      setIsInitialized(true);

      if (storedConversationId) {
        setConversationId(storedConversationId);
        setupPusher(storedConversationId);
      }

      console.log('Resuming session:', storedSessionId);
    }
  }, [isSessionValid, setupPusher]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    isInitialized,
    isLoading,
    error,
    config,
    messages,
    sessionId,
    conversationId,
    isConversationClosed,
    typingAgent,
    isPusherConnected,
    initializeWidget,
    startConversation,
    sendMessage,
    clearSession,
    clearError: () => setError(null),
  };
}

'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useChatWidget } from './useChatWidget';
import type { LiveChatWidgetProps, Message } from './types';
import styles from './LiveChatWidget.module.css';

function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

interface MessageBubbleProps {
  message: Message;
  isVisitor: boolean;
}

function MessageBubble({ message, isVisitor }: MessageBubbleProps) {
  return (
    <div className={`${styles.message} ${isVisitor ? styles.visitorMessage : styles.agentMessage}`}>
      {!isVisitor && (
        <div className={styles.messageAvatar}>
          <img
            src={message.sender_avatar || '/default-avatar.png'}
            alt={message.sender_name || 'Agent'}
          />
        </div>
      )}
      <div className={styles.messageContent}>
        {!isVisitor && message.sender_name && (
          <div className={styles.messageSender}>{message.sender_name}</div>
        )}
        <div
          className={styles.messageText}
          dangerouslySetInnerHTML={{ __html: escapeHtml(message.content) }}
        />
        <div className={styles.messageTime}>{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
}

export function LiveChatWidget({
  apiUrl,
  widgetKey,
  pusherKey,
  pusherCluster,
  visitorEmail,
  visitorName,
}: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isInitialized,
    isLoading,
    error,
    config,
    messages,
    conversationId,
    isConversationClosed,
    typingAgent,
    initializeWidget,
    startConversation,
    sendMessage,
    clearError,
  } = useChatWidget({
    apiUrl,
    widgetKey,
    pusherKey,
    pusherCluster,
    visitorEmail,
    visitorName,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = async () => {
    setIsOpen(true);
    if (!isInitialized) {
      await initializeWidget();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    clearError();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const content = inputValue.trim();
    if (!content) return;

    setInputValue('');

    if (!conversationId) {
      await startConversation(content);
    } else {
      await sendMessage(content);
    }
  };

  const primaryColor = config?.appearance_settings?.primary_color || '#007bff';
  const position = config?.appearance_settings?.position || 'bottom-right';
  const welcomeMessage = config?.content_settings?.welcome_message || 'Hi! How can we help you today?';
  const placeholderText = config?.content_settings?.placeholder_text || 'Type your message...';

  return (
    <div
      className={styles.widgetContainer}
      style={{
        '--primary-color': primaryColor,
        [position === 'bottom-left' ? 'left' : 'right']: '20px',
      } as React.CSSProperties}
    >
      {isOpen ? (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader} style={{ backgroundColor: primaryColor }}>
            <div className={styles.headerInfo}>
              <h3>Live Chat</h3>
              <span className={styles.statusIndicator}>
                {isLoading ? 'Connecting...' : 'Online'}
              </span>
            </div>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.chatMessages}>
            {!conversationId && (
              <div className={styles.welcomeMessage}>
                <p>{welcomeMessage}</p>
              </div>
            )}

            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isVisitor={message.sender_type === 'CUSTOMER'}
              />
            ))}

            {typingAgent && (
              <div className={styles.typingIndicator}>
                {typingAgent} is typing...
              </div>
            )}

            {isConversationClosed && (
              <div className={styles.systemMessage}>
                This conversation has been closed.
              </div>
            )}

            {error && (
              <div className={styles.errorMessage}>
                {error}
                <button onClick={clearError} className={styles.dismissError}>
                  ✕
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className={styles.chatInputForm} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={styles.chatInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholderText}
              disabled={isLoading || isConversationClosed}
              maxLength={5000}
            />
            <button
              type="submit"
              className={styles.sendButton}
              style={{ backgroundColor: primaryColor }}
              disabled={isLoading || isConversationClosed || !inputValue.trim()}
            >
              {isLoading ? (
                <span className={styles.spinner} />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      ) : (
        <button
          className={styles.launcherButton}
          style={{ backgroundColor: primaryColor }}
          onClick={handleOpen}
          aria-label="Open chat"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default LiveChatWidget;

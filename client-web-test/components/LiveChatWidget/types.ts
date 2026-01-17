export interface WidgetConfig {
  appearance_settings: {
    theme: string;
    primary_color: string;
    secondary_color: string;
    position: 'bottom-right' | 'bottom-left';
  };
  content_settings: {
    welcome_message: string;
    offline_message: string;
    placeholder_text: string;
  };
  behavior_settings: {
    show_agent_typing: boolean;
    sound_enabled: boolean;
    auto_open: boolean;
  };
}

export interface InitResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    session_id: string;
    visitor_id: string;
    config: WidgetConfig;
    pusher_key: string;
    pusher_cluster: string;
  };
}

export interface StartConversationResponse {
  status: 'success' | 'error';
  message?: string;
  data?: {
    conversation_id: string;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  sender_type: 'CUSTOMER' | 'AGENT';
  sender_id?: string;
  sender_name?: string;
  sender_avatar?: string;
  timestamp: string;
  message_type?: string;
}

export interface SendMessageResponse {
  status: 'success' | 'error';
  message?: string;
  data?: Message;
}

export interface ConversationUpdateEvent {
  conversation_id: string;
  event_type: 'message_sent' | 'status_changed' | 'agent_typing';
  data: {
    message?: Message;
    old_status?: string;
    new_status?: string;
    agent_name?: string;
  };
  timestamp: string;
}

export interface LiveChatWidgetProps {
  apiUrl: string;
  widgetKey: string;
  pusherKey: string;
  pusherCluster: string;
  visitorEmail?: string;
  visitorName?: string;
}

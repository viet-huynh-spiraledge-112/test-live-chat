'use client';

import { LiveChatWidget } from './LiveChatWidget';

export default function ChatWidget() {
  return (
    <LiveChatWidget
      apiUrl="https://crm-api-staging.spiraledge.com"
      widgetKey="9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88"
      pusherKey="64b7865cd83eddfb95c1"
      pusherCluster="mt1"
    />
  );
}

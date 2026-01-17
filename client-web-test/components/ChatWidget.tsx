'use client';

import { SpiraledgeChatWidget } from './widget-nextjs';

export default function ChatWidget() {
  return (
    <SpiraledgeChatWidget
      apiUrl="https://crm-api-staging.spiraledge.com"
      widgetId="9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88"
      pusherKey="64b7865cd83eddfb95c1"
      pusherCluster="mt1"
    />
  );
}


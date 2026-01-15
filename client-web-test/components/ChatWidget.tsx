'use client';

import { useEffect } from 'react';
import SpiraledgeWidget from './SpiraledgeWidget';

const widgetConfig = {
  apiUrl: 'http://crm-api-staging.spiraledge.com',
  widgetId: '9572bb35552e3100e1ecd2be107842ce18cbc87b3a9fed4e365d08afa1addc88',
  pusherKey: '64b7865cd83eddfb95c1',
  pusherCluster: 'mt1'
};



export default function ChatWidget() {
  //return null;
  return <SpiraledgeWidget config={widgetConfig} />;
}


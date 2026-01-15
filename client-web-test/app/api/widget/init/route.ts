import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Log để debug - this should be called if route is matched
  console.log('[Widget Init Route] POST handler called - Route matched!');
  console.log('[Widget Init Route] Request URL:', request.url);
  console.log('[Widget Init Route] Request method:', request.method);
  console.log('[Widget Init Route] Request headers:', Object.fromEntries(request.headers.entries()));
  
  try {
    const url = new URL(request.url);
    
    // Build the target URL - ensure no trailing slash
    const targetUrl = `https://crm-api-staging.spiraledge.com/api/widget/init${url.search}`;
    console.log('[Widget Init Route] Proxying to:', targetUrl);
    
    // Get request body
    let body: BodyInit | undefined;
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      try {
        const jsonData = await request.json();
        
        // Transform widget_id to widget_key in request body if needed
        if (jsonData && typeof jsonData === 'object' && 'widget_id' in jsonData) {
          const transformedData = { ...jsonData };
          transformedData.widget_key = (jsonData as any).widget_id;
          delete transformedData.widget_id;
          body = JSON.stringify(transformedData);
        } else {
          body = JSON.stringify(jsonData);
        }
      } catch (e) {
        body = await request.text();
      }
    } else {
      body = await request.text();
    }

    // Prepare headers
    const headers: HeadersInit = {
      ...Object.fromEntries(
        Array.from(request.headers.entries()).filter(([key]) => 
          !['host', 'connection', 'content-length'].includes(key.toLowerCase())
        )
      ),
    };

    // Forward the request
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body,
    });

    // Get response data
    const responseText = await response.text();
    console.log('[Widget Init Route] Response status:', response.status);
    
    // Create response with same status
    const nextResponse = new NextResponse(responseText, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy relevant headers
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (!['content-encoding', 'transfer-encoding', 'content-length'].includes(lowerKey)) {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Handle GET requests (should not happen, but just in case)
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405, headers: { Allow: 'POST, OPTIONS' } }
  );
}

export async function OPTIONS(request: NextRequest) {
  // Handle CORS preflight
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

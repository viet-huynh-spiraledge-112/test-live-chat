import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, await params);
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // Handle CORS preflight
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

async function proxyRequest(
  request: NextRequest,
  params: { path: string[] }
) {
  try {
    let path = params.path.join('/');
    const url = new URL(request.url);
    
    // Handle trailing slash - remove it to avoid redirect issues
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    // Build the target URL
    const targetUrl = `https://crm-api-staging.spiraledge.com/api/widget/${path}${url.search}`;
    
    // Get request body if exists
    let body: BodyInit | undefined;
    const contentType = request.headers.get('content-type');
    
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      if (contentType?.includes('application/json')) {
        try {
          const jsonData = await request.json();
          
          // Transform widget_id to widget_key in request body
          if (jsonData && typeof jsonData === 'object' && 'widget_id' in jsonData) {
            const transformedData = { ...jsonData };
            transformedData.widget_key = (jsonData as any).widget_id;
            delete transformedData.widget_id;
            body = JSON.stringify(transformedData);
          } else {
            body = JSON.stringify(jsonData);
          }
        } catch (e) {
          // If no JSON body, try text
          body = await request.text();
        }
      } else if (contentType?.includes('multipart/form-data')) {
        body = await request.formData();
      } else {
        body = await request.text();
      }
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
      method: request.method,
      headers,
      body,
    });

    // Get response data
    const responseText = await response.text();
    
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

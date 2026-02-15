import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const organization = searchParams.get("organization");
    const eventType = searchParams.get("eventType");
    const date = searchParams.get("date");
    const timezone = searchParams.get("timezone") || 'UTC';

    if (!organization || !eventType || !date) {
      return NextResponse.json({ 
        error: "Missing required parameters: organization, eventType, date" 
      }, { status: 400 });
    }

    console.log('Fetching availability for:', { organization, eventType, date, timezone });

    const calendlyUrl = `https://calendly.com/${organization}/${eventType}`;
    
    // Step 1: Get the event type info from the booking page
    const pageRes = await fetch(calendlyUrl, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!pageRes.ok) {
      console.error('Failed to fetch Calendly page:', pageRes.status);
      return NextResponse.json({ 
        error: `Calendly page not found: ${calendlyUrl}. Please check the link is correct.` 
      }, { status: 404 });
    }

    const pageHtml = await pageRes.text();
    
    // Try to extract event type info from various patterns in the HTML
    let eventInfo: any = {};
    
    // Look for embedded JSON data
    const jsonDataMatch = pageHtml.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/);
    if (jsonDataMatch) {
      try {
        const initialState = JSON.parse(jsonDataMatch[1]);
        console.log('Found __INITIAL_STATE__');
        eventInfo = initialState.eventType || initialState;
      } catch (e) {
        console.log('Failed to parse __INITIAL_STATE__');
      }
    }
    
    // Alternative: Look for event type data in script tags
    if (!eventInfo.uuid) {
      const scriptMatch = pageHtml.match(/<script[^>]*>[\s\S]*?"event_type"[\s\S]*?(\{[\s\S]*?\})[\s\S]*?<\/script>/);
      if (scriptMatch) {
        console.log('Found event_type in script');
      }
    }
    
    // Try to find the invitee scheduling URL pattern
    const inviteeUrlMatch = pageHtml.match(/invitee_scheduling_url[^"]*"([^"]+)"/);
    if (inviteeUrlMatch) {
      console.log('Found invitee_scheduling_url:', inviteeUrlMatch[1]);
    }

    // Step 2: Use the invitee_scheduling_slots endpoint (this is what Calendly's frontend uses)
    // We need to construct the proper URL for the API
    const apiUrl = `https://calendly.com/api/booking/event_types/${organization}/${eventType}/calendar/range`;
    
    const params = new URLSearchParams({
      timezone: timezone,
      diagnostics: 'false',
      start_date: date,
      end_date: date
    });

    console.log('Fetching from:', `${apiUrl}?${params.toString()}`);

    const availabilityRes = await fetch(`${apiUrl}?${params.toString()}`, {
      headers: {
        'Accept': 'application/json',
        'Referer': calendlyUrl,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!availabilityRes.ok) {
      const errorText = await availabilityRes.text();
      console.error('Availability API failed:', availabilityRes.status, errorText);
      
      // If the API fails, provide manual instructions
      return NextResponse.json({ 
        error: `Unable to automatically fetch availability from Calendly. The API returned: ${availabilityRes.status}. This usually means the Calendly user has restricted access or the event type is private.`,
        suggestion: "Please manually check the Calendly link and enter available times",
        manualLink: calendlyUrl
      }, { status: 502 });
    }

    const availabilityData = await availabilityRes.json();
    console.log('Availability response:', availabilityData);

    // Transform the data
    const availableSlots = availabilityData.days?.[0]?.spots?.map((spot: any) => ({
      start_time: spot.start_time,
      end_time: spot.end_time
    })) || [];

    return NextResponse.json({
      available_times: availableSlots,
      source: 'calendly_api'
    });

  } catch (error: any) {
    console.error('Calendly API error:', error);
    return NextResponse.json({ 
      error: error.message || "Internal server error" 
    }, { status: 500 });
  }
}
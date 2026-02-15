import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log('Session in calendar API:', session ? { 
    hasAccessToken: !!session.accessToken, 
    user: session.user?.email,
    keys: Object.keys(session)
  } : 'No session');
  
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
  }

  try {
    // Create OAuth2 client and set credentials
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    });
    
    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    
    console.log('Fetching events from:', start.toISOString(), 'to', end.toISOString());
    
    const eventsRes = await calendar.events.list({
      calendarId: "primary",
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 50,
    });
    
    console.log('Found events:', eventsRes.data.items?.length || 0);
    return NextResponse.json({ events: eventsRes.data.items || [] });
  } catch (error: any) {
    console.error('Calendar API error:', error);
    return NextResponse.json({ error: error.message || "Failed to fetch calendar events" }, { status: 500 });
  }
} 
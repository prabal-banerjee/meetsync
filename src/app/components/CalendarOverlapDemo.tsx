"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Link2, ChevronLeft, ChevronRight, LogIn, Loader2, CheckCircle2, XCircle } from "lucide-react";

interface CalendarEvent {
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  summary: string;
}

const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const hour = Math.floor(i / 2) + 7;
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
}

function formatTime(timeStr: string) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

function parseCalendlyUrl(url: string) {
  const match = url.match(/calendly\.com\/([^\/]+)\/([^\/?]+)/);
  return match ? { username: match[1], eventType: match[2] } : null;
}

export default function CalendarOverlapDemo() {
  const { data: session, status } = useSession();
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [calendlyEmbedUrl, setCalendlyEmbedUrl] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<'input' | 'split'>('input');

  const fetchCalendarEvents = useCallback(async (targetDate: string) => {
    console.log('fetchCalendarEvents called with date:', targetDate);
    console.log('Session exists:', !!session);
    
    if (!session) {
      console.log('No session, skipping fetch');
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      console.log('Fetching from API...');
      const res = await fetch(`/api/calendar/free-slots?date=${targetDate}`, {
        credentials: 'include'
      });
      const data = await res.json();
      console.log('API response status:', res.status);
      console.log('API response data:', data);
      
      if (res.ok) {
        console.log('Setting events:', data.events?.length || 0);
        setEvents(data.events || []);
      } else {
        console.error('API error:', data.error);
        setError(data.error || "Failed to fetch calendar events");
        setEvents([]);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message || "An error occurred");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Only fetch when entering split view for the first time or when date changes manually
  const [lastFetchedDate, setLastFetchedDate] = useState<string | null>(null);
  
  useEffect(() => {
    if (viewMode === 'split' && session && lastFetchedDate !== date) {
      fetchCalendarEvents(date);
      setLastFetchedDate(date);
    }
  }, [date, viewMode, session]); // Remove fetchCalendarEvents from deps

  const eventMap = useMemo(() => {
    const map = new Map<string, CalendarEvent>();
    
    TIME_SLOTS.forEach(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const slotTime = new Date(date);
      slotTime.setHours(hours, minutes, 0, 0);
      
      for (const event of events) {
        const eventStart = new Date(event.start.dateTime || event.start.date || '');
        const eventEnd = new Date(event.end.dateTime || event.end.date || '');
        
        if (slotTime >= eventStart && slotTime < eventEnd) {
          map.set(time, event);
          break;
        }
      }
    });
    
    return map;
  }, [events, date]);

  const handleShowSplitView = () => {
    if (!calendlyUrl) {
      setError("Please enter a Calendly URL");
      return;
    }
    
    const parsed = parseCalendlyUrl(calendlyUrl);
    if (!parsed) {
      setError("Invalid Calendly URL. Format: https://calendly.com/username/event-type");
      return;
    }

    setCalendlyEmbedUrl(`${calendlyUrl}?month=${date.slice(0, 7)}&date=${date}`);
    setViewMode('split');
    setError("");
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (viewMode === 'split' && calendlyUrl) {
      setCalendlyEmbedUrl(`${calendlyUrl}?month=${newDate.slice(0, 7)}&date=${newDate}`);
    }
  };

  const changeDate = (days: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + days);
    handleDateChange(currentDate.toISOString().split('T')[0]);
  };

  if (viewMode === 'split') {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setViewMode('input')}
              className="text-slate-600 hover:text-slate-900"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900">MeetSync</h1>
              <p className="text-sm text-slate-500">Compare availability side-by-side</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <Button variant="ghost" size="icon" onClick={() => changeDate(-1)} className="h-8 w-8">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <button
              id="date-button"
              onClick={(e) => {
                const button = e.currentTarget;
                const rect = button.getBoundingClientRect();
                
                const input = document.createElement('input');
                input.type = 'date';
                input.value = date;
                input.style.position = 'fixed';
                input.style.top = `${rect.top + rect.height / 2}px`;
                input.style.left = `${rect.left + rect.width / 2}px`;
                input.style.width = '1px';
                input.style.height = '1px';
                input.style.opacity = '0';
                input.style.pointerEvents = 'none';
                input.style.zIndex = '-1';
                
                input.onchange = (evt) => {
                  handleDateChange((evt.target as HTMLInputElement).value);
                  if (document.body.contains(input)) {
                    document.body.removeChild(input);
                  }
                };
                
                input.onblur = () => {
                  setTimeout(() => {
                    if (document.body.contains(input)) {
                      document.body.removeChild(input);
                    }
                  }, 200);
                };
                
                document.body.appendChild(input);
                
                // Focus and trigger the picker
                input.focus();
                if (typeof input.showPicker === 'function') {
                  try {
                    input.showPicker();
                  } catch (err) {
                    input.click();
                  }
                } else {
                  input.click();
                }
              }}
              className="font-semibold text-slate-900 min-w-[180px] text-center hover:bg-slate-200 rounded px-3 py-1 transition-colors"
            >
              {formatDate(date)}
            </button>
            <Button variant="ghost" size="icon" onClick={() => changeDate(1)} className="h-8 w-8">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600 hidden sm:block">{session.user?.email}</span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Sign out
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => signIn("google")}>
              <LogIn className="w-4 h-4 mr-1" />
              Sign in
            </Button>
          )}
        </header>

        {/* Main Content */}
        <main className="flex h-[calc(100vh-80px)]">
          {/* Left Side - Calendly */}
          <div className="w-1/2 border-r border-slate-200 bg-white flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Link2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Their Calendar</h2>
                  <p className="text-blue-100 text-sm">Calendly availability</p>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <iframe
                src={calendlyEmbedUrl}
                className="w-full h-full border-0"
                title="Calendly Scheduling"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
              />
            </div>
          </div>

          {/* Right Side - Your Calendar */}
          <div className="w-1/2 bg-white flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Your Calendar</h2>
                  <p className="text-emerald-100 text-sm">
                    {session ? 'Google Calendar events' : 'Sign in to view'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {!session ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="bg-slate-100 p-6 rounded-full mb-4">
                    <LogIn className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Sign in required</h3>
                  <p className="text-slate-600 mb-6 max-w-sm">
                    Connect your Google Calendar to see your availability and find overlapping free slots.
                  </p>
                  <Button onClick={() => signIn("google")} size="lg">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign in with Google
                  </Button>
                </div>
              ) : loading ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                  <p className="text-slate-600">Loading your calendar...</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {TIME_SLOTS.map((time) => {
                    const event = eventMap.get(time);
                    return (
                      <div
                        key={time}
                        className={`flex items-center px-6 py-3 transition-colors ${
                          event 
                            ? 'bg-red-50/50 hover:bg-red-50' 
                            : 'bg-emerald-50/30 hover:bg-emerald-50/50'
                        }`}
                      >
                        <span className="w-20 text-sm font-medium text-slate-600">
                          {formatTime(time)}
                        </span>
                        <div className="flex-1">
                          {event ? (
                            <div className="flex items-center gap-2 min-w-0">
                              <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                              <span className="text-sm font-medium text-red-700 truncate block max-w-[200px]" title={event.summary || 'Busy'}>
                                {event.summary || 'Busy'}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span className="text-sm text-emerald-700">Available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {session && !loading && events.length === 0 && (
                <div className="p-8 text-center">
                  <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">You're free!</h3>
                  <p className="text-slate-600">No events scheduled for this day.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Input Mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold">MeetSync</h1>
            </div>
            <p className="text-blue-100">
              Find the perfect meeting time by comparing Calendly availability with your Google Calendar.
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Calendly Input */}
            <div className="space-y-2">
              <Label htmlFor="calendly-link" className="text-sm font-semibold text-slate-700">
                Calendly Link
              </Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="calendly-link"
                  type="url"
                  placeholder="https://calendly.com/username/meeting"
                  value={calendlyUrl}
                  onChange={e => setCalendlyUrl(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Auth Status */}
            {status === 'loading' ? (
              <div className="flex items-center justify-center gap-2 py-4 text-slate-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Checking session...</span>
              </div>
            ) : !session ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <LogIn className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-900 mb-1">Connect your calendar</h3>
                    <p className="text-sm text-amber-800 mb-3">
                      Sign in with Google to see your availability and find overlapping free slots.
                    </p>
                    <Button 
                      onClick={() => signIn("google")} 
                      variant="outline" 
                      className="w-full border-amber-300 hover:bg-amber-100"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign in with Google
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-emerald-900">{session.user?.email}</p>
                    <p className="text-sm text-emerald-700">Connected to Google Calendar</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => signOut()}
                    className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            )}

            {/* How it works */}
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-slate-900 text-sm">How it works</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <span className="text-slate-600">Paste the Calendly link from the person you want to meet</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <span className="text-slate-600">Sign in with Google to load your calendar</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <span className="text-slate-600">Compare calendars side-by-side and pick a free slot</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              onClick={handleShowSplitView}
              disabled={!calendlyUrl}
            >
              Compare Calendars
            </Button>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Your calendar data stays private and is never stored.
        </p>
      </div>
    </div>
  );
}

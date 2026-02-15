# MeetSync

Find the perfect meeting time by comparing Calendly availability with your Google Calendar side-by-side.

## Features

- **Side-by-side view**: See Calendly and Google Calendar in one screen
- **No manual input needed**: Automatically fetches your calendar events
- **Visual availability**: Red = Busy, Green = Available
- **Date sync**: Change date once, both calendars update
- **Quick date picker**: Click the date to open calendar picker

## Getting Started

### Prerequisites

- Google OAuth credentials (Client ID and Secret)
- NextAuth secret

### Environment Variables

Create a `.env.local` file:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### How to Use

1. Paste a Calendly link
2. Sign in with Google
3. Click "Compare Calendars"
4. Pick the same date on both sides
5. Find overlapping free slots!

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- NextAuth.js
- Google Calendar API
- shadcn/ui

## Privacy

Your calendar data is fetched directly to your browser and is never stored on any server.

## License

This project is open source and available under the [MIT License](LICENSE).
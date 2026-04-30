# NexusRoute Frontend

Live prototype deployed at **https://nexus-route.vercel.app**

Frontend for NexusRoute, an AI-powered logistics resilience co-pilot built for the Google Solution Challenge India 2026.

## Tech Stack
- React 18, Vite, TypeScript
- Ant Design, React Router
- Clerk authentication
- Deck.gl for geospatial visualization

## Core Pages
- `/pay` — Landing and demo entry
- `/demo` — Crisis simulation interface
- `/admin` — Analytics dashboard (admin-only)
- `/sign-in` — Authentication

## For Maintainers: Local Development
```bash
npm install
npm run dev
# → http://localhost:5173
```

Set `.env` with:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_...
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
VITE_ADMIN_WHITELIST=your-email@example.com
```

Production vars are set in Vercel.

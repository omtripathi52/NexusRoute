# NexusRoute Frontend

Frontend application for the NexusRoute logistics resilience prototype.

## Tech Stack
- React 18
- Vite
- TypeScript/JavaScript
- Ant Design
- React Router
- Clerk authentication

## Run Locally
```bash
npm install
npm run dev
```

Default local URL: `http://localhost:5173`

## Environment Variables
Create `.env` in `frontend/` with:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_...
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws
VITE_ADMIN_WHITELIST=admin@example.com
```

For production, set these values in Vercel project settings.

## Core Routes
- `/pay` - Landing and demo entry page
- `/port` - Port selection and scenario setup
- `/demo` - Crisis simulation interface
- `/admin` - Admin analytics view
- `/sign-in` - Authentication page

## Production Notes
- SPA deep-link routing is configured via `vercel.json` rewrite.
- Auth redirects are configured to return users to app routes.
- API calls use runtime environment variables; avoid hardcoded localhost URLs in production.

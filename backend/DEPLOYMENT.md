# Backend Deployment Guide (Render)

This guide deploys the FastAPI backend for NexusRoute and connects it to the Vercel frontend.

## 1) Create Render Web Service
1. Log in to Render.
2. Create a new **Web Service** from GitHub.
3. Select repository: `omtripathi52/NexusRoute`.
4. Set **Root Directory** to `backend`.

## 2) Build and Start Commands
- Build Command:
  - `pip install -r requirements.txt`
- Start Command:
  - `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 3) Required Backend Environment Variables
Set these in Render service settings:
- `CLERK_SECRET_KEY`
- `CLERK_ISSUER_URL`
- `ADMIN_WHITELIST`

Set any additional API keys required by optional modules.

## 4) Deploy and Verify Backend
After deployment, open:
- `https://<your-backend-domain>/docs`
- `https://<your-backend-domain>/api/hedge/health`

If these fail, check Render logs for missing env vars or import errors.

## 5) Connect Vercel Frontend to Backend
In Vercel project environment variables, set:
- `VITE_CLERK_PUBLISHABLE_KEY=pk_...`
- `VITE_API_BASE_URL=https://<your-backend-domain>`
- `VITE_WS_URL=wss://<your-backend-domain>/ws`
- `VITE_ADMIN_WHITELIST=<comma_separated_admin_emails>`

Redeploy Vercel after updating variables.

## 6) Final Validation Checklist
- `/pay` loads with no white screen.
- `/port` and `/demo` open directly (deep links work).
- Sign-in and sign-out return to app routes.
- `/admin` loads analytics from backend (no JSON parse errors).

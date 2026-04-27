# NexusRoute

Google Solution Challenge India 2026 submission for Smart Supply Chains: Resilient Logistics.

## Live Links
- Live Prototype: https://nexus-route.vercel.app/pay
- Repository: https://github.com/omtripathi52/NexusRoute

## Problem
When geopolitical disruptions happen (for example, Red Sea or canal blockages), logistics teams often operate reactively across fragmented tools. Decisions are delayed, costs rise, and critical supply chains become fragile.

## Solution
NexusRoute is an AI-powered logistics resilience co-pilot that helps teams:
- detect emerging disruption signals,
- compare rerouting options,
- evaluate financial and compliance risk,
- and execute human-approved mitigation decisions faster.

Core system capabilities include:
- Market Sentinel for geopolitical signal monitoring,
- Logistics Orchestrator for route planning,
- Financial Hedge agent for cost/risk exposure,
- Compliance analysis for document-heavy checks,
- Human-in-the-loop approval for critical execution.

## AI and Tech Stack
- Frontend: React, TypeScript, Vite, Deck.gl
- Backend: FastAPI, Python
- Auth: Clerk
- AI: Gemini-based reasoning and multimodal analysis pipeline
- Data: SQLite + vector retrieval components

## Judge Quick Start (No Local Setup Needed)
1. Open https://nexus-route.vercel.app/pay
2. Click Watch Demo
3. Select ports and start the scenario
4. Review route reasoning, risk context, and recommended mitigation path

Note: Some advanced analytics panels depend on backend API availability and credentials.

## Current Deployment Status
- Frontend is live on Vercel.
- Backend deployment is documented below and can be connected using environment variables.

## Backend Deployment (Render) - Step by Step
1. Create a new Web Service on Render from this GitHub repository.
2. Set Root Directory to `backend`.
3. Build Command:
   - `pip install -r requirements.txt`
4. Start Command:
   - `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add backend environment variables:
   - `CLERK_SECRET_KEY=<your_clerk_secret_key>`
   - `CLERK_ISSUER_URL=<your_clerk_issuer_url>`
   - `ADMIN_WHITELIST=<comma_separated_admin_emails>`
6. Deploy and copy your backend public URL.

### Connect Frontend to Backend (Vercel)
Add these environment variables in the Vercel project:
- `VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>`
- `VITE_API_BASE_URL=https://<your-render-backend-domain>`
- `VITE_WS_URL=wss://<your-render-backend-domain>/ws`
- `VITE_ADMIN_WHITELIST=<comma_separated_admin_emails>`

Then redeploy the frontend.

## Local Development (Optional)
### Backend
```bash
cd backend
python -m venv venv
# Windows PowerShell
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python start_server.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Project Notes for Evaluation
- Designed for resilient logistics decision support in disruption scenarios.
- Emphasizes explainable reasoning and operator control (human-in-the-loop).
- Architecture is modular for integration with production data feeds and enterprise systems.

## License
MIT

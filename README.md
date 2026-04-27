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

## Project Notes for Evaluation
- Designed for resilient logistics decision support in disruption scenarios.
- Emphasizes explainable reasoning and operator control (human-in-the-loop).
- Architecture is modular for integration with production data feeds and enterprise systems.

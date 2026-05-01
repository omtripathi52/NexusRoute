---
trigger: always_on
---

## Base Rules

0. Use UTF-8 encoding for all files.
1. Keep all code, comments, and user-facing strings in English.
2. Keep `.gitignore` aligned with project needs (`node_modules`, `.env`, build outputs, cache files).
3. Preserve the current project structure for hackathon stability.

## API Rules

4. For LLM or external API usage, follow `.agent/rules/API.md` for key handling and safety rules.
5. If API keys, endpoints, or repo metadata are unclear, check Markdown files under `.agent` before changing behavior.

## Project Context

6. This project is `NexusRoute` (Google Solution Challenge India 2026) and must stay aligned to logistics resilience use cases.
7. Primary repository: https://github.com/omtripathi52/NexusRoute

## Development Environment

8. Backend runs on FastAPI/Python, frontend runs on Vite/React.
9. Keep deployment assumptions compatible with Vercel (frontend) and Render (backend).

## Project Notes (Optional)

10. Keep docs concise and demo-focused for hackathon judging.
11. Prefer practical fixes that improve reliability for `/pay`, `/demo`, `/usershome`, and `/admin`.
12. Do not introduce breaking refactors close to demo unless explicitly requested.

## “渐进式披露”（Progressive Disclosure）
You have access to specialized knowledge modules. Do NOT rely on internal training for these topics; strictly READ the corresponding skill file first if the task involves:
- ROS 2 Navigation: read `.agent/skills/ros_navigation.md`
- Academic Writing: read `.agent/skills/paper_writing.md`

[Strategy]
Check user request -> Identify required skill -> Read skill file -> Execute task.

## This project is a 2026 hackathon submission; prioritize stability, clarity, and demo readiness.

## Reference Docs

- Project structure: `.agent/project-structure.md`
- Tech stack: `.agent/tech-stack.md`
- API policy: `.agent/rules/API.md`
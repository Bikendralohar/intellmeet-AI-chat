# IntellMeet

IntellMeet is an AI-powered meeting and collaboration workspace built for the
Zidio Development MERN project brief. It turns a live conversation into a
searchable summary, decisions, action items, and team analytics.

## Demo highlights

- Zero-setup demo login with no paid API key
- Responsive product landing page and workspace dashboard
- Meeting schedule and preparation brief
- Interactive meeting room with camera, microphone, sharing, chat, and notes
- Live simulated AI decision and action-item detection
- Post-meeting executive summary and automatic task creation
- Kanban action board with interactive status progression
- Workspace analytics and AI recommendations
- Protected Express API with JWT, validation, rate limiting, and security headers
- Socket.io rooms for participant presence and meeting chat

## Technology

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8, Lucide |
| Backend | Node.js, Express 5, TypeScript |
| Real-time | Socket.io |
| Security | JWT, bcrypt, Helmet, CORS, rate limiting, Zod |
| Quality | Vitest, Testing Library, Supertest, TypeScript |
| Delivery | Docker, Nginx, GitHub Actions |

The demo uses an in-memory data store so evaluators can run it immediately.
The API boundaries are ready to replace with MongoDB/Mongoose persistence.
AI output is generated deterministically from a transcript in demo mode; a
production provider can be connected at `server/src/summary.ts`.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API runs on
[http://localhost:4000](http://localhost:4000).

Use **Explore the workspace** on the landing page. No account or API key is
required.

## Verify

```bash
npm run lint
npm test
npm run build
npm audit
```

## Docker

```bash
docker compose up --build
```

Open [http://localhost:8080](http://localhost:8080).

## API overview

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Service health |
| `POST` | `/api/auth/demo` | Create a demo JWT session |
| `POST` | `/api/auth/signup` | Register an account |
| `POST` | `/api/auth/login` | Authenticate an account |
| `GET` | `/api/dashboard` | Meetings, actions, and metrics |
| `POST` | `/api/meetings` | Schedule a meeting |
| `POST` | `/api/meetings/:id/intelligence` | Summarize a transcript |
| `PATCH` | `/api/tasks/:id` | Update task status |

Protected routes require:

```text
Authorization: Bearer <token>
```

## Architecture

```text
React/Vite client
       |
       | HTTPS / JSON / Socket.io
       v
Express API + real-time gateway
       |
       +-- Authentication and validation
       +-- Meeting intelligence service
       +-- Meeting and task repositories
       |
       +-- MongoDB / Redis / AI provider (production extension points)
```

## Production roadmap

1. Replace the in-memory repositories with MongoDB and Mongoose.
2. Add refresh-token rotation using secure HTTP-only cookies.
3. Connect WebRTC through an SFU such as LiveKit or mediasoup for group calls.
4. Use a queued transcription pipeline and an approved AI provider.
5. Store recordings in S3 or Cloudinary with signed access.
6. Add Redis-backed Socket.io scaling, OpenTelemetry, and Sentry.
7. Deploy container images with autoscaling and managed secrets.

## Security notes

- Passwords are hashed with bcrypt.
- JWTs expire after two hours.
- Auth endpoints are rate-limited.
- Request bodies are size-limited and validated with Zod.
- Helmet adds secure HTTP headers.
- CORS is restricted to the configured client origin.
- Secrets are excluded from version control.
- `npm audit` is expected to report zero known vulnerabilities.

## Project structure

```text
client/             React application
server/             Express API and Socket.io server
scripts/dev.mjs     Cross-platform development launcher
.github/workflows/  Continuous integration
docker-compose.yml  Local production-style deployment
```

## Submission checklist

- Add your name, project reflection, and genuine implementation decisions.
- Capture 5-10 screenshots from the live application.
- Record a 3-7 minute walkthrough showing the end-to-end flow.
- Deploy the client and API to public HTTPS URLs.
- Add the final live URL and repository URL to this README.
- Create the required 8-15 page PDF report from your actual implementation.

## Academic and submission integrity

The supplied brief warns that AI-generated submissions may be disqualified.
Review and personalize this implementation, understand every design decision,
and follow the organizer's current rules before submitting it as your work.

# Compliance Tracker

A compliance task management app — track filings, taxes, audits and regulatory tasks across multiple clients.

## Live Demo
🔗 https://compliance-tracker-one.vercel.app

## GitHub
🔗 https://github.com/Krishnakumarr-R/compliance-tracker

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | Neon (Serverless PostgreSQL) |
| ORM | Prisma 7 |
| UI Components | shadcn/ui + Tailwind CSS |
| Validation | Zod |
| Deployment | Vercel |

---

## Features

- **Client management** — view and select from a list of clients
- **Task list per client** — scoped tasks with full details
- **Add tasks** — title, description, category, priority, due date, status
- **Update task status** — Pending → In Progress → Completed via inline dropdown
- **Delete tasks** — with confirmation
- **Overdue highlighting** — red card + badge for any pending/in-progress task past due date
- **Filters** — by status and category
- **Search** — by task title or description
- **Summary stats** — total, completed, pending, overdue counts per client

---

## Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/Krishnakumarr-R/compliance-tracker.git
cd compliance-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a Neon database
- Go to [neon.tech](https://neon.tech) and create a free project
- Copy the connection string from the dashboard

### 4. Add environment variables
Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=require"
```

### 5. Run migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Seed the database
```bash
npx prisma db seed
```
This creates 3 clients (Acme Corp, Globex Inc, Initech Ltd) with 5 tasks each including past-due tasks for overdue testing.

### 7. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
compliance-tracker/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── clients/route.ts         # GET, POST clients
│   │   │   └── tasks/
│   │   │       ├── route.ts             # GET, POST tasks
│   │   │       └── [id]/
│   │   │           ├── route.ts         # DELETE task
│   │   │           └── status/route.ts  # PATCH task status
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                     # Main app page
│   ├── components/
│   │   ├── ui/                          # shadcn components
│   │   ├── AddTaskDialog.tsx
│   │   ├── ClientList.tsx
│   │   ├── StatsBar.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskFilters.tsx
│   ├── generated/prisma/client/         # Auto-generated Prisma client
│   └── lib/
│       ├── prisma.ts                    # Prisma singleton
│       ├── utils.ts                     # cn() utility
│       └── validations.ts              # Zod schemas
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts
└── README.md
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clients` | List all clients |
| POST | `/api/clients` | Create a client |
| GET | `/api/tasks?clientId=` | Get tasks for a client (supports `status`, `category`, `search` query params) |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Deployment (Vercel)
Add `DATABASE_URL` in Vercel → Project → Settings → Environment Variables.

The `build` script runs `prisma generate && next build` automatically so no manual steps needed on Vercel.

---

## Tradeoffs

**Prisma 7 over raw SQL**
Prisma adds type safety and a clean migration story at the cost of a heavier dependency and a build-time generation step. For a small app like this, raw SQL with `postgres.js` would be lighter — but Prisma scales better if the schema grows.

**Next.js API routes over a separate Express backend**
Keeping everything in one Next.js repo simplifies deployment to a single Vercel project. The tradeoff is that API routes are stateless and can't hold persistent connections well — mitigated here by Neon's serverless driver which is designed for this pattern.

**SQLite vs Neon PostgreSQL**
SQLite would have been zero-config locally but doesn't work on serverless deployments. Neon gives a real hosted Postgres with a free tier and a serverless-compatible driver, making it a better fit even though it adds an external dependency.

**No authentication**
Auth is out of scope for this assignment. In production, every API route would be protected and tasks would be scoped to the logged-in user's firm.

**Client-side filtering state**
Filters and search are managed in React state and sent as query params to the API on every change. This means a network call per keystroke (debounce would improve this). The alternative — fetching all tasks and filtering client-side — avoids extra requests but breaks down at scale.

---

## Assumptions

- A single user manages all clients (no multi-tenancy or auth required for this scope)
- Task categories are a fixed set: Tax, Regulatory, Audit, Payroll, Legal, Other
- "Overdue" means any task with status `Pending` or `In Progress` whose `dueDate` is in the past
- Completed tasks are never marked overdue regardless of due date
- One database per deployment — no environment-specific migration strategy needed at this scale
- Neon free tier connection limits are sufficient for a demo/review workload


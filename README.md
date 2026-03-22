# Compliance Tracker

A compliance task management app for LedgersCFO — track filings, taxes, audits across multiple clients.

## Live Demo
> [Add Vercel URL after deploy]

## Tech Stack
- **Next.js 14** (App Router) — frontend + API routes
- **Prisma ORM** — type-safe DB queries
- **Neon** — serverless PostgreSQL
- **shadcn/ui** + **Tailwind CSS** — UI components
- **Zod** — API request validation

## Features
- View and select clients
- View tasks per client with overdue highlighting
- Add new tasks with category, priority, due date
- Update task status (Pending → In Progress → Completed)
- Filter tasks by status and category
- Search tasks by title/description
- Summary stats (total, completed, pending, overdue)
- Delete tasks

## Local Setup
```bash
git clone <repo-url>
cd compliance-tracker
npm install

# Add your Neon DB URL
echo 'DATABASE_URL="your-neon-url"' > .env

npx prisma migrate dev
npx prisma db seed
npm run dev
```
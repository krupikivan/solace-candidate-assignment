## Solace Candidate Assignment

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Quick Start with Docker (Recommended)

The entire stack (Next.js + PostgreSQL) is fully containerized. Start everything with a single command:

```bash
make start
```

This will:
- Build and start the Next.js app and PostgreSQL database
- Run database migrations
- Seed the database with sample advocates
- Show you the service URLs

**Access the application:**
- App: http://localhost:8085
- API: http://localhost:8085/api/advocates
- Nginx Health: http://localhost:8085/health

**Note:** Only port 8085 is exposed externally. The Next.js app (3000) and PostgreSQL (5432) communicate internally via Docker network.

### Available Make Commands

```bash
make start          # Start the entire stack
make stop           # Stop all containers
make restart        # Restart the stack
make logs           # View all logs
make logs-app       # View Next.js app logs
make logs-db        # View PostgreSQL logs
make ps             # Show container status
make shell-app      # Open shell in app container
make shell-db       # Open PostgreSQL shell
make migrate        # Run database migrations
make seed           # Seed the database
make clean          # Remove all containers and volumes (WARNING: deletes data!)
make help           # Show all available commands
```

## Local Development (Without Docker)

### Prerequisites
- Node.js 20+
- PostgreSQL

### Setup

1. Install dependencies

```bash
npm i
```

2. Start PostgreSQL (if using Docker for DB only)

```bash
docker compose up db -d
```

3. Run the development server:

```bash
npm run dev
```

## Database Setup (Manual)

The app is configured to return a default list of advocates. This will allow you to get the app up and running without needing to configure a database. If you'd like to configure a database, you're encouraged to do so. You can uncomment the url in `.env` and the line in `src/app/api/advocates/route.ts` to test retrieving advocates from the database.

1. Feel free to use whatever configuration of postgres you like. The project is set up to use docker-compose.yml to set up postgres. The url is in .env.

```bash
docker compose up -d
```

2. Create a `solaceassignment` database.

3. Push migration to the database

```bash
npx drizzle-kit push
```

4. Seed the database

```bash
curl -X POST http://localhost:3000/api/seed
```

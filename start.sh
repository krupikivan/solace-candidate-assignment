#!/bin/bash

set -e

echo "🔍 Checking for existing containers..."
if docker compose ps -q | grep -q .; then
    echo "🛑 Found running containers, stopping them..."
    docker compose down --remove-orphans
    echo "🧹 Cleanup completed"
fi

echo "🚀 Starting Solace application..."
docker compose up -d --build

echo "⏳ Waiting for services to be ready..."

# Function to wait for database to be ready
wait_for_db() {
    echo "🔍 Waiting for database to be ready..."
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if docker compose exec -T solace-db pg_isready -U postgres -d solaceassignment > /dev/null 2>&1; then
            echo "✅ Database is ready!"
            return 0
        fi

        echo "⏳ Database not ready yet (attempt $attempt/$max_attempts)..."
        sleep 2
        ((attempt++))
    done

    echo "❌ Database failed to become ready after $max_attempts attempts"
    return 1
}

# Function to wait for app to be ready
wait_for_app() {
    echo "🔍 Waiting for Next.js app to be ready..."
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        # Check from host machine via Nginx
        if curl -f http://localhost:8085/api/advocates > /dev/null 2>&1; then
            echo "✅ Next.js app is ready!"
            return 0
        fi

        echo "⏳ App not ready yet (attempt $attempt/$max_attempts)..."
        sleep 3
        ((attempt++))
    done

    echo "⚠️  App health check failed, but continuing..."
    return 0
}

# Wait for database
if wait_for_db; then
    echo "📊 Running database migrations..."

    # Run migrations
    if docker compose exec -T solace-app npx drizzle-kit push --force > /dev/null 2>&1; then
        echo "✅ Database migrations completed!"
    else
        echo "⚠️  Migration encountered issues, continuing anyway..."
    fi

    # Wait for app to be ready
    wait_for_app

    echo "🌱 Seeding database..."
    # Seed database via API through Nginx
    if curl -X POST http://localhost:8085/api/seed > /dev/null 2>&1; then
        echo "✅ Database seeded successfully!"
    else
        echo "⚠️  Seeding encountered issues"
    fi
else
    echo "❌ Could not connect to database"
    exit 1
fi

echo ""
echo "✅ Project started successfully!"
echo ""
echo "📋 Container status:"
docker compose ps

echo ""
echo "🌐 Service URLs:"
echo "  App:      http://localhost:8085"
echo "  API:      http://localhost:8085/api/advocates"
echo "  Health:   http://localhost:8085/health"
echo ""
echo "📡 Internal Services (Docker network only):"
echo "  Next.js:  app:3000"
echo "  Database: db:5432"

echo ""
echo "💡 Useful commands:"
echo "  make logs           - View all logs"
echo "  make logs-app       - View app logs"
echo "  make logs-db        - View database logs"
echo "  make ps             - Show container status"
echo "  make stop           - Stop the project"
echo "  make restart        - Restart the project"
echo "  make shell-app      - Open shell in app container"
echo "  make shell-db       - Open PostgreSQL shell"
echo "  make migrate        - Run migrations"
echo "  make seed           - Seed database"
echo "  make clean          - Remove all containers and volumes"

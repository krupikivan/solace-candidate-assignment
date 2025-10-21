.PHONY: start stop restart logs logs-app logs-db logs-nginx ps clean shell-app shell-db shell-nginx migrate seed help

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help: ## Show this help message
	@echo "$(BLUE)Solace Candidate Assignment - Docker Commands$(NC)"
	@echo ""
	@echo "$(GREEN)Available commands:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

start: ## Start the entire stack (Next.js + PostgreSQL)
	@echo "$(BLUE)🚀 Starting Solace application...$(NC)"
	@chmod +x start.sh
	@./start.sh

stop: ## Stop all containers
	@echo "$(BLUE)🛑 Stopping Solace application...$(NC)"
	@docker compose down
	@echo "$(GREEN)✅ Application stopped$(NC)"

restart: stop start ## Restart the entire stack

logs: ## Show logs from all services
	@docker compose logs -f

logs-app: ## Show logs from Next.js app only
	@docker compose logs -f solace-app

logs-db: ## Show logs from PostgreSQL only
	@docker compose logs -f solace-db

logs-nginx: ## Show logs from Nginx only
	@docker compose logs -f solace-nginx

ps: ## Show status of all containers
	@docker compose ps

clean: ## Stop containers and remove volumes (WARNING: deletes database!)
	@echo "$(RED)⚠️  This will delete all data. Are you sure? [y/N]$(NC)" && read ans && [ $${ans:-N} = y ]
	@docker compose down -v
	@echo "$(GREEN)✅ Cleanup complete$(NC)"

shell-app: ## Open shell in the Next.js app container
	@docker compose exec solace-app sh

shell-db: ## Open PostgreSQL shell
	@docker compose exec solace-db psql -U postgres -d solaceassignment

shell-nginx: ## Open shell in the Nginx container
	@docker compose exec solace-nginx sh

migrate: ## Run database migrations
	@echo "$(BLUE)📊 Running database migrations...$(NC)"
	@docker compose exec solace-app npx drizzle-kit push
	@echo "$(GREEN)✅ Migrations complete$(NC)"

seed: ## Seed the database with sample data
	@echo "$(BLUE)🌱 Seeding database...$(NC)"
	@curl -X POST http://localhost:8085/api/seed
	@echo ""
	@echo "$(GREEN)✅ Database seeded$(NC)"

build: ## Rebuild Docker images
	@echo "$(BLUE)🔨 Building Docker images...$(NC)"
	@docker compose build --no-cache
	@echo "$(GREEN)✅ Build complete$(NC)"

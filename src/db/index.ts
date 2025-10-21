import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Declare global type for TypeScript
declare global {
  // eslint-disable-next-line no-var
  var _dbQueryClient: postgres.Sql | undefined;
}

const setup = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  // Reuse connection in development to prevent "too many clients" error
  if (process.env.NODE_ENV === "development" && global._dbQueryClient) {
    return drizzle(global._dbQueryClient, { schema });
  }

  // Configure postgres with connection pool settings
  const queryClient = postgres(process.env.DATABASE_URL, {
    max: 10, // Maximum number of connections in the pool
    idle_timeout: 20, // Close idle connections after 20 seconds
    connect_timeout: 10, // Timeout after 10 seconds if can't connect
  });

  // Store in global for development hot reloading
  if (process.env.NODE_ENV === "development") {
    global._dbQueryClient = queryClient;
  }

  const db = drizzle(queryClient, { schema });
  return db;
};

const db = setup();

export default db;

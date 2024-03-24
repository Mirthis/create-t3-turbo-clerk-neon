// Neon DB
import { neon, neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";

// Standard Postgres (i.e.: local development)
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import * as post from "./schema/post";

export const schema = { ...post };

const connectionString = process.env.DATABASE_URL;
neonConfig.fetchConnectionCache = true;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

let db = null;

if (process.env.USE_LOCAL_DB) {
  console.log("====== Using local DB ======");
  // Set the WebSocket proxy to work with the local instance
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  // Disable all authentication and encryption
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;

  const pool = new Pool({
    connectionString,
  });

  db = drizzleServerless(pool, { schema });
} else {
  db = drizzleHttp(neon(connectionString), { schema });
}

export { db };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

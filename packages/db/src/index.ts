// Neon DB
import { neonConfig, Pool } from "@neondatabase/serverless";
// import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";

import * as post from "./schema/post";

export const schema = { ...post };

const connectionString = process.env.DATABASE_URL;
neonConfig.fetchConnectionCache = true;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

if (process.env.USE_LOCAL_DB) {
  console.log("====== Using local DB ======");
  // Set the WebSocket proxy to work with the local instance
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;
  // Disable all authentication and encryption
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

export const db = drizzleServerless(new Pool({ connectionString }), { schema });

// export const db = process.env.USE_LOCAL_DB
//   ? drizzleServerless(
//       new Pool({
//         connectionString,
//       }),
//       { schema },
//     )
//   : drizzleHttp(neon(connectionString), { schema });

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

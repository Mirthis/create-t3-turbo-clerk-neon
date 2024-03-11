// Neon DB
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Standard Postgres (i.e.: local development)
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

import * as post from "./schema/post";

export const schema = { ...post };

// Neon DB
export const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

// Standard Postgres (i.e.: local development)
// export const db = drizzle(postgres(process.env.DATABASE_URL!), { schema });

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

import type { Config } from "drizzle-kit";

const uri = process.env.DATABASE_URL

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString: uri ?? ""  },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;

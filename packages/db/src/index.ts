import postgres from "postgres";

import * as post from "./schema/post";
import { drizzle } from "drizzle-orm/postgres-js";


const queryClient = postgres(process.env.DATABASE_URL!);

export const schema = {  ...post };

export const db = drizzle(queryClient, { schema });


export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";


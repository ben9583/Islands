import { Pool } from "pg"

const db = new Pool({
  connectionTimeoutMillis: 5000,
})

export default db
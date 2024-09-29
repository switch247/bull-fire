import { createPool, Pool, ResultSetHeader } from "mysql2/promise";

type PoolName = "primary" | "replica";

interface DBEnv {
  host: string;
  port?: number;
  user: string;
  password?: string;
  database?: string;
  connectionLimit?: number;
  waitForConnections?: boolean;
  queueLimit?: number;
}

const envToConfig = (prefix: string): DBEnv => ({
  host: process.env[`${prefix}_HOST`] ?? "127.0.0.1",
  port: process.env[`${prefix}_PORT`]
    ? Number(process.env[`${prefix}_PORT`])
    : 3306,
  user: process.env[`${prefix}_USER`] ?? "root",
  password: process.env[`${prefix}_PASSWORD`] ?? "",
  database: process.env[`${prefix}_DATABASE`] ?? "test",
  connectionLimit: process.env[`${prefix}_POOL_SIZE`]
    ? Number(process.env[`${prefix}_POOL_SIZE`])
    : 10,
  waitForConnections: true,
  queueLimit: 0,
});

// Read configuration for two DB instances (DB1_* and DB2_*)
// e.g. DB1_HOST, DB1_USER, DB1_PASSWORD, DB1_DATABASE, DB1_PORT, DB1_POOL_SIZE
const db1 = envToConfig("DB1");
const db2 = envToConfig("DB2");

const createDbPool = (cfg: DBEnv): Pool =>
  createPool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    connectionLimit: cfg.connectionLimit,
    waitForConnections: cfg.waitForConnections,
    queueLimit: cfg.queueLimit,
    // Optional: add timezone/charset if needed
    // timezone: 'Z',
    // charset: 'utf8mb4_general_ci',
  });

export const pools: Record<PoolName, Pool> = {
  primary: createDbPool(db1),
  replica: createDbPool(db2),
};

export const getPool = (name: PoolName): Pool => pools[name];

// Simple typed query helper: returns rows only
export async function query<T extends ResultSetHeader = any>(
  poolName: PoolName,
  sql: string,
  params?: any[]
): Promise<T[]> {
  const pool = getPool(poolName);
  const [rows] = await pool.query<T[]>(sql, params);
  return rows;
}

// Ping both pools to verify connectivity
export async function testPools(): Promise<void> {
  for (const name of Object.keys(pools) as PoolName[]) {
    try {
      await pools[name].execute("SELECT 1");
      // eslint-disable-next-line no-console
      console.info(`DB pool "${name}" connected`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        `DB pool "${name}" connection failed:`,
        (err as Error).message
      );
      throw err;
    }
  }
}

// Close all pools (useful for graceful shutdown / tests)
export async function closePools(): Promise<void> {
  await Promise.all(Object.values(pools).map((p) => p.end()));
}

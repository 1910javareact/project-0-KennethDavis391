import { Pool } from 'pg';

export const connectionPool: Pool = new Pool({
    user: process.env['PROJECT_0_USERNAME'],
    host: process.env['PROJECT_0_HOST'],
    database: process.env['PROJECT_0_DATABASE'],
    password: process.env['PROJECT_0_PASSWORD'],
    port: 5432,
    max: 5,
});
import { config } from 'dotenv';
config({ path: `.env.${process.env.VITE_VERCEL_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { VITE_VERCEL_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;

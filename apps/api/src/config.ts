import type { CorsOptions } from 'cors';
import { config } from 'dotenv';
import { resolve } from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = NODE_ENV === 'development' ? '.env.development' : '.env';

config({ path: resolve(__dirname, `../${envFile}`) });
config({ path: resolve(__dirname, `../${envFile}.local`), override: true });

// Load all environment variables from .env file

export const PORT = process.env.PORT || 8000;
export const DATABASE_URL = process.env.DATABASE_URL || '';

export const ACC_SECRET_KEY = process.env.ACC_SECRET_KEY || '';
export const REFR_SECRET_KEY = process.env.REFR_SECRET_KEY || '';
export const FP_SECRET_KEY = process.env.FP_SECRET_KEY || '';
export const VERIF_SECRET_KEY = process.env.VERIF_SECRET_KEY || '';

export const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY || '';

export const corsOptions: CorsOptions = {
  origin: [`${process.env.CORS}`],
  credentials: true,
};

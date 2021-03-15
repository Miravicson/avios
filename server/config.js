import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

type configType = {
  sql?: {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    dialect: 'string',
    pool: {
      max: number,
      min: number,
      acquire: number,
      idle: number,
    },
  },
  cloudinary: {
    url: string,
    productImagePath: string,
  },
  clearDB?: string,
};

const env = (
  envName: string,
  defaultValue: string,
  validate: boolean = true
): string => {
  const envValue = process.env[envName] || defaultValue;
  if (envValue == null && validate) {
    throw new Error(`required environment variable [${envName}] is undefined.`);
  }
  return envValue || '';
};

export const createConfig = (validateAllEnv: boolean = true): configType => {
  const config: configType = {};
  config.applicationName = env('APPLICATION_NAME', null, validateAllEnv);
  if (process.env.NODE_ENV === 'development') {
    config.sql = {
      host: env('SQL_HOST', null, validateAllEnv),
      user: env('SQL_USER', null, validateAllEnv),
      password: env('SQL_PASSWORD', null, validateAllEnv),
      db: env('SQL_DB', null, validateAllEnv),
      dialect: env('SQL_DIALECT', 'mysql', validateAllEnv),
      pool: {
        max: env('SQL_POOL_MAX', 5, validateAllEnv),
        min: env('SQL_POOL_MIN', 0, validateAllEnv),
        acquire: env('SQL_POOL_ACQUIRE', 30000, validateAllEnv),
        idle: env('SQL_POOL_IDLE', 10000, validateAllEnv),
      },
    };
  }

  config.cloudinary = {
    url: env('CLOUDINARY_URL', null, validateAllEnv),
    productImagePath: env('PRODUCTS_IMAGE_BUCKET', null, validateAllEnv),
  };
  if (process.env.CLEARDB_DATABASE_URL) {
    config.clearDB = env('CLEARDB_DATABASE_URL', null, validateAllEnv);
  }
  return config;
};

const config: configType = createConfig();
global.appConfig = config;
export default config;

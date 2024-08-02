import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDES,
  node_env: process.env.NODE_ENV,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token : process.env.JWT_REFRESH_TOKEN
};

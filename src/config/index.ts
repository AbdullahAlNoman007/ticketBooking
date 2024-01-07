import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  salt_round: process.env.SALTROUND,
  token_secret: process.env.TOKEN_SECRET,
  site_link: process.env.SITE_LINK,
};

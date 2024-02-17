import { cleanEnv, port, str } from 'envalid';

require('dotenv').config();

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

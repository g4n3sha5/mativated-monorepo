import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

// require('dotenv').config();

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

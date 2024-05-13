import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

// require('dotenv').config();

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

export const ValidateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

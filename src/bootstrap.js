/* eslint-disable prettier/prettier */
/* eslint-disable no-constant-condition */
const dotenv = require('dotenv')

dotenv.config({
  path: process.env.NODE_ENV = 'test' ? '.env' : '.env',
});


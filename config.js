import { config } from "dotenv";

config();

const DB_DEV_NAME = process.env.DB_DEV_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_TEST_NAME = process.env.DB_TEST_NAME;
const NODE_ENV = process.env.NODE_ENV;

export { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_TEST_NAME, NODE_ENV };
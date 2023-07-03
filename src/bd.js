import { createPool } from "mysql2/promise";
import { BD_DATABASE, BD_HOST, BD_PASSWORD, BD_PORT, BD_USER } from "./config.js";

export const pool = createPool({
  host : BD_HOST,
  user : BD_USER,
  password : BD_PASSWORD,
  port : BD_PORT,
  database : BD_DATABASE
})
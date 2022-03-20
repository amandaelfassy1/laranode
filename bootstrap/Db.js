const { Client } = require("pg");
const dotenv = require("dotenv").config();
const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;
module.exports = class Db {
  constructor() {
    this.client = new Client({
      user: DB_USER,
      host: DB_HOST,
      database: DB_NAME,
      password: DB_PASSWORD,
      port: DB_PORT,
    });
    this.client.connect();
    console.log("db connecté");
  }
};
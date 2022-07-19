const { Pool } = require("pg");

const pool = new Pool({
    //syntax = postgres://${PSQLusername}:${password(blank if none)}@localhost:5432/${nameOfDataBase}
    // ex. postgres://neo:@localhost:5432/findluv
    //add connection string data to the .env file

    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})


module.exports = pool
















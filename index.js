const pg = require("pg");
const dbConn = new pg.Pool({
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "secret",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "final_project_1",
    port: process.env.PORT || "5432"
});

const expressApp = require("./bin/express")({dbConn});
expressApp.listen(process.env.PORT || 3000);
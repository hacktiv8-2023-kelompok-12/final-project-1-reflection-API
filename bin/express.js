module.exports = function ({dbConn}) {
    const express = require("express");
    const app = express();
    app.use(express.json());

    const userRepo = new (require("../src/repo/user"))(dbConn);
    const userService = new (require("../src/service/auth"))(userRepo);
    const userHandler = new (require("../src/handler/express/handler"))(userService);
    const userExpress = require("../src/handler/express/route")(userHandler);
    app.use("/users", userExpress);

    return app;
}

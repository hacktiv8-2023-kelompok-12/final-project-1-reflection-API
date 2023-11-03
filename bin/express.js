module.exports = function ({dbConn}) {
    const express = require("express");
    const app = express();
    app.use(express.json());

    const router = express.Router();
    const userRepo = new (require("../src/repo/user"))(dbConn);
    const reflectionRepo = new (require("../src/repo/reflection"))(dbConn);
    const userService = new (require("../src/service/auth"))(userRepo);
    const authMid = require("../src/middleware/auth");
    const reflectionService = new (require("../src/service/reflection"))(reflectionRepo);
    const userHandler = new (require("../src/handler/user/handler"))(userService);
    const reflectionHandler = new (require("../src/handler/reflection/handler"))(reflectionService);
    const userExpress = require("../src/handler/user/router")(userHandler);
    const reflectionExpress = require("../src/handler/reflection/router")(reflectionHandler, {isAuth: authMid.auth(userRepo)});

    router.use("/users", userExpress);
    router.use("/reflections", reflectionExpress);

    app.use("/api/v1", router);

    return app;
}

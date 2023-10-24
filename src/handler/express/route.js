module.exports = function (handler) {
    const router = require("express").Router();
    router.post("/register", handler.Register);
    router.post("/login", handler.Login);
    return router;
}
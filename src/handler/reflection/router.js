module.exports = function (reflectionHandler, authMid) {
    const router = require("express").Router();
    router.use(authMid.isAuth);
    router.post("/", reflectionHandler.Create);
    router.get("/", reflectionHandler.GetMy);
    router.put("/:id", reflectionHandler.Edit);
    router.delete("/:id", reflectionHandler.Delete);
    return router;
}
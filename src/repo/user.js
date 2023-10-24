const UserM = require("../domain/user");

class User {
    #db;

    constructor(db) {
        this.#db = db;
    }

    async GetUserByEmail(email) {
        return null;
    }

    CreateUser(user) {
        return null;
    }
}

module.exports = User;
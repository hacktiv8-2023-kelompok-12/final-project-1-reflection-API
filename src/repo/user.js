const UserM = require("../domain/user");

class User {
    #db;

    constructor(db) {
        this.#db = db;
    }

    GetUserByEmail(email) {
        return this.#db.query("SELECT * FROM users WHERE email=$1", [email])
            .then(res => {
                if(res.rows.length === 0){
                    return null;
                }
                return new UserM(res.rows[0]);
            });
    }

    CreateUser(user) {
        return this.#db.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, [user.email, user.password])
            .then(res => {
                if(res.rows.length === 0){
                    return null;
                }
                return new UserM(res.rows[0]);
            });
    }
}

module.exports = User;
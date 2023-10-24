const {idle_in_transaction_session_timeout} = require("pg/lib/defaults");

class User {
    id;
    email;
    password;
    constructor({id, email, password}) {
        this.id = id;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;
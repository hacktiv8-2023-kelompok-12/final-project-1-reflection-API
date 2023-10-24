const bcrypt = require("bcryptjs");

module.exports = {
    Hash: function (plain) {
        return bcrypt.hash(plain, 10);
    },
    Compare: function (hash, real) {
        return bcrypt.compare(real, hash);
    }
}
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


module.exports = {
    Hash: function (plain) {
        return bcrypt.hash(plain, 10);
    },
    Compare: function (hash, real) {
        return bcrypt.compare(real, hash);
    },
    GenerateToken: function (payload, secretKey, options) {
        return jwt.sign(payload, secretKey, options);
    },
    VerifyToken: function (token, secretKey, options) {
        return jwt.verify(token, secretKey, options);
    }
}
// kalo Mau ditambah
// const options = {
//     expiresIn: '1h', // Contoh waktu kedaluwarsa 1 jam
//     algorithm: 'HS256' // Contoh algoritma enkripsi
//   };

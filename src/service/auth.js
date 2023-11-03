const {Hash, Compare} = require("../lib/crypto");
const UserM = require("../domain/user");
const {ErrNotFound, ErrWrongValue, ErrIsExists} = require("../domain/errors");

class Auth {
    #userRepo;

    constructor(userRepo) {
        this.#userRepo = userRepo;
    }

    async Register(email, password) {
        await this.#userRepo.GetUserByEmail(email)
            .then(user => {
                if(user) {
                    throw new ErrIsExists("email");
                }
            });
        password = await Hash(password);
        return this.#userRepo.CreateUser(new UserM({email, password}));
    }

    Login(email, password) {
        return this.#userRepo.GetUserByEmail(email)
            .then(async (user) => {
                if (!user) {
                    throw new ErrNotFound("email");
                }
                if (!await Compare(user.password, password)) {
                    throw new ErrWrongValue("password");
                }
                return user;
            });
    }
}

module.exports = Auth;
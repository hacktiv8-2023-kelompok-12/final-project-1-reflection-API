const {ErrIsExists, ErrNotFound, ErrWrongValue} = require("../../domain/errors");
const {GenerateToken} = require("../../lib/hash");

class Handler {
    #service;

    constructor(authService) {
        this.#service = authService;
    }

    Register = async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await this.#service.Register(email, password);
            res.status(201).json({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            if (err instanceof ErrIsExists) {
                return res.status(400).json({
                    message: err.message
                })
            }
            return res.sendStatus(500);
        }
    }

    Login = async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await this.#service.Login(email, password);
            return res.json({access_token: GenerateToken({id: user.id})});
        } catch (err) {
            if (err instanceof ErrNotFound || err instanceof ErrWrongValue) {
                return res.status(401).json({
                    message: "Email or password invalid!"
                });
            }
            return res.sendStatus(500);
        }
    }
}

module.exports = Handler;
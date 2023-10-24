const {ErrIsExists, ErrNotFound, ErrWrongValue} = require("../../domain/errors");

class Handler {
    #service;

    constructor(authService) {
        this.#service = authService;
    }

    Register = async (req, res) => {
        const {email, password} = req.body;
        try {
            const user = await this.#service.Register(email, password);
            console.log("passed");
            res.status(201).json({
                id: user.id,
                email: user.email
            });
        } catch (err) {
            console.log(err);
            if(err instanceof ErrIsExists) {
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
            res.json(user);
        }catch (err) {
            if (err instanceof ErrNotFound || err instanceof ErrWrongValue) {
                res.status(401).json({
                    message: "Email or password invalid!"
                });
            }
            return res.sendStatus(500);
        }
    }
}

module.exports = Handler;
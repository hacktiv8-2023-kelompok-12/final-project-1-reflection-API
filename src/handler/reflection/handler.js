class Handler {
    #service;

    constructor(reflectionService) {
        this.#service = reflectionService;
    }

    Create = async (req, res) => {
        try {
            const {success, low_point: lowPoint, take_away: takeAway} = req.body;
            const {id: UserId} = req.user;
            const reflection = await this.#service.Create(UserId, success, lowPoint, takeAway);
            return res.status(201).json({
                "id": reflection.id,
                "success": reflection.success,
                "low_point": reflection.lowPoint,
                "take_away": reflection.takeAway,
                "UserId": reflection.UserId,
                "createdAt": reflection.createdAt,
                "updatedAt": reflection.updatedAt,
            });
        } catch (err) {
            return res.sendStatus(500);
        }
    }

    GetMy = async (req, res) => {
        try {
            const {id: UserId} = req.user;
            const reflections = await this.#service.Get(UserId);
            if (!reflections) {
                return res.status(404).json([]);
            }
            return res.json(reflections.map(
                reflection => ({
                    "id": reflection.id,
                    "success": reflection.success,
                    "low_point": reflection.lowPoint,
                    "take_away": reflection.takeAway,
                    "UserId": reflection.UserId,
                    "createdAt": reflection.createdAt,
                    "updatedAt": reflection.updatedAt,
                })
            ));
        } catch (err) {
            return res.sendStatus(500);
        }
    }

    Edit = async (req, res) => {
        try {
            const {id} = req.params;
            const {success, low_point, take_away} = req.body;
            const {id: UserId} = req.user;
            await this.#service.Get(UserId)
                .then(reflections => {
                    if (!reflections) {
                        throw {code: 404};
                    }
                });
            const reflection = await this.#service.Update(id, UserId, success, low_point, take_away);
            return res.json({
                "id": reflection.id,
                "success": reflection.success,
                "low_point": reflection.lowPoint,
                "take_away": reflection.takeAway,
                "UserId": reflection.UserId,
                "createdAt": reflection.createdAt,
                "updatedAt": reflection.updatedAt,
            });
        } catch (err) {
            return res.sendStatus(err.code || 500);
        }
    }

    Delete = async (req, res) => {
        try {
            const {id} = req.params;
            const {id: UserId} = req.user;
            await this.#service.Get(UserId)
                .then(reflections => {
                    if (!reflections) {
                        throw {code: 404};
                    }
                });
            await this.#service.Delete(id, UserId);
            return res.json({
                "message": "Success delete"
            });
        } catch (err) {
            return res.sendStatus(err.code || 500);
        }
    }
}

module.exports = Handler;
const ReflectionM = require("../domain/reflection");

class Reflection {
    #db;

    constructor(db) {
        this.#db = db;
    }

    CreateReflection(reflection) {
        const now = new Date();
        return this.#db.query(
            `INSERT INTO reflections (success, low_point, take_away, UserId, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [reflection.success, reflection.lowPoint, reflection.takeAway, reflection.UserId, now, now]
        ).then(
            res => {
                if (res.rows.length === 0) {
                    return null;
                }
                return new ReflectionM({
                    ...res.rows[0],
                    lowPoint: res.rows[0].low_point,
                    takeAway: res.rows[0].take_away,
                    UserId: res.rows[0].userid,
                    createdAt: res.rows[0].createdat,
                    updatedAt: res.rows[0].updatedat
                });
            }
        );
    }

    GetUserReflections(userId) {
        return this.#db.query("SELECT * FROM reflections WHERE UserId=$1", [userId])
            .then(res => {
                if (res.rows.length === 0) {
                    return null;
                }
                return res.rows.map(row=>new ReflectionM({
                    ...row,
                    lowPoint: row.low_point,
                    takeAway: row.take_away,
                    UserId: row.userid,
                    createdAt: row.createdat,
                    updatedAt: row.updatedat
                }));
            });
    }

    UpdateReflection(reflection) {
        return this.#db.query(
            `UPDATE reflections SET success=$1, low_point=$2, take_away=$3, UserId=$4, updatedAt=$5 WHERE id=$6 RETURNING *`,
            [reflection.success, reflection.lowPoint, reflection.takeAway, reflection.UserId, new Date(), reflection.id]
        ).then(
            res => {
                if (res.rows.length === 0) {
                    return null;
                }
                return new ReflectionM({
                    ...res.rows[0],
                    lowPoint: res.rows[0].low_point,
                    takeAway: res.rows[0].take_away,
                    UserId: res.rows[0].userid,
                    createdAt: res.rows[0].createdat,
                    updatedAt: res.rows[0].updatedat
                });
            }
        );
    }

    DeleteReflection(reflectionId) {
        return this.#db.query(
            `DELETE FROM reflections WHERE id=$1`,
            [reflectionId]
        );
    }
}

module.exports = Reflection;
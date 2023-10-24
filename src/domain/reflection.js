class Reflection {
    id;
    success;
    lowPoint;
    takeAway;
    UserId;
    createdAt;
    updatedAt;
    user;
    constructor({id,success,lowPoint,takeAway,UserId,createdAt,updatedAt,user}) {
        this.id = id;
        this.success = success;
        this.lowPoint = lowPoint;
        this.takeAway = takeAway;
        this.UserId = UserId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }
}

module.exports = Reflection;
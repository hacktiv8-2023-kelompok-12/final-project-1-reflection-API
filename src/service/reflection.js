const ReflectionM = require("../domain/reflection");

class Reflection {
    #reflectionRepo;

    constructor(reflectionRepo) {
        this.#reflectionRepo = reflectionRepo;
    }

    Create(UserId, success, lowPoint, takeAway) {
        const reflection = new ReflectionM({success, lowPoint, takeAway, UserId});
        return this.#reflectionRepo.CreateReflection(reflection);
    }

    Get(UserId) {
        return this.#reflectionRepo.GetUserReflections(UserId);
    }

    Update(id, UserId, success, lowPoint, takeAway) {
        const reflection = new ReflectionM({id, success, lowPoint, takeAway, UserId});
        return this.#reflectionRepo.UpdateReflection(reflection);
    }

    Delete(id, UserId) {
        return this.#reflectionRepo.DeleteReflection(id, UserId);
    }
}

module.exports = Reflection;
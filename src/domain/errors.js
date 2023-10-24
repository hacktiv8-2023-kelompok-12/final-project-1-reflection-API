class ErrNotFound extends Error {
    constructor(what) {
        super(`${what} not found`);
    }
}

class ErrWrongValue extends Error {
    constructor(what) {
        super(`${what} is wrong`);
    }
}

class ErrIsExists extends Error {
    constructor(what) {
        super(`${what} is already exists`);
    }
}

module.exports = {
    ErrNotFound,
    ErrWrongValue,
    ErrIsExists
};
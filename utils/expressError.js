class expressError extends Error {
    constructor (statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

<<<<<<< HEAD
module.exports = expressError;
=======
module.exports = expressError;
>>>>>>> e4416e09de3dbb045dc6172a3e445ee091aaeff4

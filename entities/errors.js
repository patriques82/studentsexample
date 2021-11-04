class EmptyObjectError extends Error {
    constructor(message) {
        super(message)
    }
}

class InvalidEmailError extends Error {
    constructor(message) {
        super(message)
    }
}

class InvalidNameError extends Error {
    constructor(message) {
        super(message)
    }
}

class InvalidAgeError extends Error {
    constructor(message) {
        super(message)
    }
}

export { EmptyObjectError, InvalidEmailError, InvalidNameError, InvalidAgeError }
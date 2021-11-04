import { EmptyObjectError, InvalidEmailError, InvalidNameError, InvalidAgeError } from "../entities/errors.js"

const emptyObject = (obj) => {
    return obj && 
        Object.keys(obj).length === 0 && 
        Object.getPrototypeOf(obj) === Object.prototype
}

const validEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validName = (name) => {
    return name && name.length > 1;
}

const validAge = (age) => {
    return typeof age === 'number' && age > 0;
}

const validateStudent = (student) => {
    if (emptyObject(student)) {
        throw new EmptyObjectError(`Validation error: empty student`);
    }
    if (!validEmail(student.email)) {
        throw new InvalidEmailError(`Validation error: invalid email ${student.email}`);
    }
    if (!validName(student.name)) {
        throw new InvalidNameError(`Validation error: invalid name ${student.name}`);
    }
    if (!validAge(student.age)) {
        throw new InvalidAgeError(`Validation error: invalid age ${student.age}`);
    }
    return student
}

export { validateStudent }
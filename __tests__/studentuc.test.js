import { validateStudent } from "../usecases/studentuc.js"
import { EmptyObjectError, InvalidEmailError, InvalidNameError, InvalidAgeError } from "../entities/errors.js"

describe('studentuc', () => {
    it('should validate return valid student data', async () => {
        const validStudent = { email: "valid@email.com", name: "validstudentname", age: 100 }
        const student = validateStudent(validStudent)
        expect(student).toMatchObject(validStudent)
    })

    it('should throw empty student error', async () => {
        const invalidStudent = {}
        const emptyError = () => {
            validateStudent(invalidStudent)
        }
        expect(emptyError).toThrow(EmptyObjectError);
        expect(emptyError).toThrow("Validation error: empty student");
    })

    it('should throw email student error', async () => {
        const invalidStudent = { email: "invalid@c", name: "validstudentname", age: 100 }
        const emailError = () => {
            validateStudent(invalidStudent)
        }
        expect(emailError).toThrow(InvalidEmailError);
        expect(emailError).toThrow("Validation error: invalid email invalid@c");
    })

    it('should throw name student error', async () => {
        const invalidStudent = { email: "valid@email.com", name: "s", age: 100 }
        const nameError = () => {
            validateStudent(invalidStudent)
        }
        expect(nameError).toThrow(InvalidNameError);
        expect(nameError).toThrow("Validation error: invalid name s");
    })

    it('should throw age student error', async () => {
        const invalidStudent = { email: "valid@email.com", name: "validstudentname", age: 0 }
        const ageError = () => {
            validateStudent(invalidStudent)
        }
        expect(ageError).toThrow(InvalidAgeError);
        expect(ageError).toThrow("Validation error: invalid age 0");
    })
})
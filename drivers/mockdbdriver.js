import { validateStudent } from "../usecases/validatestudent.js"
import Student from "../entities/student"

const mockData = [
    { id: 0, email: "patrik@email.com", name: "Patrik", age: 38 },
    { id: 1, email: "petter@email.com", name: "Petter", age: 41 },
    { id: 2, email: "pontus@email.com", name: "Pontus", age: 12 },
    { id: 3, email: "per@email.com", name: "Per", age: 57 },
]

class MockCRUD {
    constructor(data) {
        this.data = data.map(({ id, email, name, age }) => {
            return new Student(id, email, name, age)
        });
        this.deleted = 0
    }

    async getAll() {
        return this.data
    };

    async getOne(id) {
        return this.data.find(student => student.id === parseInt(id))
    }

    async createOne(data) {
        try {
            const { email, name, age } = validateStudent(data);
            const id = this.data.length + this.deleted
            this.data.push(new Student(id, email, name, age))
        } catch (err) {
            throw err;
        }
    }

    async deleteOne(id) {
        this.data = this.data.filter(student => student.id !== parseInt(id))
        this.deleted += 1
    }
}

const createMockDb = (mockData) => {
    return new MockCRUD(mockData)
}

const mockdbDriver = () => {
    return createMockDb(mockData);
}

export { mockData, mockdbDriver, createMockDb };
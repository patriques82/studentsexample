import { validateStudent } from "../usecases/studentuc.js"

const mockData = [
    { email: "patrik@email.com", name: "Patrik", age: 38 },
    { email: "petter@email.com",name: "Petter", age: 41 },
    { email: "pontus@email.com",name: "Pontus", age: 12 },
    { email: "per@email.com",name: "Per", age: 57 },
]

class MockCRUD {
    constructor(data) {
        this.data = data.map((data, _id) => ({ _id, ...data}))
        this.deleted = 0
    }

    async getAll() {
        return this.data
    };

    async getOne(id) {
        return this.data.find(item => item._id === parseInt(id))
    }

    async createOne(data) {
        try {
            const validData = validateStudent(data);
            const _id = this.data.length + this.deleted
            this.data.push({ _id, ...validData })
        } catch(err) {
            throw err;
        }
    }

    async deleteOne(id) {
        this.data = this.data.filter(item => item._id !== parseInt(id))
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
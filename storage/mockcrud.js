import DbCRUD from "./dbcrud.js";

class MockCRUD extends DbCRUD {
    constructor(data) {
        super()
        this.data = data;
    }

    async getAll() {
        return this.data;
    };

    async getOne(id) {
        return this.data.find(item => item._id === id)
    }

    async createOne(data) {
        const _id = this.data.length + 1;
        this.data.push({ _id, ...data })
    }

    async deleteOne(id) {
        this.data = this.data.filter(item => item._id !== id)
    }
}

export { MockCRUD }
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
        const _id = this.data.length + this.deleted
        this.data.push({ _id, ...data })
    }

    async deleteOne(id) {
        this.data = this.data.filter(item => item._id !== parseInt(id))
        this.deleted += 1
    }
}

export { MockCRUD }
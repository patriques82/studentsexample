class MongoCRUD {
    constructor(db, collection) {
        this.db = db;
        this.collection = this.db.collection(collection)
    }

    async getAll() {
        try {
            return await this.collection.find({}).toArray()
        } catch(err) {
            throw new Error(`Error getAll`, err);
        }
    };

    async getOne(id) {
        try {
            return await this.collection.findOne({ "_id": ObjectId(id) })
        } catch(err) {
            throw new Error(`Error getOne with id: ${id}`, err);
        }
    }

    async createOne(data) {
        try {
            await this.collection.insertOne(data)
        } catch(err) {
            throw new Error(`Error createOne with data: ${data}`, err);
        }
    }

    async deleteOne(id) {
        try {
            await this.collection.deleteOne({ "_id": ObjectId(id) })
        } catch(err) {
            throw new Error(`Error deleteOne with id: ${id}`, err);
        }
    }
}

export { MongoCRUD }
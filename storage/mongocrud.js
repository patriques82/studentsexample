class MongoCRUD {
    constructor(db, collection) {
        super()
        this.db = db;
        this.collection = collection;
    }

    async getAll() {
        try {
            return await this.db.collection(this.collection).find({}).toArray()
        } catch(err) {
            throw new Error(`Error ${this.collection}.getAll`, err);
        }
    };

    async getOne(id) {
        try {
            return await db.collection(this.collection).findOne({ "_id": ObjectId(id) })
        } catch(err) {
            throw new Error(`Error ${this.collection}.getOne with id: ${id}`, err);
        }
    }

    async createOne(data) {
        try {
            await db.collection(this.collection).insertOne(data)
        } catch(err) {
            throw new Error(`Error ${this.collection}.createOne with data: ${data}`, err);
        }
    }

    async deleteOne(id) {
        try {
            await db.collection(this.collection).deleteOne({ "_id": ObjectId(id) })
        } catch(err) {
            throw new Error(`Error ${this.collection}.deleteOne with id: ${id}`, err);
        }
    }
}

export { MongoCRUD }
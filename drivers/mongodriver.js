import { MongoClient } from "mongodb"

class MongoCRUD {
    constructor(db, collection) {
        this.db = db;
        this.collection = this.db.collection(collection)
    }

    async getAll() {
        try {
            return await this.collection.find({}).toArray()
        } catch(err) {
            throw new Error(`Error ${this.collection}.getAll`, err);
        }
    };

    async getOne(id) {
        try {
            return await this.collection.findOne({ "_id": ObjectId(id) })
        } catch(err) {
            throw new Error(`Error ${this.collection}.getOne with id: ${id}`, err);
        }
    }

    async createOne(data) {
        try {
            console.log(data)
            await this.collection.insertOne(data)
        } catch(err) {
            throw new Error(`Error ${this.collection}.createOne with data: ${data}`, err);
        }
    }

    async deleteOne(id) {
        try {
            await this.collection.deleteOne({ "_id": ObjectId(id) })
        } catch(err) {
            throw new Error(`Error ${this.collection}.deleteOne with id: ${id}`, err);
        }
    }
}


const createMongoDb = async (conn, name) => {
    const client = await MongoClient.connect(conn)
    const db = client.db(name);
    console.log("Connected successfully with MongoDb", conn, name)
    return new MongoCRUD(db, "students");
}

const mongoDriver = async (conn, name) => {
    return await createMongoDb(conn, name);
}

export { mongoDriver };
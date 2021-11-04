import { MongoClient } from "mongodb"
import { validateStudent } from "../usecases/studentuc.js"
import { studentMongoAdapter, studentIdMongoAdapter } from "../adapters/studentadapter.js"

class MongoCRUD {
    constructor(db, collection) {
        this.db = db;
        this.collection = this.db.collection(collection)
    }

    async getAll() {
        try {
            return await this.collection.find({}).toArray()
        } catch(err) {
            throw new Error(`${this.collection}.getAll`, err);
        }
    };

    async getOne(id) {
        try {
            const mongoId = studentIdMongoAdapter(id);
            return await this.collection.findOne(mongoId)
        } catch(err) {
            throw new Error(`${this.collection}.getOne with id: ${id}`, err);
        }
    }

    async createOne(data) {
        try {
            const validData = validateStudent(data);
            const mongoData = studentMongoAdapter(validData)
            await this.collection.insertOne(mongoData)
        } catch(err) {
            throw new Error(`${this.collection}.createOne`, err);
        }
    }

    async deleteOne(id) {
        try {
            const mongoId = studentIdMongoAdapter(id);
            await this.collection.deleteOne(mongoId)
        } catch(err) {
            throw new Error(`${this.collection}.deleteOne with id: ${id}`, err);
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
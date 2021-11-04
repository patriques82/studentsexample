import { MongoClient } from "mongodb"
import { validateStudent } from "../usecases/studentuc.js"
import { studentIdMongoAdapter, mongoToStudentAdapter } from "../adapters/studentadapter.js"

class MongoCRUD {
    constructor(db, collection) {
        this.db = db;
        this.collection = this.db.collection(collection)
    }

    async getAll() {
        try {
            const mongoStudents = await this.collection.find({}).toArray()
            return mongoStudents.map(mongoToStudentAdapter)
        } catch(err) {
            throw new Error(`${this.collection}.getAll`, err);
        }
    };

    async getOne(id) {
        try {
            const mongoId = studentIdMongoAdapter(id);
            const mongoStudent = await this.collection.findOne(mongoId)
            return mongoToStudentAdapter(mongoStudent)
        } catch(err) {
            throw new Error(`${this.collection}.getOne with id: ${id}`, err);
        }
    }

    async createOne(data) {
        try {
            const validData = validateStudent(data);
            await this.collection.insertOne(validData)
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
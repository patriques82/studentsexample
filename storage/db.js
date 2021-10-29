import { MongoClient } from "mongodb"
import { MongoCRUD } from "./mongocrud.js";
import { MockCRUD } from "./mockcrud.js";

const mockData = [
    {name: "Patrik", age: 38},
    {name: "Petter", age: 41},
    {name: "Pontus", age: 12},
    {name: "Per", age: 57},
]

const createMongoDb = async (connectionUrl, dbName) => {
    const client = await MongoClient.connect(connectionUrl)
    const db = client.db(dbName);
    console.log("Connected successfully with MongoDb", connectionUrl, dbName)
    return new MongoCRUD(db, "students");
}

const createMockDb = (mockData) => {
    console.log("Connecting to mock database");
    return new MockCRUD(mockData)
}

const createDb = async (dbConf, dbType) => {
    switch(dbType) {
        case "mongo":
            try {
                return createMongoDb(dbConf.connectionUrl, dbConf.name)
            } catch (error) {
                console.error("MongoDB Connection error");
                throw error;
            }
        default:
            return createMockDb(mockData)
    }
}

export { createDb as default, createMongoDb, createMockDb }
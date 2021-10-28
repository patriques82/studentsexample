import { MongoClient } from "mongodb"
import { MongoCRUD, MockCRUD } from "./storage/index.js";

const mockData = [
    {_id: 1, name: "Patrik", age: 38},
    {_id: 2, name: "Petter", age: 41},
    {_id: 3, name: "Pontus", age: 12},
    {_id: 4, name: "Per", age: 57},
]

const createDb = async (dbConf, dbType) => {
    switch(dbType) {
        case "mongo":
            try {
                const client = await MongoClient.connect(dbConf.connectionUrl)
                const db = client.db(dbConf.name);
                console.log("Connected successfully to MongoDB");
                return new MongoCRUD(db, "students");
            } catch (error) {
                console.error("MongoDB Connection error");
                throw error;
            }
        default:
            return new MockCRUD(mockData)
    }
    
}

export default createDb
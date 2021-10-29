import { MongoClient } from "mongodb"
import { MongoCRUD } from "./mongocrud.js";
import { MockCRUD } from "./mockcrud.js";

const mockData = [
    {name: "Patrik", age: 38},
    {name: "Petter", age: 41},
    {name: "Pontus", age: 12},
    {name: "Per", age: 57},
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
            console.log("Connecting to mock database");
            return new MockCRUD(mockData)
    }
    
}

export default createDb
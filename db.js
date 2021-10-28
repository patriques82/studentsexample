import { MongoClient } from "mongodb"

const createDb = async (dbConf) => {
    try {
        const client = await MongoClient.connect(dbConf.connectionUrl)
        const db = client.db(dbConf.name);
        console.log("Connected successfully to db");
        return db;
    } catch (error) {
        console.error("DB Connection error", error);
        throw error;
    }
}

export default createDb
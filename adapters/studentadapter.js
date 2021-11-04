import { ObjectId } from "mongodb";

const studentMongoAdapter = (student) => {
    return student; // pretend to adapt to mongo format
}

const studentIdMongoAdapter = (id) => {
    return { "_id": ObjectId(id) };
}

export { studentMongoAdapter, studentIdMongoAdapter } 
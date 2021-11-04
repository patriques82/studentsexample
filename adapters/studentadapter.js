import { ObjectId } from "mongodb";
import Student from "../entities/student.js";

const studentIdMongoAdapter = (id) => {
    return { "_id": ObjectId(id) };
}

const mongoToStudentAdapter = ({ _id, email, name, age }) => {
    return new Student(_id, email, name, age)
}

export { studentToMongoAdapter, studentIdMongoAdapter, mongoToStudentAdapter } 
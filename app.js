import express from "express"
import { ObjectId } from "mongodb"


const createApp = async (db) => {
    const app = express()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/students', async (req, res) => {
        try {
            const students = await db.collection('students').find({}).toArray()
            res.send(students)
        } catch (err) {
            console.error("Error GET /students", err)
            res.statusCode = 501
            res.send("server error")
        }
    })

    // GET /students/id => retrieves one student with id
    app.get('/students/:id', async (req, res) => {
        const id = req.params.id
        try {
            const student = await db.collection('students').findOne({ "_id": ObjectId(id) })
            res.send(student)
        } catch (err) {
            console.error("Error GET /students/id", err)
            res.status(501).send("server error")
        }
    })

    // POST /students { name: "Petter", age: 17 } => saves the student in db
    app.post('/students', async (req, res) => {
        const { name, age } = req.body
        try {
            await db.collection('students').insertOne({ name, age })
            res.status(201).send("created")
        } catch (err) {
            console.error("Error POST /students", err)
            res.status(501).send("server error")
        }
    })

    // DELETE /students/id => deletes student with id
    app.delete('/students/:id', async (req, res) => {
        const id = req.params.id
        try {
            await db.collection('students').deleteOne({ "_id": ObjectId(id) })
            res.status(204).send("deleted")
        } catch (err) {
            console.error("Error POST /students", err)
            res.status(501).send("server error")
        }
    })

    return app;
}

export default createApp;
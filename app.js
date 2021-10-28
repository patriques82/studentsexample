import express from "express"

const createApp = async (db) => {
    const app = express()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/students', async (req, res) => {
        try {
            const students = await db.getAll()
            res.send(students)
        } catch (err) {
            console.error("Error GET /students", err)
            res.statusCode = 501
            res.send("server error")
        }
    })

    app.get('/students/:id', async (req, res) => {
        const id = req.params.id
        try {
            const student = await db.getOne(id)
            res.send(student)
        } catch (err) {
            console.error("Error GET /students/id", err)
            res.status(501).send("server error")
        }
    })

    app.post('/students', async (req, res) => {
        const { name, age } = req.body
        try {
            await db.createOne({ name, age })
            res.status(201).send("created")
        } catch (err) {
            console.error("Error POST /students", err)
            res.status(501).send("server error")
        }
    })

    app.delete('/students/:id', async (req, res) => {
        const id = req.params.id
        try {
            await db.deleteOne(id)
            res.status(204).send("deleted")
        } catch (err) {
            console.error("Error POST /students", err)
            res.status(501).send("server error")
        }
    })

    return app;
}

export default createApp;
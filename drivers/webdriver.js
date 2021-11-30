import express from "express";
import { EmptyObjectError, InvalidEmailError, InvalidNameError, InvalidAgeError } from "../entities/errors.js"

const SERVER_ERROR = "Server Error"

const expressDriver = (db) => {
    const app = express()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get('/students', async (req, res) => {
        try {
            const students = await db.getAll()
            res.send("Hello .NET students")
        } catch (err) {
            console.error("Error GET /students", err)
            res.status(501).send(SERVER_ERROR)
        }
    })

    app.get('/students/:id', async (req, res) => {
        const id = req.params.id
        try {
            const student = await db.getOne(id)
            res.send(student)
        } catch (err) {
            console.error("Error GET /students/id", err)
            res.status(501).send(SERVER_ERROR)
        }
    })

    app.post('/students', async (req, res) => {
        try {
            await db.createOne(req.body)
            res.status(201).send({ created: true })
        } catch (err) {
            if (err instanceof EmptyObjectError) {
                res.status(400).send({ error: "empty object" })
            } else if (err instanceof InvalidEmailError) {
                res.status(400).send({ error: "invalid email" })
            } else if (err instanceof InvalidNameError) {
                res.status(400).send({ error: "invalid name" })
            } else if (err instanceof InvalidAgeError) {
                res.status(400).send({ error: "invalid age" })
            } else {
                console.error("Error POST /students", err)
                res.status(501).send(SERVER_ERROR)
            }
        }
    })

    app.delete('/students/:id', async (req, res) => {
        const id = req.params.id
        try {
            await db.deleteOne(id)
            res.status(200).send({ deleted: true })
        } catch (err) {
            console.error("Error POST /students", err)
            res.status(501).send(SERVER_ERROR)
        }
    })

    return app;
}

export default expressDriver;

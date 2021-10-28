import express from "express"
import { MongoClient, ObjectId } from "mongodb"

const dbConf = {
  name: 'stundentsexample',
  connectionUrl: `mongodb://localhost:27017/stundentsexample`
}

const app = express()
const port = process.env.PORT; // 3000 (development) or 80 (production)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO refactor
// 1. configure object for db stuff [x]
// 2. separate app and db (inject) [x]
// 3. separate app and db in modules
// 4. create mock db

const connectToDb = async (dbConf) => {
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

const createApp = async (db) => {
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

const main = async (port, dbConf) => {
  try {
    const db = await connectToDb(dbConf);
    const app = await createApp(db)
    app.listen(port, () => {
      console.log(`Students app listening at http://localhost:${port}`)
    })
  } catch (err) {
    console.error("Error running app", err)
  }
}

main(port, dbConf);
import express from "express"
import { MongoClient, ObjectId } from "mongodb"

const dbName = 'stundentsexample';
const url = `mongodb://localhost:27017/${dbName}`;

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

MongoClient.connect(url, function (err, database) {
  if (err) {
    console.error("Connection error", err)
  }
  console.log("Connected successfully to server");
  const db = database.db(dbName);

  // GET /students => retrieves all students in db
  app.get('/students', (req, res) => {
    db.collection('students')
      .find({})
      .toArray((err, students) => {
        if (err) {
          console.error("error GET /students", err)
          res.send(err)
        } else {
          res.send(students)
        }
      })
  })

  // GET /students/id => retrieves one student with id
  app.get('/students/:id', (req, res) => {
    const id = req.params.id
    db.collection('students')
      .findOne({ "_id": ObjectId(id) }, (err, student_doc) => {
        if (err) {
          res.send(err)
        } else {
          res.send(student_doc)
        }
      })
  })

  // POST /students { name: "Petter", age: 17 } => saves the student in db
  app.post('/students', (req, res) => {
    const { name, age } = req.body
    db.collection('students')
      .insertOne({ name, age }, (err, obj) => {
        if (err) {
          res.send(err)
        } else {
          res.send(`succeful insert of object ${obj.insertedId}`)
        }
      })
  })

  // DELETE /students/id => deletes student with id
  app.delete('/students/:id', (req, res) => {
    const id = req.params.id
    console.log("id", id)
    db.collection('students')
      .deleteOne({ "_id": ObjectId(id) }, (err, obj) => {
        if (err) {
          res.send(err)
        } else {
          res.send(`successful deletion of ${obj.deletedCount} documents`)
        }
      })
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

});




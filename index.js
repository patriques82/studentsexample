const express = require("express")
const MongoClient = require('mongodb').MongoClient;

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
    res.send(`GET /students/id ${id} #TODO\n`)
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
    res.send(`DELETE /students/id ${id} #TODO\n`)
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

});




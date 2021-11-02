import createDb from "./storage/db.js"
import createApp from "./app.js"

const dbConf = {
  name: 'stundentsexample',
  connectionUrl: `mongodb+srv://patrik:123456qwerty@studentsexample.hkn0m.mongodb.net/studentsexample?retryWrites=true&w=majority`
}

const port = process.env.PORT; // 3000 or 80
const dbType = process.env.DB; // mock or mongo

const main = async (port, dbConf) => {
  try {
    const db = await createDb(dbConf, dbType);
    const app = await createApp(db)
    app.listen(port, () => {
      console.log(`Students app (${dbType}) listening at http://localhost:${port}`)
    })
  } catch (err) {
    console.error("Error running app", err)
  }
}

main(port, dbConf);
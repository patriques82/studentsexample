import createDb from "./db.js"
import createApp from "./app.js"

const dbConf = {
  name: 'stundentsexample',
  connectionUrl: `mongodb://localhost:27017/stundentsexample`
}

const port = process.env.PORT; // 3000 (development) or 80 (production)

const main = async (port, dbConf) => {
  try {
    const db = await createDb(dbConf);
    const app = await createApp(db)
    app.listen(port, () => {
      console.log(`Students app listening at http://localhost:${port}`)
    })
  } catch (err) {
    console.error("Error running app", err)
  }
}

main(port, dbConf);
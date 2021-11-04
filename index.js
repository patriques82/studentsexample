import createDb from "./storage/db.js"
import createApp from "./app.js"

const dbName = process.env.DBNAME || "<default>";
const dbConn = process.env.DBCONN || "<default>";
const port = process.env.PORT || 3000; // 3000 or 80
const dbType = process.env.DB || "mock"; // mock or mongo

const main = async (port, dbConn, dbType, dbName) => {
  try {
    const db = await createDb(dbConn, dbType, dbName);
    const app = await createApp(db)
    app.listen(port, () => {
      console.log(`Students app (${dbType}) listening at http://localhost:${port}`)
    })
  } catch (err) {
    console.error("Error running app", err)
  }
}

main(port, dbConn, dbType, dbName);
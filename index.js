import createDb from "./storage/db.js"
import createApp from "./app.js"

// Config
const APP_ENV = process.env.APP_ENV || "dev"
const PORT = process.env.PORT || 3000
const DB_TYPE = process.env.DB_TYPE || "mock"
const DB_CONN = process.env.DB_CONN || "<default>"
const DB_NAME = process.env.DB_NAME || "<default>"

const main = async () => {
  try {
    const db = await createDb(DB_TYPE, DB_CONN, DB_NAME);
    const app = await createApp(db)
    app.listen(PORT, () => {
      console.log(`Students app (${APP_ENV}) with DB (${DB_TYPE}) listening at ${PORT}`)
    })
  } catch (err) {
    console.error("Error running app", err)
  }
}

main();
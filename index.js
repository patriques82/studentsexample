import mongoDriver from "./drivers/mongodriver"
import mockdbDriver from "./drivers/mockdbdriver"
import webDriver from "./drivers/webdriver"

const dbName = process.env.DBNAME || "<default>";
const dbConn = process.env.DBCONN || "<default>";
const port = process.env.PORT || 3000; // 3000 or 80
const dbType = process.env.DB || "mock"; // mock or mongo

const selectDb = async (dbType, dbConn, dbName) => {
  switch (dbType) {
    case "mock":
      return mockdbDriver();
    case "mongo":
    default:
      return await mongoDriver(dbConn, dbName)
  }
}

const main = async (port, dbType, dbConn, dbName) => {
  try {
    const db = await selectDb(dbConn, dbType, dbName); // mockdb or mongo
    const app = await webDriver(db)
    app.listen(port, () => {
      console.log(`Students app (${dbType}) listening at http://localhost:${port}`)
    })
  } catch (err) {
    console.error("Error running app", err)
  }
}

main(port, dbType, dbConn, dbName);
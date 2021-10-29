import request from "supertest"
import createApp from "../app.js"
import { createMockDb } from "../storage/db.js"

const mockData = [
    {name: "Patrik", age: 38},
    {name: "Petter", age: 41},
    {name: "Pontus", age: 12},
    {name: "Per", age: 57},
]

describe('/students endpoints', () => {
    const mockDb = createMockDb(mockData)

    it('should get 4 students', async () => {
        const app = await createApp(mockDb)
        const res = await request(app).get('/students')
        expect(res.statusCode).toBe(200)
    })


})

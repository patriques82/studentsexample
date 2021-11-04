import request from "supertest"
import webDriver from "../drivers/webdriver"
import { mockData, createMockDb } from "../drivers/mockdbdriver"

describe('/students endpoints', () => {
    it('GET /students should get 4 students', async () => {
        const mockDb = createMockDb(mockData)
        const app = await webDriver(mockDb)
        const res = await request(app).get('/students')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(expect.arrayContaining([
            { _id: 0, email: "patrik@email.com", name: "Patrik", age: 38 },
            { _id: 1, email: "petter@email.com", name: "Petter", age: 41 },
            { _id: 2, email: "pontus@email.com", name: "Pontus", age: 12 },
            { _id: 3, email: "per@email.com", name: "Per", age: 57 }
        ]));
    })

    it('GET /students/3 should get 1 student', async () => {
        const mockDb = createMockDb(mockData)
        const app = await webDriver(mockDb)
        const res = await request(app).get('/students/3')
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({ _id: 3, email: "per@email.com", name: "Per", age: 57 })
    })

    it('POST /students should create 1 student', async () => {
        const mockDb = createMockDb(mockData)
        const app = await webDriver(mockDb)
        const res = await request(app)
            .post('/students')
            .send({ email: "peggy@email.com", name: "Peggy", age: 32 })
        expect(res.statusCode).toBe(201)
        expect(res.body).toMatchObject({ created: true })
    })

    it('DELETE /students should delete 1 student', async () => {
        const mockDb = createMockDb(mockData)
        const app = await webDriver(mockDb)
        const res = await request(app).delete('/students/3')
        expect(res.statusCode).toBe(200)
        expect(res.body).toMatchObject({ deleted: true })
    })
})

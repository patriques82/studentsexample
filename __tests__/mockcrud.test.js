import { createMockDb } from "../storage/db.js"

const mockData = [
    { name: "Patrik", age: 38 },
    { name: "Petter", age: 41 },
    { name: "Pontus", age: 12 },
    { name: "Per", age: 57 },
]

describe('mockcrud', () => {
    it('should return all data', async () => {
        const mockDb = createMockDb(mockData)
        const data = await mockDb.getAll()
        expect(data).toEqual(expect.arrayContaining([
            { _id: 0, name: "Patrik", age: 38 },
            { _id: 1, name: "Petter", age: 41 },
            { _id: 2, name: "Pontus", age: 12 },
            { _id: 3, name: "Per", age: 57 }
        ]));
    })

    it('should return 1 item in data', async () => {
        const mockDb = createMockDb(mockData)
        const data = await mockDb.getOne(0)
        expect(data).toMatchObject({ _id: 0, name: "Patrik", age: 38 })
    })

    it('should create 1 item in data', async () => {
        const mockDb = createMockDb(mockData)
        await mockDb.createOne({ name: "Penny", age: 32 })
        const data = await mockDb.getOne(4)
        expect(data).toMatchObject({ _id: 4, name: "Penny", age: 32 })
    })

    it('should delete 1 item', async () => {
        const mockDb = createMockDb(mockData)
        await mockDb.deleteOne(3)
        const data = await mockDb.getAll()
        expect(data).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: 3,
                })
            ])
        )
    })
})

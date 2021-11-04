import { mockData, createMockDb } from "../drivers/mockdbdriver"

describe('mockcrud', () => {
    it('should return all data', async () => {
        const mockDb = createMockDb(mockData)
        const data = await mockDb.getAll()
        expect(data).toEqual(expect.arrayContaining([
            { id: 0, email: "patrik@email.com", name: "Patrik", age: 38 },
            { id: 1, email: "petter@email.com", name: "Petter", age: 41 },
            { id: 2, email: "pontus@email.com", name: "Pontus", age: 12 },
            { id: 3, email: "per@email.com", name: "Per", age: 57 }
        ]));
    })

    it('should return 1 item in data', async () => {
        const mockDb = createMockDb(mockData)
        const data = await mockDb.getOne(0)
        expect(data).toMatchObject({ id: 0, email: "patrik@email.com", name: "Patrik", age: 38 })
    })

    it('should create 1 item in data', async () => {
        const mockDb = createMockDb(mockData)
        await mockDb.createOne({ email: "penny@email.com", name: "Penny", age: 32 })
        const data = await mockDb.getOne(4)
        expect(data).toMatchObject({ id: 4, email: "penny@email.com", name: "Penny", age: 32 })
    })

    it('should delete 1 item', async () => {
        const mockDb = createMockDb(mockData)
        await mockDb.deleteOne(3)
        const data = await mockDb.getAll()
        expect(data).not.toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: 3,
                })
            ])
        )
    })
})

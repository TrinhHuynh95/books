import BookModel from "../../src/models/book";
import  providers from '../../src/lib/providers'
import BookRepository from "../../src/repositories/book";
const { repositories, application } = providers

describe('Test BookRepository', () => {
    let repo: BookRepository
    const bookToCreate = {
        book_summary: "Summary",
        book_title: "Title",
        book_price: 20,
        quantity: 2,
    };
    beforeAll(async () => {
        const app = application()

        await app.initEnv()
        await app.loadConfig()
        await app.loadLang()
        await app.initDatabase()
        await app.providers.load()
        repo = await repositories('book')
    })
    beforeEach(async () => {
        await repo.dropTableIfExists()
    })
    test('get BookRepository.search', async () => {
        await repo.create(bookToCreate);
        const result = await repo.search()
        expect(result.total).toBe(1)
        expect(result.data).toHaveLength(1)
        expect(result.data[0]).toBeInstanceOf(BookModel)
    })
})

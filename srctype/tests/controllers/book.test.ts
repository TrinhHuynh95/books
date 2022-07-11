import BookModel from "../../src/models/book";
import  providers from '../../src/lib/providers'
import BookRepository from "../../src/repositories/book";
import BookController from "../../src/controllers/book"
const { repositories, application } = providers

describe('Test BookController', () => {
    let repo: BookRepository
    const books: any = [
        {book_title: "Title", book_summary: "Summary", book_price: 20, quantity: 2},
        {book_title: "Title 2", book_summary: "Summary 2", book_price: 20, quantity: 2},
    ];
    beforeAll(async () => {
        const app = application()
        await app.initEnv()
        await app.loadConfig()
        await app.loadLang()
        await app.initDatabase()
        await app.providers.load()
        repo = await repositories('book')

    })
    it("get BookController.index", async () => {
        const mockSpy = jest.spyOn(repo, "search");
        mockSpy.mockImplementation(() => {
            return Promise.resolve({
                data: books,
                total: 10
            });
        });

        const req: any = {body: {
                limit: 10,
                page: 1,
                order: ''
            },
        };
        const res: any = {
            json: null,
            send: (data: any) => res.json = data
        }
        const response = await BookController.index(req, res);
        expect(res.json).toEqual({
            data: books,
            total: 10
        });
    })
})

import providers  from '../lib/providers'
const repositories = providers.repositories

const book = {
  async index (req: any, res: any) {
    const bookRepository = await repositories('book')

    const conditions = {
      category_id: req.query?.category_id,
      author_id: req.query?.author_id,
      limit: req.query?.limit,
      order: req.query?.order,
      page: req.query?.page
    }

    const result = await bookRepository.search(conditions)

    return res.send({
      ...result
    })
  },
  async detail (req: any, res: any) {
    const bookRepository = await repositories('book')
    const record = await bookRepository.findById(req.params.id)
    if (!record) {
      res.status(404).send().end()
    }
    await record.loadRelations(['author', 'category'])

    return res.send(record)
  },
  async create (req: any, res: any) {
    const bookRepository = await repositories('book')
    await bookRepository.create(req.body)

    return res.status(204).send()
  }
}

export default book

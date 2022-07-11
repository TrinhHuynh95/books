const { repositories } = require('../lib/providers')

const book = {
  async index (req, res) {
    const bookRepository = repositories('book')

    const conditions = {
      category_id: req.query.category_id,
      author_id: req.query.author_id,
      limit: req.query.limit,
      order: req.query.order,
      page: req.query.page
    }

    const result = await bookRepository.search(conditions)

    res.send({
      ...result
    })
  },
  async detail (req, res) {
    const bookRepository = repositories('book')
    const record = await bookRepository.findById(req.params.id)
    if (!record) {
      res.status(404).send().end()
    }
    await record.loadRelations(['author', 'category'])

    res.send(record)
  },
  async create (req, res) {
    const bookRepository = repositories('book')
    await bookRepository.create(req.body)

    res.status(204).send()
  }
}

module.exports = book

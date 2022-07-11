const { repositories } = require('../lib/providers')

const cart = {
  async order (req, res) {
    const bookRepository = repositories('book')
    await bookRepository.updateCart(req.body.list)

    res.status(204).send()
  }
}

module.exports = cart

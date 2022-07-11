const book = require('../controllers/book')
const cart = require('../controllers/cart')
const Api = require('../middleware/api')
const Auth = require('../middleware/auth')

module.exports = [
  {
    method: 'get',
    path: '/book',
    middleware: [
      new Api()
    ],
    handler: book.index
  },
  {
    method: 'get',
    path: '/book/:id',
    middleware: [
      new Api()
    ],
    handler: book.detail
  },
  {
    method: 'post',
    path: '/book',
    middleware: [
      new Auth({ is_admin: true })
    ],
    handler: book.create
  },
  {
    method: 'post',
    path: '/cart',
    middleware: [
      new Auth()
    ],
    handler: cart.order
  }
]

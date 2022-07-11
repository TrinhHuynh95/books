import book from '../controllers/book'
import cart from '../controllers/cart'
import Api from '../middleware/api'
import Auth from '../middleware/auth'

export default [
  {
    method: 'get',
    path: '/book',
    middleware: [
      new Api({})
    ],
    handler: book.index
  },
  {
    method: 'get',
    path: '/book/:id',
    middleware: [
      new Api({})
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
      new Auth({})
    ],
    handler: cart.order
  }
]

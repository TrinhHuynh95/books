import Authorization from '../lib/authorization'

export default [
  {
    method: 'get',
    path: '/logged',
    handler: Authorization.logged
  },
  {
    method: 'post',
    path: '/login',
    handler: Authorization.login
  },
  {
    method: 'post',
    path: '/register',
    handler: Authorization.register
  }
]

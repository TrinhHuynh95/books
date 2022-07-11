const RepositoryBase = require('../lib/repositories/repository.base')
const UsersModel = require('../models/user')

class UsersRepository extends RepositoryBase {
  table = 'users'
  modelClass = UsersModel
}

module.exports = UsersRepository

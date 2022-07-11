const RepositoryBase = require('../lib/repositories/repository.base')
const AuthorEntity = require('../models/author')

class AuthorRepository extends RepositoryBase {
  table = 'authors'
  modelClass = AuthorEntity
}

module.exports = AuthorRepository

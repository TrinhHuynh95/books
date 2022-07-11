const RepositoryBase = require('../lib/repositories/repository.base')
const CategoryModel = require('../models/category')

class CategoryRepository extends RepositoryBase {
  table = 'categories'
  modelClass = CategoryModel
}

module.exports = CategoryRepository

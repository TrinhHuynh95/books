import RepositoryBase from '../lib/repositories/repository.base'
import CategoryModel from '../models/category'

class CategoryRepository extends RepositoryBase {
  table = 'categories'
  modelClass = CategoryModel
}

export default CategoryRepository

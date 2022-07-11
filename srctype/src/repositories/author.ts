import RepositoryBase from '../lib/repositories/repository.base'
import AuthorEntity from '../models/author'

class AuthorRepository extends RepositoryBase {
  table = 'authors'
  modelClass = AuthorEntity
}

export default AuthorRepository

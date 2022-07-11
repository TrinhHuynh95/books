import RepositoryBase from '../lib/repositories/repository.base'
import UsersModel from '../models/user'

class UsersRepository extends RepositoryBase {
  table = 'users'
  modelClass = UsersModel
}

export default UsersRepository

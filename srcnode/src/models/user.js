const ModelBase = require('../lib/model_base')

class UsersModel extends ModelBase {
  init () {
    this._attributes = [
      '_id',
      'email',
      'is_admin',
      'pw',
      'create_at'
    ]
  }

  get _id () {
    return this._data?._id
  }

  get email () {
    return this._data.email
  }

  set email (email) {
    if (!email) {
      throw new Error('email is required')
    }
    this._data.email = email

    return this
  }

  get is_admin () {
    return !!this._data.is_admin
  }

  set is_admin (isAdmin) {
    this._data.is_admin = isAdmin

    return this
  }

  get pw () {
    return this._data.pw
  }

  set pw (pw) {
    if (!pw) {
      throw new Error('pw is required')
    }
    this._data.pw = pw

    return this
  }
}

module.exports = UsersModel

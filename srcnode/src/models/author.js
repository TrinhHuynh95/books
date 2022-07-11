const ModelBase = require('../lib/model_base')
const configs = require('../lib/config')

class AuthorModel extends ModelBase {
  init () {
    this._attributes = [
      '_id',
      'author_name',
      'author_bio',
      'avatar',
      'create_at',
      'update_at'
    ]

    this._appends = [
      'avatar_url'
    ]
  }

  get _id () {
    return this._data?._id
  }

  get author_name () {
    return this._data?.author_name
  }

  /**
   * @param {string} authorName
   * @returns {AuthorModel}
   */
  set author_name (authorName) {
    this._data.author_name = authorName

    return this
  }

  get avatar () {
    return this._data?.avatar
  }

  /**
   * @param {string} avatar
   * @returns {AuthorModel}
   */
  set avatar (avatar) {
    this._data.avatar = avatar

    return this
  }

  get author_bio () {
    return this._data?.author_bio
  }

  /**
   * @param {string} authorBio
   * @returns {AuthorModel}
   */
  set author_bio (authorBio) {
    this._data.author_bio = authorBio

    return this
  }

  /**
   * @return string
   */
  get avatar_url () {
    if (!this.avatar) {
      return configs.get('app.storage_url') + '/images/no-image.png'
    }
    return configs.get('app.storage_url') + '/images/' + this.avatar
  }
}

module.exports = AuthorModel

import ModelBase from '../lib/model_base'
import * as configs from '../lib/config'

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

export default AuthorModel

import CategoryModel from './category'
import AuthorModel from './author'
import { ObjectId } from 'mongodb'
import ModelBase from '../lib/model_base'
import * as configs from '../lib/config'

class BookModel extends ModelBase {
  init () {
    this._attributes = [
      '_id',
      'category_id',
      'author_id',
      'book_title',
      'book_summary',
      'book_price',
      'book_cover_photo',
      'quantity',
      'create_at',
      'update_at'
    ]

    this._appends = [
      'book_cover_photo_url'
    ]

    this._relations = {
      author: { repository: 'author', type: 'belong_to' },
      category: { repository: 'category', type: 'belong_to' }
    }
  }

  get _id () {
    return this._data?._id
  }

  get category_id () {
    return this._data?.category_id
  }

  /**
   *
   * @param {string|object} categoryId
   * @returns {BookModel}
   */
  set category_id (categoryId) {
    this._data.category_id = typeof categoryId === 'string' ? new ObjectId(categoryId) : categoryId
  }

  get author_id () {
    return this._data?.author_id
  }

  /**
   *
   * @param {string|object} authorId
   * @returns {BookModel}
   */
  set author_id (authorId) {
    this._data.author_id = typeof authorId === 'string' ? new ObjectId(authorId) : authorId
  }

  get book_title () {
    return this._data?.book_title
  }

  /**
   *
   * @param {string} bookTitle
   * @returns {BookModel}
   */
  set book_title (bookTitle) {
    this._data.book_title = bookTitle
  }

  get book_summary () {
    return this._data?.book_summary
  }

  /**
   *
   * @param {string} bookSummary
   * @returns {BookModel}
   */
  set book_summary (bookSummary) {
    this._data.book_summary = bookSummary
  }

  get book_cover_photo () {
    return this._data?.book_cover_photo
  }

  /**
   *
   * @param {string} bookCoverPhoto
   * @returns {BookModel}
   */
  set book_cover_photo (bookCoverPhoto) {
    this._data.book_cover_photo = bookCoverPhoto
  }

  get book_price () {
    return parseFloat(this._data?.book_price)
  }

  /**
   *
   * @param {float} bookPrice
   * @returns {BookModel}
   */
  set book_price (bookPrice) {
    this._data.book_price = bookPrice
  }

  get quantity () {
    return parseInt(this._data?.quantity)
  }

  /**
   *
   * @param {int} quantity
   * @returns {BookModel}
   */
  set quantity (quantity) {
    this._data.quantity = quantity
  }

  /**
   * @return string
   */
  get book_cover_photo_url () {
    if (!this.book_cover_photo) {
      return configs.get('app.storage_url') + '/images/no-image.png'
    }
    return configs.get('app.storage_url') + '/images/' + this.book_cover_photo
  }

  get author () {
    if (this._data.author && !(this._data.author instanceof AuthorModel)) {
      this._data.author = AuthorModel.new(this._data.author)
    }

    return this._data.author
  }

  get category () {
    if (this._data.category && !(this._data.category instanceof CategoryModel)) {
      this._data.category = CategoryModel.new(this._data.category)
    }

    return this._data.category
  }
}

export default BookModel

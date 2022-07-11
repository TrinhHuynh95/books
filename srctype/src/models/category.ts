import ModelBase from '../lib/model_base'

class CategoryModel extends ModelBase {
  init () {
    this._attributes = [
      '_id',
      'category_name',
      'category_desc',
      'create_at',
      'update_at'
    ]
    this._appends = [
      'book_cover_photo_url'
    ]
    this._relations = {
      author: { repository: 'authors', type: 'belong_to' },
      category: { repository: 'categories', type: 'belong_to' }
    }
  }

  get _id () {
    return this._data?._id
  }

  get category_name () {
    return this._data?.category_name
  }

  /**
   * @param {string} categoryName
   * @returns {CategoryModel}
   */
  set category_name (categoryName) {
    this._data.category_name = categoryName
  }

  get category_desc () {
    return this._data?.category_desc
  }

  /**
   * @param {string} categoryDesc
   * @returns {CategoryModel}
   */
  set category_desc (categoryDesc) {
    this._data.category_desc = categoryDesc
  }
}

export default CategoryModel

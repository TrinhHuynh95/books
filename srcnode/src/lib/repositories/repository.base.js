const { ObjectId } = require('mongodb')

class RepositoryBase {
  _db
  table
  modelClass = null

  constructor (db) {
    if (!db) {
      throw new Error('db is not defined')
    }
    this._db = db
  }

  dropTableIfExists () {
    return this._db.dropTableIfExists(this.table)
  }

  createTable (cb) {
    return this._db.createTable(this.table, cb)
  }

  truncate () {
    return this._db.truncate(this.table)
  }

  async all () {
    return await this._db.all(this.table).then(res => {
      return res.map(item => this.modelClass.new(item))
    })
  }

  findById (id) {
    let _id = id
    if (typeof id === 'string') {
      _id = new ObjectId(id)
    }
    return this.findOne({ _id })
  }

  findOne (conditions) {
    return this.query.findOne(conditions).then(res => res ? this.modelClass.new(res) : null)
  }

  create (data) {
    let updateDate = data

    if (this.modelClass) {
      const entity = this.modelClass.new()
      entity.setFillData(data)
      if (!entity.create_at && entity._attributes.indexOf('create_at') !== -1) {
        entity.create_at = new Date()
      }
      if (!entity.update_at && entity._attributes.indexOf('update_at') !== -1) {
        entity.update_at = new Date()
      }
      updateDate = entity.fill()
    }

    return this._db.insert(this.table, updateDate)
  }

  update (_id, data) {
    let updateDate = data

    if (this.modelClass) {
      const entity = this.modelClass.new()
      entity.setFillData(data)
      if (!entity.update_at && entity._attributes.indexOf('update_at') !== -1) {
        entity.update_at = new Date()
      }
      entity.protects = ['_id', 'create_at']
      updateDate = entity.fill()
    }

    return this._db.updateOne(this.table, { $set: updateDate})
  }

  get query () {
    return this._db.query.collection(this.table)
  }
}

module.exports = RepositoryBase

const RepositoryBase = require('../lib/repositories/repository.base')
const BookModel = require('../models/book')
const { ObjectId } = require('mongodb')

class BookRepository extends RepositoryBase {
  table = 'books'
  modelClass = BookModel

  async search (conditions = {}) {
    const aggregate = []

    if (conditions.author_id) {
      aggregate.push({ $match: { author_id: new ObjectId(conditions.author_id) } })
    }

    if (conditions.category_id) {
      aggregate.push({ $match: { category_id: new ObjectId(conditions.category_id) } })
    }

    aggregate.push(
      {
        $lookup:
          {
            from: 'authors',
            localField: 'author_id',
            foreignField: '_id',
            as: 'author'
          }
      },
      {
        $lookup:
          {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category'
          }
      },
      {
        $set: {
          author: { $arrayElemAt: ['$author', 0] },
          category: { $arrayElemAt: ['$category', 0] }
        }
      })

    const total = await this.query.aggregate([
      ...aggregate,
      { $group: { _id: null, count: { $sum: 1 } } },
      { $project: { _id: 0 } }
    ]).toArray()

    const sort = {}
    switch (conditions.order) {
      default:
        sort.create_at = -1
        break
    }
    sort._id = -1
    aggregate.push({ $sort: sort })

    if (conditions.limit) {
      const $skip = conditions.page
        ? (parseInt(conditions.page) - 1) * parseInt(conditions.limit)
        : 0
      aggregate.push({ $limit: parseInt(conditions.limit) + $skip })
      if (conditions.page) {
        aggregate.push({ $skip })
      }
    }

    const data = await this.query.aggregate(aggregate)
      .toArray().then((res) => {
        return res.map(item => this.modelClass.new(item))
      })

    return {
      total: total[0].count,
      data
    }
  }

  updateCart (list) {
    const all = []
    list.forEach(item => {
      all.push(this.query.updateOne(
        { _id: ObjectId(item._id) },
        { $inc: { quantity: -item.cart } }
      ))
    })

    return Promise.all(all)
  }
}

module.exports = BookRepository

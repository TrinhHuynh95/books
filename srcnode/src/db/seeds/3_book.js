const { repositories, logger } = require('../../lib/providers')

module.exports = async () => {
  const repo = repositories('book')
  await repo.truncate()

  const categories = await repositories('category').all()
  const authors = await repositories('author').all()
  const all = []
  for (let i = 1; i <= 50; i++) {
    const aIndex = Math.floor(Math.random() * 5)
    const cIndex = Math.floor(Math.random() * 3)
    all.push(repo.create({
      category_id: categories[cIndex]._id,
      author_id: authors[aIndex]._id,
      book_title: 'Book title ' + i,
      book_summary: 'Book Description ' + i,
      book_price: Math.floor(Math.random() * 300),
      book_cover_photo: '',
      quantity: Math.floor(Math.random() * 300)
    }).then(res => {
      logger().log(`create book ${i} success`)
    }).catch(res => {
      logger().log(`create book ${i} failed`)
    }))
  }
  await Promise.all(all)
}

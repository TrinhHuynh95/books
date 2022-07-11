const { repositories, logger } = require('../../lib/providers')

module.exports = async () => {
  const repo = repositories('category')
  await repo.truncate()
  const list = ['drama', 'comedy', 'sport']
  const all = []
  list.forEach(i =>
    all.push(repo.create({
      category_name: i,
      category_desc: i
    }).then(res => {
      logger().log(`create category ${i} success`)
    }).catch(res => {
      logger().log(`create category ${i} failed`)
    })))
  await Promise.all(all)
}

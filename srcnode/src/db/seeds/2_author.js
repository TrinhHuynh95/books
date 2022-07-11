const { repositories, logger } = require('../../lib/providers')

module.exports = async () => {
  const repo = repositories('author')
  await repo.truncate()
  const all = []
  for (let i = 1; i <= 5; i++) {
    all.push(repo.create({
      author_name: 'Mickey Lend ' + i,
      author_bio: 'Author Bio' + i
    }).then(res => {
      logger().log(`create author ${i} success`)
    }).catch(res => {
      logger().log(`create author ${i} failed`)
    }))
  }
  await Promise.all(all)
}

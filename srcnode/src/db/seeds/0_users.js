const { repositories } = require('../../lib/providers')

module.exports = async () => {
  const repo = repositories('user')
  await repo.truncate()

  const all = []
  all.push(repo.create({
    email: 'admin@nashtech.com',
    pw: 'sysAdmin123-',
    is_admin: true
  }))

  await Promise.all(all)
}

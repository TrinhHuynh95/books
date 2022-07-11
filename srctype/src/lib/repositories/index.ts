import loader from '../helpers/loader'
import database from '../database/index'
import {ObjectLiteral} from '../../types'

export default async (config: ObjectLiteral) => {
  const loaders = await loader(config.get('app.sys_paths.repository'))

  const items: ObjectLiteral = {}
  for (const name in loaders) {
    items[name] = new loaders[name](database.connection)
  }
  return {
    items,
    get (name: string) {
      if (!this.items[name]) {
        throw new Error(`Repository ${name} is not exist`)
      }

      return this.items[name]
    }
  }
}

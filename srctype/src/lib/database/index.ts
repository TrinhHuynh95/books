import databaseDriver from './drivers'
import * as config from '../config'
import loader from '../helpers/loader'

const database = {
  connection: null,

  async connect (name = null, settings = null, $shared = true) {
    if (!name) {
      name = config.get('database.driver')
    }
    if (settings) {
      settings = config.get(`database.connections.${name}`)
    }
    if (!$shared) {
      return await databaseDriver.connect(name, settings)
    }
    if (!this.connection) {
      this.connection = await databaseDriver.connect(name, settings)
    }

    return this.connection
  },

  async seed (nameFile: string) {
    await this.connect()

    const loaders = await loader(config.get('app.sys_paths.seed'), '.ts')
    if (nameFile) {
      if (!loaders[nameFile]) {
        throw new Error(`Seed ${nameFile} is not exist`)
      }
      await loaders[nameFile]()
      return
    }

    for (const name in loaders) {
      console.log(`Seed ${name} is running`)
      await loaders[name]()
      console.log(`Seed ${name} is done`)
    }
  },

  async migrate (nameFile: string) {
    await this.connect()

    const loaders = await loader(config.get('app.sys_paths.migrate'), '.ts')
    if (nameFile) {
      if (!loaders[nameFile]) {
        throw new Error(`Migrate ${nameFile} is not exist`)
      }
      await loaders[nameFile]()
      return
    }
    for (const name in loaders) {
      console.log(`Migrate ${name} is running`)
      await loaders[name]()
      console.log(`Migrate ${name} is done`)
    }
  }
}

export default database

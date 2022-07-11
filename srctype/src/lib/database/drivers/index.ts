import MysqlDriver from './mysql'
import MongodbDriver from './mongodb'
import {ObjectLiteral} from '../../../types'

const drivers: ObjectLiteral = {
  "mysql": MysqlDriver,
  "mongodb": MongodbDriver
}

const databaseDriver: ObjectLiteral = {
  driver: null,
  init (name: string, settings: ObjectLiteral) {
    if (!drivers[name]) {
      throw new Error(`Driver ${name} is not exist`)
    }
    this.driver = new drivers[name](settings)
  },

  connect: async function (name: string, settings: ObjectLiteral) {
    if (name && settings) {
      this.init(name, settings)
    }
    if (!this.driver) {
      throw new Error('')
    }
    await this.driver.connect()

    return this.driver
  },

  close () {
    if (!this.driver) {
      throw new Error('')
    }
    this.driver.close()
  }
}

export default databaseDriver

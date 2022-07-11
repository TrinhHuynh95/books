import { Db, MongoClient} from 'mongodb'

class MongodbDriver {
  _config
  client: MongoClient | undefined
  db: Db | undefined

  constructor (config: any) {
    this._config = config
  }

  async connect () {
    this.client = new MongoClient(this.url)

    await this.client.connect()

    this.db = await this.client.db(this._config.database)
  }

  get url () {
    const { url, username, password, host, port } = this._config
    return `${url}${username}:${password}@${host}:${port}/`
  }

  get query () {
    return this.db
  }

  async close () {
    if (this.client) {
      await this.client.close()
    }
  }

  find (table: any, where: any) {
    if (!this.db) {
      throw new Error('Server Error')
    }
    return this.db.collection(table).find(where).toArray()
  }

  findOne (table: any, where: any) {
    if (!this.db) {
      throw new Error('Server Error')
    }
    return this.db.collection(table).findOne(where)
  }

  insert (table: any, data: any) {
    if (!this.db) {
      throw new Error('Server Error')
    }
    return this.db.collection(table).insertOne(data)
  }

  async dropTableIfExists (table: string) {
    if (!this.db) {
      throw new Error('Server Error')
    }
    const collections = (await this.db.listCollections().toArray()).map(collection => collection.name)

    if (collections.indexOf(table) !== -1) {
      return this.db.collection(table).drop()
    }

    return null
  }

  createTable (table: any, cb: any) {
    // mongo will create table when insert data
    return true
  }

  truncate (table: string) {
    return this.dropTableIfExists(table)
  }

  all (table: string) {
    if (!this.db) {
      throw new Error('Server Error')
    }
    return this.db.collection(table).find({}).toArray()
  }
}

export default MongodbDriver

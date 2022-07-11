import knex, { Knex } from 'knex'
import {ObjectLiteral} from '../../../types'

export default abstract class KnexSqlBase {
  _config
  client: any
  clientName: string = ""

  protected constructor (config: any) {
    this._config = config
  }

  async connect () {
    const { username, password, host, port, database } = this._config

    if (!this.clientName) {
      throw new Error('clientName is required')
    }

    this.client = await knex({
      client: this.clientName,
      connection: {
        host,
        port,
        user: username,
        password,
        database
      }
    })
  }

  get query () {
    return this.client
  }

  close () {
    if (!this.client) {
      throw new Error('Server Error')
    }
    this.client.destroy()
  }

  dropTableIfExists (table: string) {
    if (!this.client) {
      throw new Error('Server Error')
    }
    return this.client.schema.dropTableIfExists(table)
  }

  createTable (table: string, cb: any) {
    if (!this.client) {
      throw new Error('Server Error')
    }
    return this.client.schema.createTable(table, cb)
  }

  insert (table: string, data: ObjectLiteral) {
    if (!this.client) {
      throw new Error('Server Error')
    }
    const t = this.client(table)
    if (!t) {
      throw new Error('Server Error')
    }
    return t.insert(data)
  }

  truncate (table: string) {
    if (!this.client) {
      throw new Error('Server Error')
    }
    return this.client(table).truncate()
  }

  all (table: string) {
    if (!this.client) {
      throw new Error('Server Error')
    }
    return this.client(table).select('*')
  }
}

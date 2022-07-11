import providers  from './providers'
const repositories = providers.repositories
import {ObjectLiteral} from '../types'

class ModelBase {
  _data: ObjectLiteral = {}
  _attributes: any[] = []
  _appends: any[] = []
  _relations: ObjectLiteral = {}
  protects: any[] = []

  constructor (doc: any) {
    this._data = doc || {}
    this.init()
  }

  static new (doc: any) {
    return new this(doc)
  }

  init () {}

  setFillData (data: ObjectLiteral) {
    for (const name in data) {
      if (this._attributes.indexOf(name) === -1) continue

      // @ts-ignore
      this[name] = data[name]
    }
  }

  fill () {
    if (!this._attributes) {
      return this._data
    }

    const fill:ObjectLiteral = {}
    for (const name of this._attributes) {
      if (this._data[name] !== undefined && (this.protects.indexOf(name) === -1)) {
        fill[name] = this._data[name]
      }
    }

    return fill
  }

  toJSON () {
    let fill = {}
    if (!this._attributes) {
      fill = this._data
    } else {
      for (const name of this._attributes) {
        // @ts-ignore
        if (this[name] !== undefined && (this.protects.indexOf(name) === -1)) {
          // @ts-ignore
          fill[name] = this[name]
        }
      }
    }

    if (this._appends) {
      for (const name of this._appends) {
        // @ts-ignore
        if (this[name] !== undefined && (this.protects.indexOf(name) === -1)) {
          // @ts-ignore
          fill[name] = this[name]
        }
      }
    }

    if (this._relations) {
      for (const name of Object.keys(this._relations)) {
        // @ts-ignore
        if (this[name] && (this.protects.indexOf(name) === -1)) {
          // @ts-ignore
          fill[name] = this[name]
        }
      }
    }
    return fill
  }

  get create_at () {
    return this._data?.create_at
  }

  /**
   * @param {Date|string} createAt
   * @returns {object}
   */
  set create_at (createAt) {
    this._data.create_at = typeof createAt === 'string' ? new Date(createAt) : createAt
  }

  get update_at () {
    return this._data?.update_at
  }

  /**
   * @param {Date|string} updateAt
   * @returns {object}
   */
  set update_at (updateAt) {
    this._data.update_at = typeof updateAt === 'string' ? new Date(updateAt) : updateAt
  }

  async loadRelations (names: any) {
    for (const name of names) {
      const setting: any = this._relations[name]
      const repo = await repositories(setting.repository)
      let func = setting.funcName || null
      const localName = this.constructor.name.replace('Model', '').toLowerCase() + '_id'
      switch (setting.type) {
        case 'belong_to':
          func = func || 'findById'
          // @ts-ignore
          this._data[name] = await repo[func](this[name + '_id'])
          break
        case 'has_one':
          func = func || 'findOne'
          this._data[name] = await repo[func]({ [localName]: this._data?._id })
          break
        default:
          break
      }
      // @ts-ignore
      this._appends.push(name)
    }
  }
}

export default ModelBase

import fs from 'fs'
import * as path from 'path'

import { get as objGet, set as objSet } from './helpers/object'
import loader from './helpers/loader'
import {ObjectLiteral} from '../types'

const internals: ObjectLiteral = {}

export const init = async function (rootConfig: string = '') {
  if (!fs.existsSync(path.resolve(rootConfig))) {
    throw new Error('Config root is not exist')
  }

  const loaders = await loader(rootConfig)

  for (const name in loaders) {
    internals[name] = loaders[name]
  }
}

export const get = function (keys: string | string[], defaultValue:any = null) {
  return objGet(internals, keys, defaultValue)
}

export const set = function (keys: string | string[], defaultValue:any = null) {
  return objSet(internals, keys, defaultValue)
}

import fs from 'fs'
import * as path from 'path'

import { get as objGet, set as objSet } from './helpers/object'
import loader from './helpers/loader'
import {ObjectLiteral} from '../types'
const internals: ObjectLiteral = {}

export const init = async function (pathRoot: string | null = '') {
  if (!pathRoot || !fs.existsSync(path.resolve(pathRoot))) {
    throw new Error('Lang root is not exist')
  }

  const loaders = await loader(pathRoot)

  for (const name in loaders) {
    internals[name] = loaders[name]
  }
}

export const get = (keys: string | string[], defaultValue = null) => {
  return objGet(internals, keys, defaultValue)
}

export const set = (keys: string | string[], defaultValue = null) => {
  return objSet(internals, keys, defaultValue)
}

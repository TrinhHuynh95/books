import fs from 'fs'
import * as path from 'path'

import {ObjectLiteral} from '../../types'

const name = (filename: string, ext: string): string => path.basename(filename).replace(ext, '')

export default async (rootPath: string, ext = '.ts') => {
  const loaders: ObjectLiteral = {}
  const all: any[] = []
  if (fs.lstatSync(rootPath).isDirectory()) {
    fs.readdirSync(path.resolve(rootPath)).forEach(filename => {
      if (filename.indexOf(ext) !== -1) {
        let n = name(filename, ext)
        all.push(import(path.resolve(rootPath, filename)).then(res => loaders[n] = res.default))
      }
    })

  } else {
    all.push(import(path.resolve(rootPath)).then(res => loaders[name(rootPath, ext)] = res.default))
  }
  await Promise.all(all);

  return loaders
}

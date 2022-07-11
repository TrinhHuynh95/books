import Application from './application'
import repositoriesLoader from'./repositories'
import loader from './helpers/loader'
import logger from './helpers/logger'
import * as config from './config'
import * as path from 'path'
import {ObjectLiteral} from '../types'

const instances: ObjectLiteral = {}
const providers: ObjectLiteral = {
  instances: instances,
  application () {
    if (!providers.get('application')) {
      providers.add('application', new Application(providers))
    }

    return providers.get('application')
  },
  async repositories (name: string) {
    if (!providers.get('repositories')) {
      providers.add('repositories', await repositoriesLoader(config))
    }

    if (name) {
      return providers.get('repositories').get(name)
    }

    return providers.get('repositories')
  },
  logger () {
    if (!providers.get('logger')) {
      providers.add('logger', logger)
    }

    return providers.get('logger')
  },
  get (name: string) {
    if (!providers.instances[name] && !providers[name]) {
      providers.loadEx(name)

      if (!providers.instances[name]) {
        throw new Error(`Provider ${name} is not exist`)
      }
    }

    return providers.instances[name]
  },
  add (name: string, provider: any) {
    providers.instances[name] = provider
  },
  async load () {
    const loaders = await loader(config.get('app.sys_paths.provider'))
    for (const name in loaders) {
      if (providers.instances[name] || providers[name]) continue
      const p = new loaders[name]()
      if (p.init) {
        p.init()
      }
      providers.add(name, p)
    }
  },
  async loadEx (name: string) {
    const loaders = await loader(path.resolve(config.get('app.sys_paths.provider'), name + '.ts'))
    for (const name in loaders) {
      const p = new loaders[name]()
      if (p.init) {
        p.init()
      }
      providers.add(name, p)
    }
  }
}

export default providers

import fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import * as configs from './config'
import * as lang from './lang'
import database from './database'
import loader from './helpers/loader'
import {ObjectLiteral} from '../types'

class Application {
  pathConfig: string | null  = null
  envPath: string | null = null
  logger = null
  providers: any = null
  /**
   * @type {Express}
   */
  appExpress = express()

  constructor (providers: ObjectLiteral) {
    this.logger = providers.logger()
    this.providers = providers
  }

  async init () {
    await this.initEnv()
    await this.loadConfig()
    await this.loadLang()
    await this.initDatabase()
    await this.providers.load()
    await this.initRequest()
    await this.makeRouter()

    return this
  }

  initEnv () {
    if (!this.envPath) {
      this.envPath = path.resolve(__filename, '../../')
    }
    const env = (process.env.NODE_ENV || 'dev').trim()
    const envPath = path.resolve(this.envPath, '../.env.' + env)

    if (!fs.existsSync(envPath)) {
      throw new Error(`Env(${envPath}) for ${env} is not exist`)
    }

    dotenv.config({ path: envPath })

    return this
  }

  async loadConfig () {
    if (!this.pathConfig) {
      this.pathConfig = path.resolve(__filename, '../../config')
    }
    await configs.init(this.pathConfig)

    return this
  }

  async loadLang () {
    await lang.init(configs.get('app.sys_paths.lang'))

    return this
  }

  async initDatabase () {
    const driver = configs.get('database.driver')
    await database.connect(driver, configs.get(`database.connections.${driver}`, {}))

    return database
  }

  async initRequest () {
    this.appExpress.use(cors({
      credentials: false,
      origin: (origin, cb) => {
        if (origin === undefined || configs.get('app.allowed_origins').indexOf(origin) !== -1) {
          cb(null, true)
        } else {
          cb(new Error('Not allowed by CORS'))
        }
      },
      optionsSuccessStatus: 200
    }))

    this.appExpress.use(express.json())
    const allP: Promise<any>[] = []
    if (this.providers) {
      Object.values(this.providers.instances).forEach((p: any) => {
        if (p.beforeServer) {
          p.beforeServer(this)
          allP.push(p)
        }
      })
      await Promise.all(allP)
    }
  }

  async runServer () {
    const port = configs.get('app.port', 3000)
    const host = configs.get('app.host', 'localhost')
    const server = this.appExpress

    const allP: any[] = []

    if (this.providers) {
      Object.values(this.providers.instances).forEach((p: any) => {
        if (p.afterServer) {
          p.afterServer(this)
          allP.push(p)
        }
      })
      await Promise.all(allP)
    }

    await server.listen(port, host)
  }

  async makeRouter () {
    const resLoader = await loader(configs.get('app.sys_paths.route'))
    console.log(resLoader);
    for (const name in resLoader) {
      const router: any = express.Router()
      for (const route in resLoader[name]) {
        const config = resLoader[name][route]
        const method: string = config.method
        router[method](config.path, ...(config.middleware || []).map((m: { handle: any }) => m.handle), config.handler)
      }
      this.appExpress.use(`/${name}`, router)
    }
    return this
  }
}

export default Application

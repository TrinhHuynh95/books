const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const express = require('express')
const cors = require('cors')

const configs = require('./config')
const lang = require('./lang')
const database = require('./database')
const loader = require('./helpers/loader')

class Application {
  pathConfig = null
  envPath = null
  logger = null
  providers = null
  /**
   * @type {Express}
   */
  appExpress = express()

  constructor (providers) {
    this.logger = providers.logger()
    this.providers = providers
  }

  async init () {
    this.initEnv()
    this.loadConfig()
    this.loadLang()
    await this.initDatabase()
    await this.providers.load()
    await this.initRequest()
    this.makeRouter()

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

  loadConfig () {
    if (!this.pathConfig) {
      this.pathConfig = path.resolve(__filename, '../../config')
    }
    configs.init(this.pathConfig)

    return this
  }

  loadLang () {
    lang.init(configs.get('app.sys_paths.lang'))

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
    const allP = []
    Object.values(this.providers.instances).forEach((p) => {
      if (p.beforeServer) {
        p.beforeServer(this)
        allP.push(p)
      }
    })
    await Promise.all(allP)
  }

  async runServer () {
    const port = configs.get('app.port', 3000)
    const host = configs.get('app.host', 'localhost')
    const server = this.appExpress

    const allP = []

    Object.keys(this.providers.instances).forEach((p) => {
      if (p.afterServer) {
        p.afterServer(this)
        allP.push(p)
      }
    })
    await Promise.all(allP)

    await server.listen(port, host)
    this.logger.log(`server is running at ${port}`)
  }

  makeRouter () {
    const resLoader = loader(configs.get('app.sys_paths.route'))
    for (const name in resLoader) {
      const router = express.Router()
      for (const route in resLoader[name]) {
        const config = resLoader[name][route]
        router[config.method](config.path, ...(config.middleware || []).map(m => m.handle), config.handler)
      }
      this.appExpress.use(`/${name}`, router)
    }
    return this
  }
}

module.exports = Application

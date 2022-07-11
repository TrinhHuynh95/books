import * as path from 'path'
const allowedOrigins = process.env.ALLOWED_ORIGINS || ''
const env = (process.env.NODE_ENV || 'dev').trim()

export default {
  env,
  storage_url: 'http://localhost:4200/assets',
  port: process.env.PORT || 3001,
  host: process.env.HOST || 'localhost',
  allowed_origins: allowedOrigins.split(',').map(url => url.trim()),
  token: {
    secret: '09f26e402586e2faa8da4c98a35f1b20d6b03',
    expiresIn: '1800s'
  },
  sys_paths: {
    repository: path.resolve(__dirname, '../repositories'),
    seed: path.resolve(__dirname, '../db/seeds'),
    migrate: path.resolve(__dirname, '../db/migrations'),
    provider: path.resolve(__dirname, '../providers'),
    route: path.resolve(__dirname, '../routes'),
    lang: path.resolve(__dirname, '../lang'),
    assets: path.resolve(__dirname, '../../public')
  }
}

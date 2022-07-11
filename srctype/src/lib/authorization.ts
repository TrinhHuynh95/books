import jwt from 'jsonwebtoken'
import * as configs from './config'
import UsersModel from '../models/user'
import providers  from './providers'
const repositories = providers.repositories

const Authorization = {
  async init (req: any, res: any, next: any) {
    const token = req.headers?._token
    if (token) {
      jwt.verify(token, configs.get('app.token.secret'), async(err: any, payload: any) => {
        if (err) return next()
        const repo = await repositories('user')
        repo.findById(payload._id).then((res: any) => {
          if (res) {
            req.auth = res
          }
          next()
        })
      })
    } else {
      next()
    }
  },
  async logged (req: any, res: any) {
    if (req.auth) {
      res.status(200).send({
        _token: Authorization.generateAccessToken(req.auth._id),
        profile: req.auth
      })
    } else {
      res.status(401).send('Unauthorized')
    }
  },
  async login (req: any, res: any) {
    const repo = await repositories('user')
    if (req.body.email && req.body.pw) {
      const user = await repo.findOne({ email: req.body.email, pw: req.body.pw })
      if (user) {
        user.protects = ['pw']
        res.status(200).send({
          profile: user,
          _token: Authorization.generateAccessToken(user._id),
          error: ''
        })
      } else {
        res.status(400).send({ profile: null, error: 'Account is not found' })
      }
    } else {
      res.status(400).send({ profile: null, error: 'Account is not found' })
    }
  },
  async register (req: any, res: any) {
    const repo = await repositories('user')
    try {
      const user = new UsersModel({})
      user.email = req.body.email
      user.pw = req.body.pw
      repo.create({ email: req.body.email, pw: req.body.pw }).then((r: any) => {
        user.protects = ['pw']
        res.status(200).send({
          profile: user,
          _token: Authorization.generateAccessToken(r.insertedId),
          error: ''
        })
      })
    } catch (e) {
      res.status(400).send({ profile: null, error: e })
    }
  },
  generateAccessToken (_id: any) {
    return jwt.sign(
      { _id: _id.toString() },
      configs.get('app.token.secret'),
      { expiresIn: configs.get('app.token.expiresIn') })
  }
}

export default Authorization

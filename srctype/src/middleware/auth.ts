import MiddlewareBase from '../lib/middleware_base'

class Auth extends MiddlewareBase {
  handle = (req: any, res: any, next: any) => {
    if (req.auth) {
      if (this._params?.is_admin) {
        if (!req.auth.is_admin) {
          return res.status(403).end()
        }
      }
      return next()
    }

    res.status(401).end()
  }
}

export default Auth

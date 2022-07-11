const MiddlewareBase = require('../lib/middleware_base')

class Auth extends MiddlewareBase {
  handle = (req, res, next) => {
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

module.exports = Auth

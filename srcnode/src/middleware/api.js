const MiddlewareBase = require('../lib/middleware_base')

class Api extends MiddlewareBase {
  handle (req, res, next) {
    return next()

    // res.status(403).end("Error Permission")
  }
}

module.exports = Api

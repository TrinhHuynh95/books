import MiddlewareBase from '../lib/middleware_base'

class Api extends MiddlewareBase {
  handle (req: any, res: any, next: any) {
    return next()

    // res.status(403).end("Error Permission")
  }
}

export default Api

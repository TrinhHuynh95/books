class MiddlewareBase {
  _params
  constructor (params) {
    this._params = params
  }

  // required
  handle () {}
}

module.exports = MiddlewareBase

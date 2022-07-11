const auth = require('../lib/authorization')

class AuthorizationProvider {
  beforeServer = (app) => {
    app.appExpress.use(auth.init)
  }
}

module.exports = AuthorizationProvider

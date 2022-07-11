import auth from '../lib/authorization'

class AuthorizationProvider {
  beforeServer = (app: any) => {
    app.appExpress.use(auth.init)
  }
}

export default AuthorizationProvider

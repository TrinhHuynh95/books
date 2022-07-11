import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger'
import * as configs from '../lib/config'

class SwaggerProvider {
  beforeServer = (app: any) => {
    swaggerDocument.host = configs.get('app.host') + ':' + configs.get('app.port')
    app.appExpress.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }
}


export default SwaggerProvider

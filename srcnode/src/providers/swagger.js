const configs = require('../lib/config')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.js')

class SwaggerProvider {
  beforeServer = (app) => {
    swaggerDocument.host = configs.get('app.host') + ':' + configs.get('app.port')
    app.appExpress.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }
}

module.exports = SwaggerProvider

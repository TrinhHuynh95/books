import KnexSqlBase from './knex_sql.base'

export default class MysqlDriver extends KnexSqlBase{
  clientName = 'mysql2'
}

import {ObjectLiteral} from '../types'

class CommandBase {
  _args: ObjectLiteral = {}
  constructor () {
    this.arguments()
  }

  handle () {
  }

  arguments () {
    for (const arg of process.argv) {
      const pieces = arg.split('=')
      if (pieces.length > 1) {
        const name = pieces[0].replace('=', '')
        this._args[name] = pieces.slice(1).join('=')
      }
    }
  }

  argument (name: string, defaultValue: any) {
    if (!this._args[name]) {
      return defaultValue
    }

    return this._args[name]
  }
}

module.exports = CommandBase

import {ObjectLiteral} from '../../types'

export const get = function (object: ObjectLiteral, path: string | string[], defaultValue: any) {
  if (!path) {
    return object
  }

  const keys = typeof path === 'string' ? path.split('.') : path

  const findFn = function (obj: ObjectLiteral, index: number): any {
    const find = obj[keys[index]] !== undefined ? obj[keys[index]] : defaultValue
    if (index !== keys.length - 1 && typeof find === 'object' && find !== null) {
      return findFn(find, index + 1)
    }

    return find
  }

  return findFn(object, 0)
}

export const set = function (object: ObjectLiteral, path: string | string[], value: any) {
  if (!path) {
    return
  }

  const keys = typeof path === 'string' ? path.split('.') : path

  const findAndSetFn = function (obj: ObjectLiteral, index: number) {
    if (index !== keys.length - 1) {
      if (obj[keys[index]] === undefined && index < keys.length - 1) {
        obj[keys[index]] = {}
      }
      findAndSetFn(obj[keys[index]], index + 1)
    } else {
      obj[keys[index]] = value
    }
  }

  findAndSetFn(object, 0)
}

export const byKey = (array: ObjectLiteral[], keyName: string | number, valueName: string | undefined) => {
  const result: ObjectLiteral = {}
  array.forEach(item => {
    let n: string = item[keyName]
    result[n] = valueName ? item[valueName] : item
  })

  return result
}

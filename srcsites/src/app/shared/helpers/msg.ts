import  {get} from './object'
const msg = {
  validate: {
    required: ':label is required.',
    email: ':label is invalid.',
    password: ':label is invalid.'
  }
}

export default (label: string) => (path: string | string[], defaultValue: any) => {
  const res = get(msg, path, defaultValue)
  if (typeof res === 'string') {
    return res.replace(':label', label)
  }

  for(const k in res) {
    res[k] = res[k].replace(':label', label)
  }
  return res
}

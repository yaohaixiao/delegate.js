import Emitter from './emitter.core'

const delegate = (el) => {
  return new Emitter(el)
}

export default delegate

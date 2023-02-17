import Emitter from './emitter'

const delegate = (el) => {
  return new Emitter(el)
}

export default delegate

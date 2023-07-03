import getListeners from './getListeners'

/**
 * 返回已绑定的事件类型的数组（去除名称重复的事件）
 * ========================================================================
 * @method getTypes
 * @returns {Array}
 */
const getTypes = (el) => {
  const listeners = getListeners(el)
  const types = []

  listeners.forEach((listener) => {
    types.push(listener.type)
  })

  return [...new Set(types)]
}

export default getTypes

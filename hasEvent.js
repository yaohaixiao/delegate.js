import isString from './utils/isString'
import getTypes from './getTypes'

/**
 * 判断是否已经（指定类型的）绑定事件
 * ========================================================================
 * @method hasEvent
 * @param {HTMLElement} el - 要检测是否绑定事件的 DOM 元素
 * @param {String} [type] - （可选）事件名称：
 *                           指定 type，则判断是否绑定 type 类型事件；
 *                           未指定 type，则判断是否绑定任意类型的事件；
 * @returns {Boolean}
 */
const hasEvent = (el, type) => {
  const types = getTypes(el)
  let result

  if (types.length < 1) {
    return false
  }

  result = types.length > 0

  /* istanbul ignore else */
  if (type && isString(type)) {
    result = types.indexOf(type) > -1
  }

  return result
}

export default hasEvent

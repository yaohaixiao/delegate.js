import _typeof from './_typeof'

/**
 * 检测测试数据是否为 Object 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - 要检测的数据
 * @returns {Boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
const isObject = (val) => {
  return (
    (typeof val === 'object' || _typeof(val) === '[object Object]') &&
    !isNull(val)
  )
}

export default isObject

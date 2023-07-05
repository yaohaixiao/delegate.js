/**
 * 判断是否为 String 类型值
 * ========================================================================
 * @method isString
 * @param {*} val - （必须）待检测的字符串
 * @returns {Boolean}
 */
const isString = (val) => {
  return typeof val === 'string'
}

export default isString

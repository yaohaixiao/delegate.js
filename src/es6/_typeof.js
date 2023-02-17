/**
 * 返回检测数据调用 toString() 方法后的字符串，用以判断数据类型。
 * ========================================================================
 * @method _typeof
 * @param val
 * @returns {String}
 * @private
 */
const _typeof = (val) => {
  return Object.prototype.toString.apply(val)
}

export default _typeof

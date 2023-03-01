/**
 * 返回检测数据调用 toString() 方法后的字符串，用以判断数据类型。
 * ========================================================================
 * @method _typeof
 * @param {*} val - （必须）待检测的数据
 * @returns {String}
 *
 * @example
 * _typeof({})
 * // => '[object Object]'
 *
 * _typeof(function(){})
 * // => '[object Function]'
 *
 * _typeof([])
 * // => '[object Array]'
 *
 * _typeof('')
 * // => '[object String]'
 *
 * _typeof(2)
 * // => '[object Number]'
 */
const _typeof = (val) => {
  return Object.prototype.toString.apply(val)
}

export default _typeof

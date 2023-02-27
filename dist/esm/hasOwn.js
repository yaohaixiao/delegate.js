/**
 * 检测对象自身属性中是否具有指定的属性。
 * ========================================================================
 * @method hasOwn
 * @param {Object} obj
 * @param {String} prop
 * @returns {boolean}
 */
const hasOwn = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

export default hasOwn

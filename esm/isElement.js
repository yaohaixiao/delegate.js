/**
 * 检测是否为 HTMLElement 元素节点
 * ========================================================================
 * @method isElement
 * @param {*|HTMLElement} el - （必须）待检测的数据（DOM 元素）
 * @returns {Boolean}
 */
const isElement = (el) => {
  return !!(el && el.nodeName && el.tagName && el.nodeType === 1)
}

export default isElement

/**
 * 检测是否为 HTMLElement 元素节点
 * ========================================================================
 * @method isElement
 * @param {*} el - 要测试的数据
 * @returns {Boolean}
 */
const isElement = (el) => {
  return el && el.nodeName && el.tagName && el.nodeType === 1
}

export default isElement

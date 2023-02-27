/**
 * 获取元素的父节点
 * =============================================================
 * @method getParentOrHost
 * @param {HTMLElement} el
 * @returns {*}
 */
const getParentOrHost = (el) => {
  return el.host && el !== document && el.host.nodeType
    ? el.host
    : el.parentNode
}

export default getParentOrHost

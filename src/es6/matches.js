/**
 * 获取 el 节点下匹配 selector 选择器的 HTMLElement
 * =============================================================
 * @method matches
 * @param {HTMLElement} el
 * @param {String} selector
 * @returns {Boolean|NodeList}
 */
const matches = (el, selector) => {
  if (!selector) {
    return false
  }

  selector[0] === '>' && (selector = selector.substring(1))

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector)
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector)
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector)
      }
    } catch (_) {
      return false
    }
  }

  return false
}

export default matches

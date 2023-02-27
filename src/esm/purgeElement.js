import getListeners from './getListeners'
import off from './off'
import isString from './isString'

/**
 * 销毁 DOM 元素绑定的事件处理器
 * ========================================================================
 * @method purgeElement
 * @param {HTMLElement|String} el the element to purge
 * @param {String} [type]
 * @param {Boolean} [recurse]
 */
const purgeElement = function (el, type = '', recurse = false) {
  const $element = isString(el) ? document.querySelector(el) : el
  const $childNodes = $element.childNodes
  const listeners = getListeners(el, type)
  let i

  if (listeners) {
    for (i = listeners.length - 1; i > -1; i -= 1) {
      let listener = listeners[i]

      off($element, listener.type, listener.fn)
    }
  }

  if (recurse && $element && $childNodes) {
    $childNodes.forEach(($child) => {
      purgeElement($child, type, recurse)
    })
  }
}

export default purgeElement

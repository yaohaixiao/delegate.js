import matches from './matches'
import getParentOrHost from './getParentOrHost'

/**
 * 获取 el 元素父元素最近的包含 selector 选择器的元素
 * =============================================================
 * @param {HTMLElement} el
 * @param {String} selector
 * @param {HTMLElement} [ctx]
 * @param {HTMLElement|Boolean} [includeCTX]
 * @returns {null|*}
 */
const closest = (el, selector, ctx, includeCTX) => {
  if (!el) {
    return null
  }

  ctx = ctx || document

  do {
    if (
      (selector != null &&
        (selector[0] === '>'
          ? el.parentNode === ctx && matches(el, selector)
          : matches(el, selector))) ||
      (includeCTX && el === ctx)
    ) {
      return el
    }

    if (el === ctx) {
      break
    }
    /* jshint boss:true */
  } while ((el = getParentOrHost(el)))
}

export default closest

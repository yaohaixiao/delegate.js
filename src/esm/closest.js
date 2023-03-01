import matches from './matches'
import getParentOrHost from './getParentOrHost'

/**
 * 获取 el 元素父元素最近的包含 selector 选择器的元素
 * =============================================================
 * @method closest
 * @param {HTMLElement} el - （必须）DOM 元素
 * @param {String} selector - （必须）DOM 元素的选择其
 * @param {HTMLElement} [ctx] - （必须）比对的 DOM 元素
 * @param {Boolean} [includeCTX] - （必须）是否包含 context DOM 元素
 * @returns {null|HTMLElement} - 返回最接近的 DOM 元素
 */
const closest = (el, selector, ctx, includeCTX) => {
  const context = ctx || document

  if (!el) {
    return null
  }

  do {
    if (
      (selector != null &&
        (selector[0] === '>'
          ? el.parentNode === context && matches(el, selector)
          : matches(el, selector))) ||
      (includeCTX && el === context)
    ) {
      return el
    }

    if (el === context) {
      break
    }

    /* jshint boss:true */
  } while ((el = getParentOrHost(el)))
}

export default closest

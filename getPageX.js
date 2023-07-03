import getScrollLeft from './getScrollLeft'
import isIE from './isIE'

/**
 * 获取事件触发时的 pageX 值
 * ========================================================================
 * @method getPageX
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageX 值
 */
const getPageX = function (evt) {
  let x = evt.pageX

  /* istanbul ignore else */
  if (!x && 0 !== x) {
    x = evt.clientX || 0

    if (isIE()) {
      x += getScrollLeft()
    }
  }

  return x
}

export default getPageX

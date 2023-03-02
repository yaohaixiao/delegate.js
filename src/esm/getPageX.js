import getScrollLeft from './getScrollLeft'
import isIE from './isIE'

/**
 * 获取事件触发时的 pageX 值
 * ========================================================================
 * @method getPageX
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageX 值
 */
const getPageX = function (evt) {
  let x = evt.pageX

  if (!x && 0 !== x) {
    x = evt.clientX || 0

    if (isIE()) {
      x += getScrollLeft()
    }
  }

  return x
}

export default getPageX

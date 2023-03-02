import getScrollTop from './getScrollTop'
import isIE from './isIE'

/**
 * 获取事件触发时的 pageY 值
 * ========================================================================
 * @method getPageY
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageY 值
 */
const getPageY = function (evt) {
  let y = evt.pageY

  if (!y && 0 !== y) {
    y = evt.clientY || 0

    if (isIE()) {
      y += getScrollTop()
    }
  }

  return y
}

export default getPageY

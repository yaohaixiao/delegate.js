import getScrollTop from './getScrollTop'
import isIE from './isIE'

/**
 * 获取事件触发时的 pageY 值
 * ========================================================================
 * @method getPageY
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageY
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageY 值
 */
const getPageY = function (evt) {
  let y = evt.pageY

  /* istanbul ignore else */
  if (!y && 0 !== y) {
    y = evt.clientY || 0

    if (isIE()) {
      y += getScrollTop()
    }
  }

  return y
}

export default getPageY

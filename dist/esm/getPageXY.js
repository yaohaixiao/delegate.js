import getPageX from './getPageX'
import getPageY from './getPageY'

/**
 * 获取事件触发时的 pageX 和 pageY 数组数据
 * ========================================================================
 * @method getPageXY
 * @param {Event} evt - （必须）Event 对象
 * @return {Array} - 返回事件触发时的数组数据：[pageX, pageY]
 */
const getPageXY = function (evt) {
  return [getPageX(evt), getPageY(evt)]
}

export default getPageXY

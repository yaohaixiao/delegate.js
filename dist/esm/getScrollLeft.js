import getScroll from './getScroll'

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollLeft
 * @return {Number} - 返回 scrollLeft 值
 */
const getScrollLeft = function () {
  return getScroll()[1]
}

export default getScrollLeft

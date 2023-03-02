import getScroll from './getScroll'

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollTop
 * @return {Number} - 返回 getScrollTop 值
 */
const getScrollTop = function () {
  return getScroll()[0]
}

export default getScrollTop

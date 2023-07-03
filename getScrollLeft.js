import getScroll from './getScroll'

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollLeft
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft
 * @return {Number} - 返回 scrollLeft 值
 */
const getScrollLeft = function () {
  return getScroll()[1]
}

export default getScrollLeft

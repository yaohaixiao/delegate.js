/**
 * 获取 scrollTop 和 scrollLeft 数组数据
 * ========================================================================
 * IE 浏览器种计算 pageX 和 pageY，需要包含 scrollTop 和 scrollLeft 的值
 * ========================================================================
 * @method getScroll
 * @return {Array} - 返回滚动信息的数组 [scrollTop, scrollLeft]
 */
const getScroll = function () {
  const $body = document.documentElement || document.body
  let scrollXY = [0, 0]

  if ($body && ($body.scrollTop || $body.scrollLeft)) {
    scrollXY = [$body.scrollTop, $body.scrollLeft]
  }

  return scrollXY
}

export default getScroll

/**
 * 获取 scrollTop 和 scrollLeft 数组数据
 * ========================================================================
 * IE 浏览器种计算 pageX 和 pageY，需要包含 scrollTop 和 scrollLeft 的值
 * ========================================================================
 * @method getScroll
 * @return {Array} - 返回滚动信息的数组 [scrollTop, scrollLeft]
 */
const getScroll = function () {
  const dd = document.documentElement
  const db = document.body

  if (dd && (dd.scrollTop || dd.scrollLeft)) {
    return [dd.scrollTop, dd.scrollLeft]
  } else if (db) {
    return [db.scrollTop, db.scrollLeft]
  } else {
    return [0, 0]
  }
}

export default getScroll

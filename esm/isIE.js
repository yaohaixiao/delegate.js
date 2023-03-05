/**
 * 检测当前浏览器是否为 IE 浏览器
 * ========================================================================
 * IE 浏览器返回 true，其它浏览器返回 false
 * ========================================================================
 * @method isIE
 * @returns {Boolean} - IE 浏览器返回 true，其它浏览器返回 false
 */
const isIE = () => {
  const agent = navigator.userAgent

  return !!agent.match(/Trident/g) || !!agent.match(/MSIE/g)
}

export default isIE

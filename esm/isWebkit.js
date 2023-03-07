/**
 * 检测当前浏览器是否为 Webkit 内核
 * ========================================================================
 * @method isWebkit
 * @returns {Boolean}
 */
const isWebkit = () => {
  const UA = navigator.userAgent

  return (
    /\b(iPad|iPhone|iPod)\b/.test(UA) &&
    /WebKit/.test(UA) &&
    !/Edge/.test(UA) &&
    !window.MSStream
  )
}

export default isWebkit

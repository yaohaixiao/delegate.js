/**
 * 判断是否为 Apple 设备的 Safari 浏览器
 * ========================================================================
 * @method isAppleSafari
 * @returns {Boolean}
 */
const isAppleSafari = () => {
  const UA = navigator.userAgent
  const platforms = /Mac|iPhone|iPod|iPad/i
  const rejected = /Chrome|Android|CriOS|FxiOS|EdgiOS/i
  const expected = /Safari/i

  if (rejected.test(UA)) {
    return false
  }

  return platforms.test(UA) && expected.test(UA)
}

export default isAppleSafari

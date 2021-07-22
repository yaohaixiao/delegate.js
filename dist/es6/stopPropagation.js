/**
 * 终止事件在传播过程的捕获或冒泡
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
const stopPropagation = function (evt) {
  const event = window.event

  if (evt.stopPropagation) {
    evt.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}

export default stopPropagation

/**
 * 阻止事件的默认行为
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
const preventDefault = function (evt) {
  const event = window.event

  if (evt.preventDefault) {
    evt.preventDefault()
  } else {
    event.returnValue = false
  }
}

export default preventDefault

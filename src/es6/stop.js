import preventDefault from './preventDefault'
import stopPropagation from './stopPropagation'

/**
 * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
const stop = function (evt) {
  stopPropagation(evt)
  preventDefault(evt)
}

export default stop

/**
 * 创建自定义事件（CustomerEvent）
 * ========================================================================
 * @method createEvent
 * @param {String} type - （必须）事件类型（名称）
 * @param {Object} [detail] - （可选）传递给自定义事件的数据，默认为 null
 * @param {Boolean} [bubbles] - （可选）是否支持冒泡，默认为 true
 * @param {Boolean} [cancelable] - （可选）是否可以取消，默认为 true
 * @returns {CustomEvent} - CustomerEvent 实例
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const logEvent = createEvent('log', {
 *   name: 'Yao',
 *   hi() {
 *     console.log('hi！！！')
 *   }
 * })
 *
 * const logHandler = function(evt) {
 *   console.log('detail', evt.detail)
 *   console.log('type', evt.type)
 * }
 *
 * $nav.addEventListener('log', logHandler)
 *
 * $nav.dispatchEvent(logEvent)
 */
const createEvent = (
  type,
  detail = null,
  bubbles = true,
  cancelable = true
) => {
  return new CustomEvent(type, {
    detail: detail,
    bubbles: bubbles,
    cancelable: cancelable
  })
}

export default createEvent

import stopEvent from './stopEvent'

/**
 * 阻止监听同一事件的其他事件监听器被调用，并且阻止默认行为和事件冒泡。
 * ========================================================================
 * @method stopImmediate
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation
 * @param {Event} evt - （必须）Event 对象
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('#service')
 * const logHandler = function(evt) {
 *   console.log(evt.target)
 * }
 * const styleHandler = function(evt) {
 *   $nav.classList.add('checked')
 * }
 * const serviceHandler = function(evt) {
 *   alert(evt.target)
 *   stopImmediate(evt)
 * }
 * const removeHandler = function(evt) {
 *   const $target = evt.target
 *
 *   $target.parentNode.removeChild($target)
 * }
 *
 * $nav.addEventListener('click', logHandler)
 * $nav.addEventListener('click', styleHandler)
 * $service.addEventListener('click', serviceHandler)
 * $service.addEventListener('click', removeHandler)
 *
 * $nav.click()
 * // => 触发 logHandler 和 styleHandler
 *
 * $service.click()
 * // => 仅触发 serviceHandler，不会触发 removeHandler
 * // => 并且不会跳转页面，也不会冒泡到 $nav，不会触发 logHandler 和 styleHandler
 */
const stopImmediate = function (evt) {
  stopEvent(evt)
  evt.stopImmediatePropagation()
}

export default stopImmediate

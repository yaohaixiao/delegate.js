/**
 * 阻止事件的默认行为
 * ========================================================================
 * @method preventDefault
 * @param {Event} evt - 事件对象
 *
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('.anchor')
 *
 * on($nav, 'click', function(evt) {
 *   console.log('你点击了导航栏')
 * })
 *
 * on($anchor, 'click', function(evt) {
 *   console.log('tagName', this.tagName)
 *
 *   // 在工作台输出：'a'
 *   // 会触发事件冒泡，输出：'你点击了导航栏'
 *   // 但不会切换到 href 属性的页面地址，阻止了点击链接的默认行为
 *   stopEvent(evt)
 * })
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

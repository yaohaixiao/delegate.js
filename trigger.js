import createEvent from './createEvent'

/**
 * 触发代理自定义事件
 * ========================================================================
 * trigger() 方法也可以用来手动触发内置的事件，例如 click, mouseenter 等事件，通常
 * 使用 trigger() 来手动触发用户自定义事件。
 *
 * 另外，选择器 selector 的匹配使用 document.querySelector() 方法，因此仅事件触发一次。
 * ========================================================================
 * @method trigger
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 元素
 * @param {String} type - （必须）事件类型
 * @param {String} [selector] - （可选）选择器，没有选择器，则直接触发 el 元素上的自定义事件
 *
 * @example
 * const $list = document.querySelector('#list')
 *
 * // 绑定 alert 自定义事件
 * on($list, '.item', 'alert', itemHandler)
 * on($list, '.remove', 'alert', removeHandler)
 *
 * // 触发 $list 下匹配 '.item' 元素手动触发 alert 自定义事件
 * trigger($list, 'alert', '.item')
 *
 * // 可以使用伪类选择器，更精确的匹配元素
 * trigger($list, 'alert', '.item:last-child')
 *
 * // 触发 $list 下匹配 '.remove' 元素手动触发 alert 自定义事件
 * trigger($list, 'alert', '.remove')
 * trigger($list, 'alert', '.remove:nth-child(2)')
 *
 * // 没有选择器，则直接触发 el 元素上的自定义事件
 * trigger($list, 'alert')
 */
const trigger = (el, type, selector) => {
  let $element

  if (!type) {
    return false
  }

  if (selector) {
    $element = el.querySelector(selector)
  } else {
    $element = el
  }

  if (!$element) {
    return false
  }

  $element.dispatchEvent(createEvent(type))
}

export default trigger

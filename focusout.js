import isIE from './utils/isIE'
import on from './on'

/**
 * 绑定 focusout 或者 blur 代理事件
 * ========================================================================
 * @method focusout
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} [once] - （可选）是否仅触发一次
 */
const focusout = function (el, selector, fn, data, context, once = false) {
  const FOCUSOUT = isIE() ? 'focusout' : 'blur'

  on(el, selector, FOCUSOUT, fn, data, context, once)
}

export default focusout

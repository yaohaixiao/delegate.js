import on from './on'

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @method once
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Object} data - 绑定事件的回调函数
 * @param {Object|Boolean} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
const once = (el, selector, type, fn, data, context, capture = false) => {
  on(el, selector, type, fn, data, context, true, capture)
}

export default once

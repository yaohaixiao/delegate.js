import on from './on'

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @method once
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} capture - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
 */
const once = (el, selector, type, fn, data, context, capture = false) => {
  on(el, selector, type, fn, data, context, true, capture)
}

export default once

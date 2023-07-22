import at from './at'

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @method once
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 */
const only = (el,  type, fn, data, context) => {
  at(el, type, fn, data, context, true)
}

export default only

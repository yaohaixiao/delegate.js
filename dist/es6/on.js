import closest from './closest'
import off from './off'

/**
 * 绑定代理事件
 * ========================================================================
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
 * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @returns {Function}
 */
const on = (el, selector, type, callback, useCapture, once, context) => {
  const listener = function (e) {
    const target = e.target || event.srcElement
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector)

    e.delegateTarget = delegateTarget

    if (delegateTarget) {
      if (once === true) {
        off(el, type, listener)
      }
      callback.call(context || el, e)
    }
  }

  // mouseenter 和 mouseleave 不适合使用冒泡
  if (type === 'mouseenter' || type === 'mouseleave') {
    useCapture = true
  }

  callback._delegateListener = callback
  el.addEventListener(type, listener, useCapture || false)

  return callback
}

export default on

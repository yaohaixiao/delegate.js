import closest from './closest'
import off from './off'

/**
 * 绑定代理事件
 * ========================================================================
 * @method on
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Object} [data] - 传递给事件处理器需要使用的数据
 * @param {Object|Boolean} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
const on = (
  el,
  selector,
  type,
  fn,
  data,
  context,
  once = false,
  capture = false
) => {
  const MOUSE_EVENTS = [
    'mouseenter',
    'mouseleave'
  ]

  const listener = function (evt) {
    const target = evt.target
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector)
    let overrideContext = el

    evt.delegateTarget = delegateTarget

    if (context) {
      if (context === true) {
        overrideContext = data
      } else {
        overrideContext = context
      }
    }

    if (delegateTarget) {
      if (once === true) {
        off(el, type, listener)
      }

      fn.call(overrideContext, evt, data)
    }
  }

  if (MOUSE_EVENTS.includes(type)) {
    capture = true
  }

  fn._delegateListener = fn
  el.addEventListener(type, listener, capture)
}

export default on

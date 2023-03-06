import closest from './closest'
import off from './off'

/**
 * 绑定代理事件
 * ========================================================================
 * @method on
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} once - （可选）是否仅触发一次
 */
const on = (el, selector, type, fn, data, context, once = false) => {
  const MOUSE_EVENTS = [
    'blur',
    'focus',
    'load',
    'unload',
    'mouseenter',
    'mouseleave'
  ]
  let capture = false

  const listener = function (evt) {
    const target = evt.target
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector, el)
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

      // 直接过滤了点击对象，会阻止事件冒泡或者捕获
      if (target === delegateTarget) {
        fn.call(overrideContext, evt, data)
      }
    }
  }

  if (MOUSE_EVENTS.includes(type)) {
    capture = true
  }

  if (!el._listeners) {
    el._listeners = []
  }

  // 缓存 el 元素绑定的事件处理器
  el._listeners.push({
    el,
    selector,
    type,
    fn: listener,
    data,
    context,
    capture
  })

  fn._delegateListener = listener

  if (window.addEventListener) {
    el.addEventListener(type, listener, capture)
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, listener)
  }
}

export default on

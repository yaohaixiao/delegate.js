import purgeElement from './purgeElement'
import isFunction from './isFunction'

/**
 * 取消 type 类型的代理事件绑定
 * ========================================================================
 * 如果没有设置 handler，则销毁 this.$el 绑定的所有符合 type 事件类型的事件绑定
 * ========================================================================
 * @method off
 * @param {HTMLElement} el - （必须）取消事件绑定的 DOM 元素
 * @param {String} type - （必须）事件类型
 * @param {Function} [fn] - （可选）事件处理器回调函数
 */
const off = (el, type, fn) => {
  const MOUSE_EVENTS = ['mouseenter', 'mouseleave']
  let capture = false

  // 如果不设置 fn 参数，默认清除 el 元素上绑定的所有事件处理器
  if (!isFunction(fn)) {
    return purgeElement(el, type)
  }

  if (fn._delegateListener) {
    fn = fn._delegateListener
    delete fn._delegateListener
  }

  if (MOUSE_EVENTS.indexOf(type) > -1) {
    capture = true
  }

  if (window.removeEventListener) {
    el.removeEventListener(type, fn, capture)
  } else if (window.detachEvent) {
    el.detachEvent('on' + type, fn)
  }
}

export default off

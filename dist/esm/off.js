import purgeElement from './purgeElement'
import isFunction from './isFunction'

/**
 * 取消事件绑定
 * ========================================================================
 * @method off
 * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
const off = (el, type, fn, capture = false) => {
  const MOUSE_EVENTS = ['mouseenter', 'mouseleave']

  // 如果不设置 fn 参数，默认清除 el 元素上绑定的所有事件处理器
  if (!isFunction(fn)) {
    return purgeElement(el, type)
  }

  if (fn._delegateListener) {
    fn = fn._delegateListener
    delete fn._delegateListener
  }

  if (MOUSE_EVENTS.includes(type)) {
    capture = true
  }

  if (window.removeEventListener) {
    el.removeEventListener(type, fn, capture)
  } else if (window.detachEvent) {
    el.detachEvent("on" + type, fn);
  }
}

export default off

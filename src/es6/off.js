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
  const MOUSE_EVENTS = [
    'mouseenter',
    'mouseleave'
  ]

  if (fn._delegateListener) {
    fn = fn._delegateListener
    delete fn._delegateListener
  }

  if (MOUSE_EVENTS.includes(type)) {
    capture = true
  }

  el.removeEventListener(type, fn, capture)
}

export default off

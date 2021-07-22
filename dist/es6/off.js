/**
 * 取消事件绑定
 * ========================================================================
 * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
const off = (el, type, callback, useCapture) => {
  if (callback._delegateListener) {
    callback = callback._delegateListener
    delete callback._delegateListener
  }

  if (type === 'mouseenter' || type === 'mouseleave') {
    useCapture = true
  }

  el.removeEventListener(type, callback, useCapture || false)
}

export default off

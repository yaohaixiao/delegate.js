/**
 * 获取 DOM 元素绑定的所有事件处理器
 * ========================================================================
 * @methods getListeners
 * @param {HTMLElement} el
 * @param {String} [type]
 * @returns {*|[]}
 */
const getListeners = (el, type) => {
  let listeners = el._listeners

  if (type) {
    listeners = listeners.filter((listener) => {
      return listener.type === type
    })
  }

  return listeners
}

export default getListeners

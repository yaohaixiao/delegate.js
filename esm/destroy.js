import getTypes from './getTypes'
import purgeElement from './purgeElement'

/**
 * 销毁所有已绑定的代理事件
 * ========================================================================
 * @method destroy
 * @param {HTMLElement} el - 需要解除所有事件绑定的 DOM 元素
 * @returns {Emitter} - Emitter 对象
 */
const destroy = (el) => {
  const types = getTypes(el)

  types.forEach((type) => {
    purgeElement(el, type, true)
  })
}

export default destroy

import resolveTextNode from './resolveTextNode'

/**
 * 返回触发（鼠标）事件的 relatedTarget DOM 元素。
 * ========================================================================
 * MouseEvent.relatedTarget 只读属性是鼠标事件的次要目标（如果有）。相关的鼠标事件：
 * mouseenter
 * mouseleave
 * mouseover
 * mouseout
 * dragenter
 * dragleave
 * ========================================================================
 * @method getRelatedTarget
 * @see https://developer.mozilla.org/en-US/docs/web/api/mouseevent/relatedtarget
 * @param {Event} evt - Event 对象
 * @return {HTMLElement} - Event 对象的 relatedTarget DOM 元素
 */
const getRelatedTarget = function (evt) {
  let target = evt.relatedTarget
  const type = evt.type

  if (!target) {
    if (type === 'mouseout') {
      target = evt.toElement
    } else if (type === 'mouseover') {
      target = evt.fromElement
    }
  }

  return resolveTextNode(target)
}

export default getRelatedTarget

'use strict'

/**
 * A polyfill for Element.matches()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (selector) {
      let matches = (this.document || this.ownerDocument).querySelectorAll(selector)
      let i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {
      }
      return i > -1
    }
}

/**
 * 获得与选择器匹配的元素
 * ========================================================================
 * @param {Element} el
 * @param {String} selector
 * @return {Function}
 */
export const closest = (el, selector) => {
  // Node.ELEMENT_NODE	1	An Element node like <p> or <div>.
  // Node.ATTRIBUTE_NODE	2	An Attribute of an Element.
  // Node.TEXT_NODE	3	The actual Text inside an Element or Attr.
  // Node.CDATA_SECTION_NODE	4	A CDATASection, such as <!CDATA[[ … ]]>.
  // Node.PROCESSING_INSTRUCTION_NODE	7	A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.
  // Node.COMMENT_NODE	8	A Comment node, such as <!-- … -->.
  // Node.DOCUMENT_NODE	9	A Document node.
  // Node.DOCUMENT_TYPE_NODE	10	A DocumentType node, such as <!DOCTYPE html>.
  // Node.DOCUMENT_FRAGMENT_NODE	11	A DocumentFragment node.
  const DOCUMENT_NODE_TYPE = 9

  // 忽略 document，因为事件冒泡最终都到了 document
  while (el && el.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof el.matches === 'function' && el.matches(selector)) {
      return el
    }
    el = el.parentNode || el.parentElement
  }
}

/**
 * 绑定代理事件
 * ========================================================================
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
 * @returns {Function}
 */
export const on = (el, selector, type, callback, context, useCapture, once) => {
  const listener = function (e) {
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(el, selector)

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

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 * @returns {Function}
 */
export const once = (el, type, selector, callback, context, useCapture) => {
  return on(el, type, selector, callback, context, useCapture, true)
}

/**
 * 取消事件绑定
 * ========================================================================
 * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
export const off = (el, type, callback, useCapture) => {
  if (callback._delegateListener) {
    callback = callback._delegateListener
    delete callback._delegateListener
  }

  if (type === 'mouseenter' || type === 'mouseleave') {
    useCapture = true
  }

  el.removeEventListener(type, callback, useCapture || false)
}

/**
 * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
export const stop = function (evt) {
  stopPropagation(evt)
  preventDefault(evt)
}

/**
 * 终止事件在传播过程的捕获或冒泡
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
export const stopPropagation = function (evt) {
  let event = window.event

  if (evt.stopPropagation) {
    evt.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}

/**
 * 阻止事件的默认行为
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
export const preventDefault = function (evt) {
  let event = window.event

  if (evt.preventDefault) {
    evt.preventDefault()
  } else {
    event.returnValue = false
  }
}

const delegate = {
  on,
  once,
  off,
  stop,
  stopPropagation,
  preventDefault
}

export default delegate

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
      const matches = (this.document || this.ownerDocument).querySelectorAll(selector)
      let i = matches.length

      while (--i >= 0 && matches.item(i) !== this) {
      }

      return i > -1
    }
}

/**
 * A polyfill for Object.assign()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill
 */
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign (target, varArgs) { // .length of function is 2
      'use strict'
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      const to = Object(target)

      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]

        if (nextSource !== null && nextSource !== undefined) {
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

/**
 * 获得与选择器匹配的元素
 * ========================================================================
 * @param {Element} el
 * @param {String} selector
 * @return {Function}
 */
const closest = (el, selector) => {
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

/**
 * 绑定代理事件
 * ========================================================================
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
 * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @returns {Function}
 */
const on = (el, selector, type, callback, useCapture = false, once = false, context) => {
  const listener = function (e) {
    const target = e.target || event.srcElement
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector)

    e.delegateTarget = delegateTarget

    if (delegateTarget) {
      if (once === true) {
        off(el, type, listener)
      }
      callback.call(context || el, e)
    }
  }

  if(type === 'mouseenter' || type === 'mouseleave') {
    useCapture = true
  }

  callback._delegateListener = callback
  el.addEventListener(type, listener, useCapture)
}

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} callback - 绑定事件的回调函数
 * @param {Boolean} [useCapture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @returns {Function}
 */
const once = (el, type, selector, callback, useCapture = false, context) => {
  return on(el, type, selector, callback, useCapture, true, context)
}

/**
 * 阻止事件的默认行为
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
const preventDefault = function (evt) {
  const event = window.event

  if (evt.preventDefault) {
    evt.preventDefault()
  } else {
    event.returnValue = false
  }
}

/**
 * 终止事件在传播过程的捕获或冒泡
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
const stopPropagation = function (evt) {
  const event = window.event

  if (evt.stopPropagation) {
    evt.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}

/**
 * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
 * ========================================================================
 * @param {Event} evt - 事件对象
 */
const stop = function (evt) {
  stopPropagation(evt)
  preventDefault(evt)
}

class Delegate {
  constructor (el) {
    this._attrs = {
      type: '',
      selector: '',
      handler: null,
      useCapture: false,
      once: false
    }

    if (el.tagName && el.nodeType === 1) {
      this.$el = el
    } else {
      if (typeof el === 'string') {
        this.$el = document.querySelector(el)
      }
    }

    return this
  }

  attr () {
    const attrs = this._attrs
    const args = arguments
    const prop = args[0]

    switch (args.length){
      // 1 个参数
      case 1:
        const type = Object.prototype.toString.apply(prop).toLowerCase()

        switch (type) {
          // 参数是字符串，则返回 _attrs 中对应的属性值
          case '[object string]':
            return attrs[prop]
          // 参数是对象，则扩展 _attrs 属性的多个值
          case '[object object]':
            Object.assign(attrs, prop)
            break
        }

        break
      // 2 个参数
      case 2:
        // 扩展 _attrs 的某个值
        if(typeof prop === 'string') {
          attrs[args] = args[1]
        }

        break
      // 不传参数，返回整个 _attrs 属性
      default:
        return attrs
    }

    return this
  }

  destroy () {
    const attrs = this.attr()

    off(this.$el, attrs.type, attrs.handler, attrs.useCapture)

    return this
  }

  off (el, type, handler, useCapture) {
    off(el, type, handler, useCapture)
    return this
  }

  on (type, selector, handler, useCapture, once) {
    this.attr({
      type: type,
      selector: selector,
      handler: handler,
      useCapture: useCapture,
      once: once,
    })

    on(this.$el, type, selector, handler, useCapture, once, this)

    return this
  }

  once (type, selector, handler, useCapture) {
    this.attr({
      type: type,
      selector: selector,
      handler: handler,
      useCapture: useCapture,
      once: true
    })

    once(this.$el, type, selector, handler, useCapture, this)

    return this
  }

  preventDefault (evt) {
    preventDefault(evt)

    return this
  }

  stop (evt) {
    stop(evt)

    return this
  }

  stopPropagation (evt) {
    stopPropagation(evt)

    return this
  }
}

const delegate = (el) => {
  return new Delegate(el)
}

/**
 * 返回检测数据调用 toString() 方法后的字符串，用以判断数据类型。
 * ========================================================================
 * @method _typeof
 * @param {*} val
 * @returns {String}
 *
 * @example
 * _typeof({})
 * // => '[object Object]'
 *
 * _typeof(function(){})
 * // => '[object Function]'
 *
 * _typeof([])
 * // => '[object Array]'
 *
 * _typeof('')
 * // => '[object String]'
 *
 * _typeof(2)
 * // => '[object Number]'
 */
const _typeof = (val) => {
  return Object.prototype.toString.apply(val)
}

/**
 * 判断是否为 String 类型值
 * ========================================================================
 * @method isString
 * @param {*} val - 待检测的字符串
 * @returns {Boolean}
 */
const isString = (val) => {
  return typeof val === 'string'
}

/**
 * 检测测试数据是否为 Object 类型
 * ========================================================================
 * @method isObject
 * @param {*} val - 要检测的数据
 * @returns {Boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
const isObject = (val) => {
  return (
    (typeof val === 'object' || _typeof(val) === '[object Object]') &&
    !isNull(val)
  )
}

/**
 * 检测测试数据是否为 null
 * ========================================================================
 * @method isNull
 * @param {*} val
 * @returns {boolean}
 */
const isNull = (val) => {
  return val === null
}

/**
 * 检测测试数据是否为 Function 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - 要检测的数据
 * @returns {boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
const isFunction = (val) => {
  return typeof val === 'function' || _typeof(val) === '[object Function]'
}

/**
 * 检测是否为 HTMLElement 元素节点
 * ========================================================================
 * @method isElement
 * @param {*} el - 要测试的数据
 * @returns {Boolean}
 */
const isElement = (el) => {
  return el && el.nodeName && el.tagName && el.nodeType === 1
}

/**
 * 检测对象自身属性中是否具有指定的属性。
 * ========================================================================
 * @method hasOwn
 * @param {Object} obj
 * @param {String} prop
 * @returns {boolean}
 */
const hasOwn = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * 获取元素的父节点
 * =============================================================
 * @method getParentOrHost
 * @param {HTMLElement} el
 * @returns {*}
 */
const getParentOrHost = (el) => {
  return el.host && el !== document && el.host.nodeType
    ? el.host
    : el.parentNode
}

/**
 * 获取 el 节点下匹配 selector 选择器的 HTMLElement
 * =============================================================
 * @method matches
 * @param {HTMLElement} el
 * @param {String} selector
 * @returns {Boolean|NodeList}
 */
const matches = (el, selector) => {
  if (!selector) {
    return false
  }

  selector[0] === '>' && (selector = selector.substring(1))

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector)
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector)
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector)
      }
    } catch (_) {
      return false
    }
  }

  return false
}

/**
 * 获取 el 元素父元素最近的包含 selector 选择器的元素
 * =============================================================
 * @method closest
 * @param {HTMLElement} el
 * @param {String} selector
 * @param {HTMLElement} [ctx]
 * @param {HTMLElement|Boolean} [includeCTX]
 * @returns {null|*}
 */
const closest = (el, selector, ctx, includeCTX) => {
  if (!el) {
    return null
  }

  ctx = ctx || document

  do {
    if (
      (selector != null &&
        (selector[0] === '>'
          ? el.parentNode === ctx && matches(el, selector)
          : matches(el, selector))) ||
      (includeCTX && el === ctx)
    ) {
      return el
    }

    if (el === ctx) {
      break
    }
    /* jshint boss:true */
  } while ((el = getParentOrHost(el)))
}

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

/**
 * 绑定代理事件
 * ========================================================================
 * @method on
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Object} [data] - 传递给事件处理器需要使用的数据
 * @param {Object|Boolean} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
const on = (
  el,
  selector,
  type,
  fn,
  data,
  context,
  once = false,
  capture = false
) => {
  const MOUSE_EVENTS = [
    'mouseenter',
    'mouseleave'
  ]

  const listener = function (evt) {
    const target = evt.target
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector)
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

      fn.call(overrideContext, evt, data)
    }
  }

  if (MOUSE_EVENTS.includes(type)) {
    capture = true
  }

  fn._delegateListener = fn
  el.addEventListener(type, listener, capture)
}

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @method once
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Object} data - 绑定事件的回调函数
 * @param {Object|Boolean} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
const once = (el, selector, type, fn, data, context, capture = false) => {
  on(el, selector, type, fn, data, context, true, capture)
}

/**
 * A polyfill for Object.assign()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill
 */
if (!isFunction(Object.assign)) {
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
            if (hasOwn(nextSource, nextKey)) {
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
 * Emitter 类 - JavaScript 事件代理对象
 * ========================================================================
 * @constructor
 */
class Emitter {
  constructor(el) {
    this._attrs = {
      selector: '',
      type: '',
      handler: null,
      data: null,
      context: null,
      once: false,
      capture: false
    }

    if (isElement(el)) {
      this.$el = el
    } else {
      if (isString(el)) {
        this.$el = document.querySelector(el)
      }
    }

    return this
  }

  attr() {
    const attrs = this._attrs
    const args = arguments
    const prop = args[0]

    switch (args.length) {
      // 1 个参数
      case 1:
        if (isString(prop)) {
          return attrs[prop]
        } else {
          if (isObject(prop)) {
            Object.assign(attrs, prop)
          }
        }

        break
      // 2 个参数
      case 2:
        // 扩展 _attrs 的某个值
        if (isString(prop)) {
          attrs[args] = args[1]
        }

        break
      // 不传参数，返回整个 _attrs 属性
      default:
        return attrs
    }

    return this
  }

  off() {
    const { type, handler, capture } = this.attr()

    off(this.$el, type, handler, capture)
    this.attr({
      selector: '',
      type: '',
      handler: null,
      data: null,
      context: null,
      once: false,
      capture: false
    })

    return this
  }

  on(selector, type, handler, data, context, once = false, capture = false) {
    this.attr({
      selector,
      type,
      handler,
      data,
      context,
      once,
      capture
    })

    on(this.$el, selector, type, handler, data, this, once, capture)

    return this
  }

  once(selector, type, handler, data, context, capture = false) {
    this.attr({
      selector,
      type,
      handler,
      data,
      context,
      once: true,
      capture
    })

    once(this.$el, selector, type, handler, this, true, capture)

    return this
  }

  preventDefault(evt) {
    evt.preventDefault()

    return this
  }

  stopPropagation(evt) {
    evt.stopPropagation()

    return this
  }

  stopEvent(evt) {
    this.preventDefault(evt)
    this.stopPropagation(evt)

    return this
  }
}

const delegate = (el) => {
  return new Emitter(el)
}

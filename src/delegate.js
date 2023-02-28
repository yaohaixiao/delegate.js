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
 * 获取 DOM 元素绑定的所有事件处理器
 * ========================================================================
 * @methods getListeners
 * @param {HTMLElement} el
 * @param {String} type
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

/**
 * 销毁 DOM 元素绑定的事件处理器
 * ========================================================================
 * @method purgeElement
 * @param {HTMLElement|String} el the element to purge
 * @param {String} [type]
 * @param {Boolean} [recurse]
 */
const purgeElement = function (el, type = '', recurse = false) {
  const $element = isString(el) ? document.querySelector(el) : el
  const $childNodes = $element.childNodes
  const listeners = getListeners(el, type)
  let i

  if (listeners) {
    for (i = listeners.length - 1; i > -1; i -= 1) {
      let listener = listeners[i]

      off($element, listener.type, listener.fn)
    }
  }

  if (recurse && $element && $childNodes) {
    $childNodes.forEach(($child) => {
      purgeElement($child, type, recurse)
    })
  }
}

/**
 * 取消事件绑定
 * ========================================================================
 * @method off
 * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
 * @param {String} type - 事件类型
 * @param {Function} [fn] - 绑定事件的回调函数
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
  const MOUSE_EVENTS = ['mouseenter', 'mouseleave']

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

  if (!el._listeners) {
    el._listeners = []
  }

  // 缓存 el 元素绑定的事件处理器
  el._listeners.push({
    el,
    selector,
    type,
    fn: listener,
    data,
    context,
    capture
  })

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
 * 终止事件在传播过程的捕获或冒泡的事件流
 * ========================================================================
 * @method stopPropagation
 * @param {Event} evt - 事件对象
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('.anchor')
 *
 * on($nav, 'click', function(evt) {
 *   console.log('你点击了导航栏')
 * })
 *
 * on($anchor, 'click', function(evt) {
 *   console.log('tagName', this.tagName)
 *
 *   // 工作台输出：'a'
 *   // 然后跳转到 href 的地址
 *   // 但不会触发事件冒泡，输出：'你点击了导航栏'
 *   stopPropagation(evt)
 * })
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
 * 阻止事件的默认行为
 * ========================================================================
 * @method preventDefault
 * @param {Event} evt - 事件对象
 *
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('.anchor')
 *
 * on($nav, 'click', function(evt) {
 *   console.log('你点击了导航栏')
 * })
 *
 * on($anchor, 'click', function(evt) {
 *   console.log('tagName', this.tagName)
 *
 *   // 在工作台输出：'a'
 *   // 会触发事件冒泡，输出：'你点击了导航栏'
 *   // 但不会切换到 href 属性的页面地址，阻止了点击链接的默认行为
 *   stopEvent(evt)
 * })
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
 * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
 * ========================================================================
 * @method stopEvent
 * @param {Event} evt - 事件对象
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('.anchor')
 *
 * on($nav, 'click', function(evt) {
 *   console.log('你点击了导航栏')
 * })
 *
 * on($anchor, 'click', function(evt) {
 *   console.log('tagName', this.tagName)
 *
 *   // 工作台输出：'a'
 *   // 不会触发事件冒泡，输出：'你点击了导航栏'
 *   // 也不会切换到 href 属性的页面，阻止了点击链接的默认行为
 *   stopEvent(evt)
 * })
 */
const stopEvent = function (evt) {
  stopPropagation(evt)
  preventDefault(evt)
}

/**
 * A polyfill for Object.assign()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill
 */
if (!isFunction(Object.assign)) {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    // .length of function is 2
    value: function assign(target) {
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
    if (isElement(el)) {
      this.$el = el
    } else {
      if (isString(el)) {
        this.$el = document.querySelector(el)
      }
    }

    return this
  }

  getListeners(type) {
    return getListeners(this.$el, type)
  }

  purge(type, recurse = false) {
    purgeElement(this.$el, type, recurse)

    return this
  }

  destroy(type) {
    const $el = this.$el

    this.purge(type, true)

    if ($el && $el._listeners) {
      $el._listeners = []
    }

    return this
  }

  off(type, handler, capture) {
    off(this.$el, type, handler, capture)

    return this
  }

  on(selector, type, handler, data, context, once = false, capture = false) {
    on(this.$el, selector, type, handler, data, this, once, capture)

    return this
  }

  once(selector, type, handler, data, context, capture = false) {
    once(this.$el, selector, type, handler, this, true, capture)

    return this
  }
}

/**
 * @method preventDefault
 * @static
 * @param {Event} evt
 * @returns {*}
 */
Emitter.preventDefault = (evt) => {
  preventDefault(evt)
}

/**
 * @method stopPropagation
 * @static
 * @param {Event} evt
 * @returns {*}
 */
Emitter.stopPropagation = (evt) => {
  stopPropagation(evt)
}

/**
 * @method stopEvent
 * @static
 * @param {Event} evt
 * @returns {*}
 */
Emitter.stopEvent = (evt) => {
  stopEvent(evt)
}

/* eslint-disable no-unused-vars */
const delegate = (el) => {
  return new Emitter(el)
}
/* eslint-enable no-unused-vars */

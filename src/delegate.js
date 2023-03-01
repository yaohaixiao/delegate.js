/**
 * 返回检测数据调用 toString() 方法后的字符串，用以判断数据类型。
 * ========================================================================
 * @method _typeof
 * @param {*} val - （必须）待检测的数据
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
 * @param {*} val - （必须）待检测的字符串
 * @returns {Boolean}
 */
const isString = (val) => {
  return typeof val === 'string'
}

/**
 * 检测测试数据是否为 Function 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - （必须）待检测的数据
 * @returns {boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
const isFunction = (val) => {
  return typeof val === 'function' || _typeof(val) === '[object Function]'
}

/**
 * 检测是否为 HTMLElement 元素节点
 * ========================================================================
 * @method isElement
 * @param {*|HTMLElement} el - （必须）待检测的数据（DOM 元素）
 * @returns {Boolean}
 */
const isElement = (el) => {
  return el && el.nodeName && el.tagName && el.nodeType === 1
}

/**
 * 获取 DOM 元素的父节点
 * ========================================================================
 * @method getParentOrHost
 * @param {*|HTMLElement} el - （必须）要获取父节点的 DOM 元素
 * @returns {*|HTMLElement}
 */
const getParentOrHost = (el) => {
  return el.host && el !== document && el.host.nodeType
    ? el.host
    : el.parentNode
}

/**
 * 获取 el 节点下匹配 selector 选择器的 DOM 节点
 * ========================================================================
 * Element.matches() 方法可以用来判断 DOM 元素是否与给定的选择器匹配，事件代理判断是
 * 否触发绑定的代理事件回调函数，关键就是使用 Element.matches() 辨别当前事件触发的目
 * 标 DOM 元素是否为事件代理所期望触发的目标。
 * ========================================================================
 * @method matches
 * @param {HTMLElement} el - （必须）DOM 元素
 * @param {String} selector - （必须）匹配 DOM 元素的选择器
 * @see https://developer.mozilla.org/en-US/docs/web/api/element/matches
 * @returns {Boolean}
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
 * @param {HTMLElement} el - （必须）DOM 元素
 * @param {String} selector - （必须）DOM 元素的选择其
 * @param {HTMLElement} [ctx] - （必须）比对的 DOM 元素
 * @param {Boolean} [includeCTX] - （必须）是否包含 context DOM 元素
 * @returns {null|HTMLElement} - 返回最接近的 DOM 元素
 */
const closest = (el, selector, ctx, includeCTX) => {
  const context = ctx || document

  if (!el) {
    return null
  }

  do {
    if (
      (selector != null &&
        (selector[0] === '>'
          ? el.parentNode === context && matches(el, selector)
          : matches(el, selector))) ||
      (includeCTX && el === context)
    ) {
      return el
    }

    if (el === context) {
      break
    }

    /* jshint boss:true */
  } while ((el = getParentOrHost(el)))
}

/**
 * 获取 DOM 元素绑定的所有事件处理器
 * ========================================================================
 * @methods getListeners
 * @param {HTMLElement} el - （必须）要检测的 DOM 元素
 * @param {String} [type] - （可选）要检测的事件类型
 * @returns {Array} - 已绑定的事件处理器的对象数组
 */
const getListeners = (el, type) => {
  let listeners = el._listeners || []

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
 * 1. 设置了 type 则清除指定类型的事件处理器，没有指定 type 则清除所有已绑定的事件处理器
 * 2. recurse 设置为 true，递归清理子节点绑定的全部事件处理器
 * ========================================================================
 * @method purgeElement
 * @param {HTMLElement|String} el - （必须）需要销毁绑定事件处理器的 DOM 元素或者其选择器
 * @param {String} [type] - （可选）事件类型
 * @param {Boolean} [recurse] - （可选）是否递归销毁 DOM 元素子节点所绑定的所有事件处理器
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
 * 取消 type 类型的代理事件绑定
 * ========================================================================
 * 如果没有设置 handler，则销毁 this.$el 绑定的所有符合 type 事件类型的事件绑定
 * ========================================================================
 * @method off
 * @param {HTMLElement} el - （必须）取消事件绑定的 DOM 元素
 * @param {String} type - （必须）事件类型
 * @param {Function} [fn] - （可选）事件处理器回调函数
 * @param {Boolean} [capture] - （可选）是否启用冒泡事件模型
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
    el.detachEvent('on' + type, fn)
  }
}

/**
 * 绑定代理事件
 * ========================================================================
 * @method on
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} once - （可选）是否仅触发一次
 * @param {Boolean} capture - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
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

      if (target === delegateTarget) {
        fn.call(overrideContext, evt, data)
      }
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

  fn._delegateListener = listener

  if (window.addEventListener) {
    el.addEventListener(type, listener, capture)
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, listener)
  }
}

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @method once
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} capture - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
 */
const once = (el, selector, type, fn, data, context, capture = false) => {
  on(el, selector, type, fn, data, context, true, capture)
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
 * Emitter 类 - JavaScript 事件代理对象
 * ========================================================================
 * @constructor
 */
class Emitter {
  /**
   * Emitter 构造函数
   * ========================================================================
   * @constructor
   * @param {HTMLElement|String} el - （必须）DOM 元素或其选择器
   * @returns {Emitter} - Emitter 对象
   */
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

  /**
   * 获取 DOM 元素（type 事件类型）事件绑定信息
   * ========================================================================
   * 如果设置了事件类型 type， 则返回指定类型的事件绑定信息，否则返回所有事件绑定信息
   * ========================================================================
   * @method getListeners
   * @param {String} [type] - （可选）事件类型
   * @returns {Array} - 已绑定的事件信息
   */
  getListeners(type) {
    return getListeners(this.$el, type)
  }

  /**
   * 销毁（type 类型的）代理事件绑定
   * ========================================================================
   * 1. 设置了事件类型 type，则销毁指定类型的事件绑定，否则清除所有代理事件绑定
   * 2. recurse 设置为 true，递归销毁子节点全部事件绑定
   * ========================================================================
   * @method purge
   * @param {String} [type]  - （可选）事件类型
   * @param {Boolean} [recurse]  - （可选）是否递归销毁子节点所有事件绑定
   * 元素绑定的全部事件处理器
   * @returns {Emitter} - Emitter 对象
   */
  purge(type, recurse = false) {
    purgeElement(this.$el, type, recurse)

    return this
  }

  /**
   * 销毁所有已绑定的代理事件
   * ========================================================================
   * @method destroy
   * @returns {Emitter} - Emitter 对象
   */
  destroy() {
    const $el = this.$el

    this.purge(null, true)

    if ($el && $el._listeners) {
      $el._listeners = []
    }

    return this
  }

  /**
   * 取消 type 类型的代理事件绑定
   * ========================================================================
   * 如果没有设置 handler，则销毁 this.$el 绑定的所有符合 type 事件类型的事件绑定
   * ========================================================================
   * @method off
   * @param {String} type - （必须）事件类型
   * @param {Function} [handler] - （可选）事件处理器回调函数
   * @param {Boolean} [capture] - （可选）是否启用冒泡事件模型
   * @returns {Emitter} - Emitter 对象
   */
  off(type, handler, capture) {
    off(this.$el, type, handler, capture)

    return this
  }

  /**
   * 绑定代理事件
   * ========================================================================
   * @method on
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {String} type - （必须）事件类型
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
   * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
   * @param {Boolean} once - （可选）是否仅触发一次
   * @param {Boolean} capture - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
   * @returns {Emitter} - Emitter 对象
   */
  on(selector, type, handler, data, context, once = false, capture = false) {
    on(this.$el, selector, type, handler, data, this, once, capture)

    return this
  }

  /**
   * 绑定仅触发一次的代理事件
   * ========================================================================
   * @method once
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {String} type - （必须）事件类型
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
   * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
   * @param {Boolean} capture - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
   * @returns {Emitter} - Emitter 对象
   */
  once(selector, type, handler, data, context, capture = false) {
    once(this.$el, selector, type, handler, this, true, capture)

    return this
  }

  /**
   * 阻止触发绑定事件 DOM 元素的默认行为
   * ========================================================================
   * @method preventDefault
   * @param {Event} evt - （必须）Event 对象
   * @returns {Emitter}  - Emitter 对象
   * @see preventDefault
   */
  preventDefault(evt) {
    preventDefault(evt)

    return this
  }

  /**
   * 终止事件在传播过程的捕获或冒泡的事件流
   * ========================================================================
   * @method stopPropagation
   * @param {Event} evt - （必须）Event 对象
   * @returns {Emitter}  - Emitter 对象
   * @see stopPropagation
   */
  stopPropagation(evt) {
    stopPropagation(evt)

    return this
  }

  /**
   * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
   * ========================================================================
   * @method stopEvent
   * @param {Event} evt - （必须）Event 对象
   * @returns {Emitter}  - Emitter 对象
   * @see stopEvent
   */
  stopEvent(evt) {
    stopEvent(evt)

    return this
  }
}

/* eslint-disable no-unused-vars */
const delegate = (el) => {
  return new Emitter(el)
}
/* eslint-enable no-unused-vars */

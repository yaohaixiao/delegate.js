const CAPTURE_EVENTS = [
  'focusout',
  'blur',
  'focusin',
  'focus',
  'load',
  'unload',
  'mouseenter',
  'mouseleave'
]

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
  return !!(el && el.nodeName && el.tagName && el.nodeType === 1)
}

/**
 * 检测当前浏览器是否为 IE 浏览器
 * ========================================================================
 * IE 浏览器返回 true，其它浏览器返回 false
 * ========================================================================
 * @method isIE
 * @returns {Boolean} - IE 浏览器返回 true，其它浏览器返回 false
 */
const isIE = () => {
  const agent = navigator.userAgent

  return !!agent.match(/Trident/g) || !!agent.match(/MSIE/g)
}

/**
 * 判断是否为 Apple 设备的 Safari 浏览器
 * ========================================================================
 * @method isAppleSafari
 * @returns {Boolean}
 */
const isAppleSafari = () => {
  const UA = navigator.userAgent
  const platforms = /Mac|iPhone|iPod|iPad/i
  const rejected = /Chrome|Android|CriOS|FxiOS|EdgiOS/i
  const expected = /Safari/i

  if (rejected.test(UA)) {
    return false
  }

  return platforms.test(UA) && expected.test(UA)
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
const matches = (el, selector = '') => {
  const sel = selector.replace(/^>/i, '')

  if (!selector || !sel || !el) {
    return false
  }

  /* istanbul ignore else */
  if (el.matches) {
    return el.matches(sel)
  } else if (el.msMatchesSelector) {
    return el.msMatchesSelector(sel)
  } else {
    return false
  }
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
    /* istanbul ignore else */
    if (
      (selector != null &&
        (selector[0] === '>'
          ? el.parentNode === context && matches(el, selector)
          : matches(el, selector))) ||
      (includeCTX && el === context)
    ) {
      return el
    }

    /* istanbul ignore else */
    if (el === context) {
      break
    }

    /* jshint boss:true */
  } while ((el = getParentOrHost(el)))
}

/**
 * 在某些情况下，某些浏览器（例如：Safari 浏览器）会返回实际的目标元素内部的文本节点。
 * resolveTextNode() 方法则会返回实际的目标节点，以保证浏览器行为一致。
 * ========================================================================
 * @method resolveTextNode
 * @param {HTMLElement} el - 要解析的节点
 * @return {HTMLElement} - 实际的目标 DOM 节点
 */
const resolveTextNode = function (el) {
  if (el && el.nodeType === 3) {
    return el.parentNode
  }

  return el
}

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

/**
 * 返回触发事件的 target DOM 元素
 * ========================================================================
 * @method getTarget
 * @param {Event} evt - Event 对象
 * @return {HTMLElement} - Event 对象的 target DOM 元素
 */
const getTarget = function (evt) {
  const target = evt.target

  return resolveTextNode(target)
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

  if (isString(type) && type) {
    listeners = listeners.filter((listener) => {
      return listener.type === type
    })
  }

  return listeners
}

/**
 * 获取 scrollTop 和 scrollLeft 数组数据
 * ========================================================================
 * IE 浏览器种计算 pageX 和 pageY，需要包含 scrollTop 和 scrollLeft 的值
 * ========================================================================
 * @method getScroll
 * @return {Array} - 返回滚动信息的数组 [scrollTop, scrollLeft]
 */
const getScroll = function () {
  const $body = document.documentElement || document.body
  let scrollXY = [0, 0]

  if ($body && ($body.scrollTop || $body.scrollLeft)) {
    scrollXY = [$body.scrollTop, $body.scrollLeft]
  }

  return scrollXY
}

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollTop
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop
 * @return {Number} - 返回 getScrollTop 值
 */
const getScrollTop = function () {
  return getScroll()[0]
}

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollLeft
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft
 * @return {Number} - 返回 scrollLeft 值
 */
const getScrollLeft = function () {
  return getScroll()[1]
}

/**
 * 获取事件触发时的 pageX 值
 * ========================================================================
 * @method getPageX
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageX 值
 */
const getPageX = function (evt) {
  let x = evt.pageX

  /* istanbul ignore else */
  if (!x && 0 !== x) {
    x = evt.clientX || 0

    if (isIE()) {
      x += getScrollLeft()
    }
  }

  return x
}

/**
 * 获取事件触发时的 pageY 值
 * ========================================================================
 * @method getPageY
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageY
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageY 值
 */
const getPageY = function (evt) {
  let y = evt.pageY

  /* istanbul ignore else */
  if (!y && 0 !== y) {
    y = evt.clientY || 0

    if (isIE()) {
      y += getScrollTop()
    }
  }

  return y
}

/**
 * 获取事件触发时的 pageX 和 pageY 数组数据
 * ========================================================================
 * @method getPageXY
 * @param {Event} evt - （必须）Event 对象
 * @return {Array} - 返回事件触发时的数组数据：[pageX, pageY]
 */
const getPageXY = function (evt) {
  return [getPageX(evt), getPageY(evt)]
}

/**
 * 返回触发事件的 charCode
 * ========================================================================
 * @method getCharCode
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/charCode
 * @param {Event} evt - Event 对象
 * @return {Number} - 返回事件的 charCode
 */
const getCharCode = function (evt) {
  let code = evt.keyCode || evt.charCode
  // keycodes for webkit/safari
  const webkitKeymap = {
    63232: 38, // up
    63233: 40, // down
    63234: 37, // left
    63235: 39, // right
    63276: 33, // page up
    63277: 34, // page down
    25: 9 // The SHIFT-TAB (Safari provides a different key code in
    // this case, even though the shiftKey modifier is set)
  }

  // webkit key normalization
  if (isAppleSafari() && code in webkitKeymap) {
    code = webkitKeymap[code]
  }

  return code
}

/**
 * 销毁 DOM 元素绑定的事件处理器
 * ========================================================================
 * 1. 设置了 type 则清除指定类型的事件处理器，没有指定 type 则清除所有已绑定的事件处理器
 * 2. recurse 设置为 true，递归清理子节点绑定的全部事件处理器
 * ========================================================================
 * @method purgeElement
 * @param {HTMLElement|String} el - （必须）需要销毁绑定事件处理器的 DOM 元素或者其选择器
 * @param {String|Boolean} [type] - （可选）事件类型
 * @param {Boolean} [recurse] - （可选）是否递归销毁 DOM 元素子节点所绑定的所有事件处理器
 */
const purgeElement = function (el, type = '', recurse = false) {
  const $element = isString(el) ? document.querySelector(el) : el
  const $childNodes = $element.childNodes
  const listeners = getListeners($element, type)

  listeners.forEach((listener) => {
    off($element, listener.type, listener.fn)
  })

  if (
    (recurse || type === true || arguments.length === 1) &&
    $element &&
    $childNodes
  ) {
    $childNodes.forEach(($childNode) => {
      purgeElement($childNode, type, recurse)
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
 */
const off = (el, type, fn) => {
  const listeners = el._listeners
  let capture = false
  let index = -1

  // 如果不设置 fn 参数，默认清除 el 元素上绑定的所有事件处理器
  if (!isFunction(fn)) {
    return purgeElement(el, type)
  }

  /* istanbul ignore else */
  if (fn._delegateListener) {
    fn = fn._delegateListener
    delete fn._delegateListener
  }

  // 移除缓存的 _listeners 数据
  listeners.forEach((listener, i) => {
    if (listener.type === type) {
      index = i

      if (fn && listener.fn === fn) {
        index = i
      }
    }
  })

  /* istanbul ignore else */
  if (index > -1) {
    el._listeners.splice(index, 1)
  }

  if (CAPTURE_EVENTS.indexOf(type) > -1) {
    capture = true
  }

  /* istanbul ignore else */
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
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {String} type - （必须）事件类型
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} data - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} context - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} once - （可选）是否仅触发一次
 */
const on = (el, selector, type, fn, data, context, once = false) => {
  let capture = false

  const listener = function (evt) {
    const target = getTarget(evt)
    // 通过 Element.matches 方法获得点击的目标元素
    const delegateTarget = closest(target, selector, el)
    let overrideContext = context || el

    evt.delegateTarget = delegateTarget

    if (context === true) {
      overrideContext = data
    }

    /* istanbul ignore else */
    if (delegateTarget) {
      /* istanbul ignore else */
      if (once === true) {
        off(el, type, listener)
      }

      // 直接过滤了点击对象，会阻止事件冒泡或者捕获
      /* istanbul ignore else */
      if (target === delegateTarget) {
        fn.call(overrideContext, evt, data)
      }
    }
  }

  if (CAPTURE_EVENTS.includes(type)) {
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

  /* istanbul ignore else */
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
 */
const once = (el, selector, type, fn, data, context) => {
  on(el, selector, type, fn, data, context, true)
}

/**
 * 绑定 focusin 或者 focus 代理事件
 * ========================================================================
 * @method focusin
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/focus_event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} [once] - （可选）是否仅触发一次
 */
const focusin = function (el, selector, fn, data, context, once = false) {
  const FOCUSIN = isIE() ? 'focusin' : 'focus'

  return on(el, selector, FOCUSIN, fn, data, context, once)
}

/**
 * 绑定 focusout 或者 blur 代理事件
 * ========================================================================
 * @method focusout
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 节点
 * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
 * @param {Function} fn - （必须） 事件处理器回调函数
 * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
 * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
 * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
 * @param {Boolean} [once] - （可选）是否仅触发一次
 */
const focusout = function (el, selector, fn, data, context, once = false) {
  const FOCUSOUT = isIE() ? 'focusout' : 'blur'

  on(el, selector, FOCUSOUT, fn, data, context, once)
}

/**
 * 触发代理自定义事件
 * ========================================================================
 * trigger() 方法也可以用来手动触发内置的事件，例如 click, mouseenter 等事件，通常
 * 使用 trigger() 来手动触发用户自定义事件。
 *
 * 另外，选择器 selector 的匹配使用 document.querySelector() 方法，因此仅事件触发一次。
 * ========================================================================
 * @method trigger
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent
 * @param {HTMLElement} el - （必须）绑定代理事件的 DOM 元素
 * @param {String} type - （必须）事件类型
 * @param {String} selector - （必须）选择器
 *
 * @example
 * const $list = document.querySelector('#list')
 * // 绑定 alert 自定义事件
 * on($list, '.item', 'alert', itemHandler)
 * on($list, '.remove', 'alert', removeHandler)
 *
 * // 触发 $list 下匹配 '.item' 元素手动触发 alert 自定义事件
 * trigger('alert', '.item')
 *
 * // 可以使用伪类选择器，更精确的匹配元素
 * trigger('alert', '.item:last-child')
 *
 * // 触发 $list 下匹配 '.remove' 元素手动触发 alert 自定义事件
 * trigger('alert', '.remove')
 * trigger('alert', '.remove:nth-child(2)')
 */
const trigger = (el, type, selector) => {
  let $child

  if (!type || !selector) {
    return false
  }

  $child = el.querySelector(selector)

  if (!$child) {
    return false
  }

  $child.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      cancelable: true
    })
  )
}

/**
 * 阻止事件的默认行为
 * ========================================================================
 * @method preventDefault
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault
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
 *   // 在工作台输出：'a'
 *   // 会触发事件冒泡，输出：'你点击了导航栏'
 *   // 但不会切换到 href 属性的页面地址，阻止了点击链接的默认行为
 *   stopEvent(evt)
 * })
 */
const preventDefault = function (evt) {
  evt.preventDefault()
}

/**
 * 终止事件在传播过程的捕获或冒泡的事件流
 * ========================================================================
 * @method stopPropagation
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation
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
  evt.stopPropagation()
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
 * @class
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
   * 返回已绑定的事件类型的数组（去除名称重复的事件）
   * ========================================================================
   * @method getTypes
   * @returns {Array}
   */
  getTypes() {
    const listeners = this.getListeners()
    const types = []

    listeners.forEach((listener) => {
      types.push(listener.type)
    })

    return [...new Set(types)]
  }

  /**
   * 判断是否已经（指定类型的）绑定事件
   * ========================================================================
   * @method hasEvent
   * @param {String} [type] - （可选）事件名称：
   *                           指定 type，则判断是否绑定 type 类型事件；
   *                           未指定 type，则判断是否绑定任意类型的事件；
   * @returns {Boolean}
   */
  hasEvent(type) {
    return this.getTypes().indexOf(type) > -1
  }

  /**
   * 获取事件触发时的 pageX 值
   * ========================================================================
   * @method getPageX
   * @see getPageX
   * @param {Event} evt - （必须）Event 对象
   * @return {Number} - 返回事件触发时的 pageX 值
   */
  getPageX(evt) {
    return getPageX(evt)
  }

  /**
   * 获取事件触发时的 pageY 值
   * ========================================================================
   * @method getPageY
   * @see getPageY
   * @param {Event} evt - （必须）Event 对象
   * @return {Number} - 返回事件触发时的 pageY 值
   */
  getPageY(evt) {
    return getPageY(evt)
  }

  /**
   * 获取事件触发时的 pageX 和 pageY 数组数据
   * ========================================================================
   * @method getPageXY
   * @see getPageXY
   * @param {Event} evt - （必须）Event 对象
   * @return {Array} - 返回事件触发时的数组数据：[pageX, pageY]
   */
  getPageXY(evt) {
    return getPageXY(evt)
  }

  /**
   * 返回触发事件的 charCode
   * ========================================================================
   * @method getCharCode
   * @see getCharCode
   * @param {Event} evt - （必须）Event 对象
   * @return {Number} - 返回事件的 charCode
   */
  getCharCode(evt) {
    return getCharCode(evt)
  }

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
  getRelatedTarget(evt) {
    return getRelatedTarget(evt)
  }

  /**
   * 返回触发事件的 target DOM 元素
   * ========================================================================
   * @method getTarget
   * @param {Event} evt - Event 对象
   * @return {HTMLElement} - Event 对象的 target DOM 元素
   */
  getTarget(evt) {
    return getTarget(evt)
  }

  /**
   * 销毁（type 类型的）代理事件绑定
   * ========================================================================
   * 1. 设置了事件类型 type，则销毁指定类型的事件绑定，否则清除所有代理事件绑定
   * 2. recurse 设置为 true，递归销毁子节点全部事件绑定
   * ========================================================================
   * @method purge
   * @param {String} type  - （可选）事件类型
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
    purgeElement(this.$el, true)

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
   * @returns {Emitter} - Emitter 对象
   */
  off(type, handler) {
    off(this.$el, type, handler)

    return this
  }

  /**
   * 绑定代理事件
   * ========================================================================
   * @method on
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {String} type - （必须）事件类型
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向：
   * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象；
   * 如未指定 context，则事件处理器回调函数的 this 上下文指向为 Emitter 对象；
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  on(selector, type, handler, data, context, once = false) {
    on(this.$el, selector, type, handler, data, context || this, once)

    return this
  }

  /**
   * 绑定仅触发一次的代理事件
   * ========================================================================
   * @method once
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {String} type - （必须）事件类型
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @returns {Emitter} - Emitter 对象
   */
  once(selector, type, handler, data, context) {
    once(this.$el, selector, type, handler, data, context)

    return this
  }

  /**
   * 绑定 click 代理事件
   * ========================================================================
   * @method click
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  click(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'click', handler, data, context, once)

    return this
  }

  /**
   * 绑定 dbclick 代理事件
   * ========================================================================
   * @method dbclick
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/dblclick_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  dbclick(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'dbclick', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mouseenter 代理事件
   * ========================================================================
   * @method mouseenter
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mouseenter(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mouseenter', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mouseleave 代理事件
   * ========================================================================
   * @method mouseleave
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mouseleave(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mouseleave', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mousedown 代理事件
   * ========================================================================
   * @method mousedown
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mousedown(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mousedown', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mouseup 代理事件
   * ========================================================================
   * @method mouseup
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mouseup(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mouseup', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mouseover 代理事件
   * ========================================================================
   * @method mouseover
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mouseover(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mouseover', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mousemove 代理事件
   * ========================================================================
   * @method mousemove
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mousemove(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mousemove', handler, data, context, once)

    return this
  }

  /**
   * 绑定 mouseout 代理事件
   * ========================================================================
   * @method mouseout
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  mouseout(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'mouseout', handler, data, context, once)

    return this
  }

  /**
   * 绑定 drag 代理事件
   * ========================================================================
   * @method drag
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  drag(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'drag', handler, data, context, once)

    return this
  }

  /**
   * 绑定 dragend 代理事件
   * ========================================================================
   * @method dragend
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragend_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  dragend(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'dragend', handler, data, context, once)

    return this
  }

  /**
   * 绑定 dragenter 代理事件
   * ========================================================================
   * @method dragenter
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  dragenter(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'dragenter', handler, data, context, once)

    return this
  }

  /**
   * 绑定 dragleave 代理事件
   * ========================================================================
   * @method dragleave
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  dragleave(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'dragleave', handler, data, context, once)

    return this
  }

  /**
   * 绑定 dragover 代理事件
   * ========================================================================
   * @method dragover
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  dragover(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'dragover', handler, data, context, once)

    return this
  }

  /**
   * 绑定 dragstart 代理事件
   * ========================================================================
   * @method dragstart
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  dragstart(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'dragstart', handler, data, context, once)

    return this
  }

  /**
   * 绑定 drop 代理事件
   * ========================================================================
   * @method drop
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  drop(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'drop', handler, data, context, once)

    return this
  }

  /**
   * 绑定 wheel 代理事件
   * ========================================================================
   * @method wheel
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  wheel(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'wheel', handler, data, context, once)

    return this
  }

  /**
   * 绑定 contextmenu 代理事件
   * ========================================================================
   * @method contextmenu
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  contextmenu(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'contextmenu', handler, data, context, once)

    return this
  }

  /**
   * 绑定 focusin 或者 focus 代理事件
   * ========================================================================
   * @method focusin
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/focus_event
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  focusin(selector, handler, data, context, once = false) {
    focusin(this.$el, selector, handler, data, context, once)

    return this
  }

  /**
   * 绑定 focusout 或者 blur 代理事件
   * ========================================================================
   * @method focusout
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  focusout(selector, handler, data, context, once = false) {
    focusout(this.$el, selector, handler, data, context, once)

    return this
  }

  /**
   * 绑定 change 代理事件
   * ========================================================================
   * @method change
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/change_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  change(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'change', handler, data, context, once)

    return this
  }

  /**
   * 绑定 input 代理事件
   * ========================================================================
   * @method input
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/input_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  input(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'input', handler, data, context, once)

    return this
  }

  /**
   * 绑定 compositionstart 代理事件
   * ========================================================================
   * @method compositionstart
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  compositionstart(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'compositionstart', handler, data, context, once)

    return this
  }

  /**
   * 绑定 compositionupdate 代理事件
   * ========================================================================
   * @method compositionupdate
   * @see  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionupdate_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  compositionupdate(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'compositionupdate', handler, data, context, once)

    return this
  }

  /**
   * 绑定 compositionend 代理事件
   * ========================================================================
   * @method compositionend
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionend_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  compositionend(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'compositionend', handler, data, context, once)

    return this
  }

  /**
   * 绑定 paste 代理事件
   * ========================================================================
   * @method paste
   * @see
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  paste(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'paste', handler, data, context, once)

    return this
  }

  /**
   * 绑定 copy 代理事件
   * ========================================================================
   * @method copy
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/copy_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  copy(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'copy', handler, data, context, once)

    return this
  }

  /**
   * 绑定 cut 代理事件
   * ========================================================================
   * @method cut
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/cut_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  cut(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'cut', handler, data, context, once)

    return this
  }

  /**
   * 绑定 keydown 代理事件
   * ========================================================================
   * @method keydown
   *
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  keydown(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'keydown', handler, data, context, once)

    return this
  }

  /**
   * 绑定 keyup 代理事件
   * ========================================================================
   * @method keyup
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  keyup(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'keyup', handler, data, context, once)

    return this
  }

  /**
   * 绑定 error 代理事件
   * ========================================================================
   * @method error
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/error_event
   * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
   * @param {Function} handler - （必须） 事件处理器回调函数
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @returns {Emitter} - Emitter 对象
   */
  error(selector, handler, data, context, once = false) {
    on(this.$el, selector, 'error', handler, data, context, once)

    return this
  }

  /**
   * 触发代理自定义事件
   * ========================================================================
   * @method trigger
   * @param {String} type - （必须）事件类型
   * @param {String} selector - （必须）选择器
   * @returns {Emitter} - Emitter 对象
   */
  trigger(type, selector) {
    trigger(this.$el, type, selector)

    return this
  }

  /**
   * 阻止事件的默认行为
   * ========================================================================
   * @method preventDefault
   * @see preventDefault
   * @param {Event} evt - （必须）Event 对象
   * @returns {Emitter}  - Emitter 对象
   */
  preventDefault(evt) {
    preventDefault(evt)

    return this
  }

  /**
   * 终止事件在传播过程的捕获或冒泡的事件流
   * ========================================================================
   * @method stopPropagation
   * @see stopPropagation
   * @param {Event} evt - （必须）Event 对象
   * @returns {Emitter}  - Emitter 对象
   */
  stopPropagation(evt) {
    stopPropagation(evt)

    return this
  }

  /**
   * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
   * ========================================================================
   * @method stopEvent
   * @see stopEvent
   * @param {Event} evt - （必须）Event 对象
   * @returns {Emitter}  - Emitter 对象
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

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.delegate = factory()
  }
})(this, function () {
  'use strict'

  function _typeof2(obj) {
    '@babel/helpers - typeof'
    return (
      (_typeof2 =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (obj) {
              return typeof obj
            }
          : function (obj) {
              return obj &&
                'function' == typeof Symbol &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }),
      _typeof2(obj)
    )
  }
  var _this = void 0
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    Object.defineProperty(Constructor, 'prototype', { writable: false })
    return Constructor
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, 'string')
    return _typeof2(key) === 'symbol' ? key : String(key)
  }
  function _toPrimitive(input, hint) {
    if (_typeof2(input) !== 'object' || input === null) return input
    var prim = input[Symbol.toPrimitive]
    if (prim !== undefined) {
      var res = prim.call(input, hint || 'default')
      if (_typeof2(res) !== 'object') return res
      throw new TypeError('@@toPrimitive must return a primitive value.')
    }
    return (hint === 'string' ? String : Number)(input)
  }
  function _toConsumableArray(arr) {
    return (
      _arrayWithoutHoles(arr) ||
      _iterableToArray(arr) ||
      _unsupportedIterableToArray(arr) ||
      _nonIterableSpread()
    )
  }
  function _nonIterableSpread() {
    throw new TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return
    if (typeof o === 'string') return _arrayLikeToArray(o, minLen)
    var n = Object.prototype.toString.call(o).slice(8, -1)
    if (n === 'Object' && o.constructor) n = o.constructor.name
    if (n === 'Map' || n === 'Set') return Array.from(o)
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen)
  }
  function _iterableToArray(iter) {
    if (
      (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
      iter['@@iterator'] != null
    )
      return Array.from(iter)
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr)
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]
    return arr2
  }
  var CAPTURE_EVENTS = [
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
  var _typeof = function _typeof(val) {
    return Object.prototype.toString.apply(val)
  }

  /**
   * 判断是否为 String 类型值
   * ========================================================================
   * @method isString
   * @param {*} val - （必须）待检测的字符串
   * @returns {Boolean}
   */
  var isString = function isString(val) {
    return typeof val === 'string'
  }

  /**
   * 检测测试数据是否为 Function 类型
   * ========================================================================
   * @method isFunction
   * @param {*} val - （必须）待检测的数据
   * @returns {boolean} 'val' 是 Function 类型返回 true，否则返回 false
   */
  var isFunction = function isFunction(val) {
    return typeof val === 'function' || _typeof(val) === '[object Function]'
  }

  /**
   * 检测是否为 HTMLElement 元素节点
   * ========================================================================
   * @method isElement
   * @param {*|HTMLElement} el - （必须）待检测的数据（DOM 元素）
   * @returns {Boolean}
   */
  var isElement = function isElement(el) {
    return !!(el && el.nodeName && el.tagName && el.nodeType === 1)
  }

  /**
   * 获取 DOM 元素的父节点
   * ========================================================================
   * @method getParentOrHost
   * @param {*|HTMLElement} el - （必须）要获取父节点的 DOM 元素
   * @returns {*|HTMLElement}
   */
  var getParentOrHost = function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType
      ? el.host
      : el.parentNode
  }

  /**
   * 获取 options 节点下匹配 selector 选择器的 DOM 节点
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
  var matches = function matches(el) {
    var selector =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''
    var sel = selector.replace(/^>/i, '')
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
   * 获取 options 元素父元素最近的包含 selector 选择器的元素
   * =============================================================
   * @method closest
   * @param {HTMLElement} el - （必须）DOM 元素
   * @param {String} selector - （必须）DOM 元素的选择其
   * @param {HTMLElement} [ctx] - （必须）比对的 DOM 元素
   * @param {Boolean} [includeCTX] - （必须）是否包含 context DOM 元素
   * @returns {null|HTMLElement} - 返回最接近的 DOM 元素
   */
  var closest = function closest(el, selector, ctx, includeCTX) {
    var context = ctx || document
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
  var resolveTextNode = function resolveTextNode(el) {
    if (el && el.nodeType === 3) {
      return el.parentNode
    }
    return el
  }

  /**
   * 返回触发事件的 target DOM 元素
   * ========================================================================
   * @method getTarget
   * @param {Event} evt - Event 对象
   * @return {HTMLElement} - Event 对象的 target DOM 元素
   */
  var getTarget = function getTarget(evt) {
    var target = evt.target
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
  var getListeners = function getListeners(el, type) {
    var listeners = el._listeners || []
    if (isString(type) && type) {
      listeners = listeners.filter(function (listener) {
        return listener.type === type
      })
    }
    return listeners
  }

  /**
   * 返回已绑定的事件类型的数组（去除名称重复的事件）
   * ========================================================================
   * @method getTypes
   * @returns {Array}
   */
  var getTypes = function getTypes(el) {
    var listeners = getListeners(el)
    var types = []
    listeners.forEach(function (listener) {
      types.push(listener.type)
    })
    return _toConsumableArray(new Set(types))
  }

  /**
   * 销毁 DOM 元素绑定的事件处理器
   * ========================================================================
   * 1. 设置了 type 则清除指定类型的事件处理器，没有指定 type 则清除所有已绑定的事件处理器
   * 2. recurse 设置为 true，递归清理子节点绑定的全部事件处理器
   * ========================================================================
   * @method purgeElement
   * @param {HTMLElement|String} el - （必须）需要销毁绑定事件处理器的 DOM 元素或者其选择器
   * @param {String|Boolean} type - （必须）事件类型
   * @param {Boolean} [recurse] - （可选）是否递归销毁 DOM 元素子节点所绑定的所有事件处理器
   */
  var purgeElement = function purgeElement(el, type) {
    var recurse =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false
    var $element = isString(el) ? document.querySelector(el) : el
    var $children = $element.childNodes
    var listeners = getListeners($element, type)
    listeners.forEach(function (listener) {
      _off($element, listener.type, listener.fn)
    })
    if (
      (recurse || type === true || arguments.length === 1) &&
      $element &&
      $children
    ) {
      $children.forEach(function ($child) {
        if (isElement($child)) {
          purgeElement($child, type, recurse)
        }
      })
    }
  }

  /**
   * 销毁所有已绑定的代理事件
   * ========================================================================
   * @method destroy
   * @param {HTMLElement} el - 需要解除所有事件绑定的 DOM 元素
   * @returns {Emitter} - Emitter 对象
   */
  var _destroy = function destroy(el) {
    var types = getTypes(el)
    types.forEach(function (type) {
      purgeElement(el, type, true)
    })
    return _this
  }

  /**
   * 删除 DOM 元素缓存的 listener 数据
   * ========================================================================
   * @method _delete
   * @param {HTMLElement} el - 要删除 listener 的 DOM 元素
   * @param {String} type - 事件类型（名称）
   * @param {Function} [fn] - 事件处理器回调函数
   */
  var _delete = function _delete(el, type, fn) {
    var listeners = el._listeners
    var index = -1
    if (listeners.length < 1) {
      return false
    }

    // 移除缓存的 _listeners 数据
    listeners.forEach(function (listener, i) {
      if (type === listener.type) {
        index = i
        if (fn === listener.fn) {
          index = i
        }
      }
    })

    /* istanbul ignore else */
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }

  /**
   * 取消 type 类型的代理事件绑定
   * ========================================================================
   * 如果没有设置 handler，则销毁 this.$options 绑定的所有符合 type 事件类型的事件绑定
   * ========================================================================
   * @method off
   * @param {HTMLElement} el - （必须）取消事件绑定的 DOM 元素
   * @param {String} type - （必须）事件类型
   * @param {Function} [fn] - （可选）事件处理器回调函数
   */
  var _off = function off(el, type, fn) {
    var capture = CAPTURE_EVENTS.indexOf(type) > -1

    // 如果不设置 fn 参数，默认清除 options 元素上绑定的所有事件处理器
    if (!isFunction(fn)) {
      return purgeElement(el, type)
    }

    /* istanbul ignore else */
    if (fn._delegateListener) {
      fn = fn._delegateListener
      delete fn._delegateListener
    }

    // 移除缓存的 _listeners 数据
    _delete(el, type, fn)
    el.removeEventListener(type, fn, capture)
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
  var _on = function on(el, selector, type, fn, data, context) {
    var once =
      arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false
    // CAPTURE_EVENTS 中的特殊事件，采用事件捕获模型
    var capture = CAPTURE_EVENTS.indexOf(type) > -1
    var listener = function listener(evt) {
      var target = getTarget(evt)
      // 通过 Element.matches 方法获得点击的目标元素
      var delegateTarget = closest(target, selector, el)
      var overrideContext = context || el
      evt.delegateTarget = delegateTarget
      if (context === true) {
        overrideContext = data
      }

      /* istanbul ignore else */
      if (delegateTarget) {
        /* istanbul ignore else */
        if (once === true) {
          _off(el, type, listener)
        }
        fn.call(overrideContext, evt, data)
      }
    }
    if (!el._listeners) {
      el._listeners = []
    }

    // 缓存 options 元素绑定的事件处理器
    el._listeners.push({
      el: el,
      selector: selector,
      type: type,
      fn: listener,
      data: data,
      context: context,
      capture: capture
    })
    fn._delegateListener = listener
    el.addEventListener(type, listener, capture)
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
  var _once = function once(el, selector, type, fn, data, context) {
    _on(el, selector, type, fn, data, context, true)
  }

  /**
   * Emitter 类 - JavaScript 事件代理对象
   * ========================================================================
   */
  var Emitter = /*#__PURE__*/ (function () {
    /**
     * Emitter 构造函数
     * ========================================================================
     * @constructor
     * @param {HTMLElement|String} el - （必须）DOM 元素或其选择器
     * @returns {Emitter} - Emitter 对象
     */
    function Emitter(el) {
      _classCallCheck(this, Emitter)
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
     * 取消 type 类型的代理事件绑定
     * ========================================================================
     * 如果没有设置 handler，则销毁 this.$options 绑定的所有符合 type 事件类型的事件绑定
     * ========================================================================
     * @method off
     * @param {String} type - （必须）事件类型
     * @param {Function} [handler] - （可选）事件处理器回调函数
     * @returns {Emitter} - Emitter 对象
     */
    _createClass(Emitter, [
      {
        key: 'off',
        value: function off(type, handler) {
          _off(this.$el, type, handler)
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
      },
      {
        key: 'on',
        value: function on(selector, type, handler, data, context) {
          var once =
            arguments.length > 5 && arguments[5] !== undefined
              ? arguments[5]
              : false
          _on(this.$el, selector, type, handler, data, context || this, once)
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
      },
      {
        key: 'once',
        value: function once(selector, type, handler, data, context) {
          _once(this.$el, selector, type, handler, data, context)
          return this
        }

        /**
         * 销毁（type 类型的）代理事件绑定
         * ========================================================================
         * 1. 设置了事件类型 type，则销毁指定类型的事件绑定，否则清除所有代理事件绑定
         * 2. recurse 设置为 true，递归销毁子节点全部事件绑定
         * ========================================================================
         * @method purge
         * @param {String} type  - （必须）事件类型
         * @param {Boolean} [recurse]  - （可选）是否递归销毁子节点所有事件绑定
         * 元素绑定的全部事件处理器
         * @returns {Emitter} - Emitter 对象
         */
      },
      {
        key: 'purge',
        value: function purge(type) {
          var recurse =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : false
          purgeElement(this.$el, type, recurse)
          return this
        }

        /**
         * 销毁所有已绑定的代理事件
         * ========================================================================
         * @method destroy
         * @returns {Emitter} - Emitter 对象
         */
      },
      {
        key: 'destroy',
        value: function destroy() {
          _destroy(this.$el)
          return this
        }
      }
    ])
    return Emitter
  })()
  /* eslint-disable no-unused-vars */
  var delegate = function delegate(el) {
    return new Emitter(el)
  }
  /* eslint-enable no-unused-vars */
  return delegate
})

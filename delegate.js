;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.delegate = factory();
  }
}(this, function() {
"use strict";

function _typeof2(obj) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof2(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof2(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var CAPTURE_EVENTS = ['blur', 'focus', 'load', 'unload', 'mouseenter', 'mouseleave'];

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
  return Object.prototype.toString.apply(val);
};

/**
 * 判断是否为 String 类型值
 * ========================================================================
 * @method isString
 * @param {*} val - （必须）待检测的字符串
 * @returns {Boolean}
 */
var isString = function isString(val) {
  return typeof val === 'string';
};

/**
 * 检测测试数据是否为 Function 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - （必须）待检测的数据
 * @returns {boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
var isFunction = function isFunction(val) {
  return typeof val === 'function' || _typeof(val) === '[object Function]';
};

/**
 * 检测是否为 HTMLElement 元素节点
 * ========================================================================
 * @method isElement
 * @param {*|HTMLElement} el - （必须）待检测的数据（DOM 元素）
 * @returns {Boolean}
 */
var isElement = function isElement(el) {
  return el && el.nodeName && el.tagName && el.nodeType === 1;
};

/**
 * 检测当前浏览器是否为 IE 浏览器
 * ========================================================================
 * IE 浏览器返回 true，其它浏览器返回 false
 * ========================================================================
 * @method isIE
 * @returns {Boolean} - IE 浏览器返回 true，其它浏览器返回 false
 */
var isIE = function isIE() {
  var agent = navigator.userAgent;
  return !!agent.match(/Trident/g) || !!agent.match(/MSIE/g);
};

/**
 * 检测当前浏览器是否为 Webkit 内核
 * ========================================================================
 * @method isWebkit
 * @returns {Boolean}
 */
var isWebkit = function isWebkit() {
  var UA = navigator.userAgent;
  return /\b(iPad|iPhone|iPod)\b/.test(UA) && /WebKit/.test(UA) && !/Edge/.test(UA) && !window.MSStream;
};

/**
 * 获取 DOM 元素的父节点
 * ========================================================================
 * @method getParentOrHost
 * @param {*|HTMLElement} el - （必须）要获取父节点的 DOM 元素
 * @returns {*|HTMLElement}
 */
var getParentOrHost = function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
};

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
var matches = function matches(el) {
  var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var sel = selector.replace(/^>/i, '');
  if (!selector || !sel || !el) {
    return false;
  }

  /* istanbul ignore else */
  if (el.matches) {
    return el.matches(sel);
  } else if (el.msMatchesSelector) {
    return el.msMatchesSelector(sel);
  } else if (el.webkitMatchesSelector) {
    return el.webkitMatchesSelector(sel);
  } else {
    return false;
  }
};

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
var closest = function closest(el, selector, ctx, includeCTX) {
  var context = ctx || document;
  if (!el) {
    return null;
  }
  do {
    /* istanbul ignore else */
    if (selector != null && (selector[0] === '>' ? el.parentNode === context && matches(el, selector) : matches(el, selector)) || includeCTX && el === context) {
      return el;
    }

    /* istanbul ignore else */
    if (el === context) {
      break;
    }

    /* jshint boss:true */
  } while (el = getParentOrHost(el));
};

/**
 * 获取 DOM 元素绑定的所有事件处理器
 * ========================================================================
 * @methods getListeners
 * @param {HTMLElement} el - （必须）要检测的 DOM 元素
 * @param {String} [type] - （可选）要检测的事件类型
 * @returns {Array} - 已绑定的事件处理器的对象数组
 */
var _getListeners = function getListeners(el, type) {
  var listeners = el._listeners || [];
  if (type) {
    listeners = listeners.filter(function (listener) {
      return listener.type === type;
    });
  }
  return listeners;
};

/**
 * 获取 scrollTop 和 scrollLeft 数组数据
 * ========================================================================
 * IE 浏览器种计算 pageX 和 pageY，需要包含 scrollTop 和 scrollLeft 的值
 * ========================================================================
 * @method getScroll
 * @return {Array} - 返回滚动信息的数组 [scrollTop, scrollLeft]
 */
var getScroll = function getScroll() {
  var dd = document.documentElement;
  var db = document.body;
  if (dd && (dd.scrollTop || dd.scrollLeft)) {
    return [dd.scrollTop, dd.scrollLeft];
  } else if (db) {
    return [db.scrollTop, db.scrollLeft];
  } else {
    return [0, 0];
  }
};

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollTop
 * @return {Number} - 返回 getScrollTop 值
 */
var getScrollTop = function getScrollTop() {
  return getScroll()[0];
};

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollLeft
 * @return {Number} - 返回 scrollLeft 值
 */
var getScrollLeft = function getScrollLeft() {
  return getScroll()[1];
};

/**
 * 获取事件触发时的 pageX 值
 * ========================================================================
 * @method getPageX
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageX 值
 */
var _getPageX = function getPageX(evt) {
  var x = evt.pageX;
  if (!x && 0 !== x) {
    x = evt.clientX || 0;
    if (isIE()) {
      x += getScrollLeft();
    }
  }
  return x;
};

/**
 * 获取事件触发时的 pageY 值
 * ========================================================================
 * @method getPageY
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageY 值
 */
var _getPageY = function getPageY(evt) {
  var y = evt.pageY;
  if (!y && 0 !== y) {
    y = evt.clientY || 0;
    if (isIE()) {
      y += getScrollTop();
    }
  }
  return y;
};

/**
 * 获取事件触发时的 pageX 和 pageY 数组数据
 * ========================================================================
 * @method getPageXY
 * @param {Event} evt - （必须）Event 对象
 * @return {Array} - 返回事件触发时的数组数据：[pageX, pageY]
 */
var _getPageXY = function getPageXY(evt) {
  return [_getPageX(evt), _getPageY(evt)];
};

/**
 * 返回触发事件的 charCode
 * ========================================================================
 * @method getCharCode
 * @param {Event} evt - Event 对象
 * @return {Number} - 返回事件的 charCode
 */
var _getCharCode = function getCharCode(evt) {
  var code = evt.keyCode || evt.charCode || 0;
  // keycodes for webkit/safari
  var webkitKeymap = {
    63232: 38,
    // up
    63233: 40,
    // down
    63234: 37,
    // left
    63235: 39,
    // right
    63276: 33,
    // page up
    63277: 34,
    // page down
    25: 9 // SHIFT-TAB (Safari provides a different key code in
    // this case, even though the shiftKey modifier is set)
  };

  // webkit key normalization
  if (isWebkit() && code in webkitKeymap) {
    code = webkitKeymap[code];
  }
  return code;
};

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
var purgeElement = function purgeElement(el) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var recurse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var $element = isString(el) ? document.querySelector(el) : el;
  var $childNodes = $element.childNodes;
  var listeners = _getListeners($element, type);
  var i;

  /* istanbul ignore else */
  if (listeners) {
    for (i = listeners.length - 1; i > -1; i -= 1) {
      var listener = listeners[i];
      _off($element, listener.type, listener.fn);
    }
  }
  if (recurse && $element && $childNodes) {
    $childNodes.forEach(function ($childNode) {
      purgeElement($childNode, type, recurse);
    });
  }
};

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
var _off = function off(el, type, fn) {
  var listeners = el._listeners;
  var capture = false;
  var index = -1;

  // 如果不设置 fn 参数，默认清除 el 元素上绑定的所有事件处理器
  if (!isFunction(fn)) {
    return purgeElement(el, type);
  }

  /* istanbul ignore else */
  if (fn._delegateListener) {
    fn = fn._delegateListener;
    delete fn._delegateListener;
  }
  listeners.forEach(function (listener, i) {
    if (listener.type === type) {
      index = i;
    }
  });

  // 移除缓存的 _listeners 数据
  /* istanbul ignore else */
  if (listeners.length > 0 && fn) {
    listeners.forEach(function (listener, i) {
      if (listener.type === type && listener.fn === fn) {
        index = i;
      }
    });
  }

  /* istanbul ignore else */
  if (index > -1) {
    el._listeners.splice(index, 1);
  }
  if (CAPTURE_EVENTS.indexOf(type) > -1) {
    capture = true;
  }

  /* istanbul ignore else */
  if (window.removeEventListener) {
    el.removeEventListener(type, fn, capture);
  } else {
    if (window.detachEvent) {
      el.detachEvent('on' + type, fn);
    }
  }
};

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
 */
var _on = function on(el, selector, type, fn, data, context) {
  var once = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var capture = false;
  var listener = function listener(evt) {
    var target = evt.target;
    // 通过 Element.matches 方法获得点击的目标元素
    var delegateTarget = closest(target, selector, el);
    var overrideContext = context || el;
    evt.delegateTarget = delegateTarget;
    if (context === true) {
      overrideContext = data;
    }

    /* istanbul ignore else */
    if (delegateTarget) {
      /* istanbul ignore else */
      if (once === true) {
        _off(el, type, listener);
      }

      // 直接过滤了点击对象，会阻止事件冒泡或者捕获
      /* istanbul ignore else */
      if (target === delegateTarget) {
        fn.call(overrideContext, evt, data);
      }
    }
  };
  if (CAPTURE_EVENTS.includes(type)) {
    capture = true;
  }
  if (!el._listeners) {
    el._listeners = [];
  }

  // 缓存 el 元素绑定的事件处理器
  el._listeners.push({
    el: el,
    selector: selector,
    type: type,
    fn: listener,
    data: data,
    context: context,
    capture: capture
  });
  fn._delegateListener = listener;

  /* istanbul ignore else */
  if (window.addEventListener) {
    el.addEventListener(type, listener, capture);
  } else {
    if (window.attachEvent) {
      el.attachEvent('on' + type, listener);
    }
  }
};

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
  _on(el, selector, type, fn, data, context, true);
};

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
var _preventDefault = function preventDefault(evt) {
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }
};

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
var _stopPropagation = function stopPropagation(evt) {
  if (evt.stopPropagation) {
    evt.stopPropagation();
  } else {
    evt.cancelBubble = true;
  }
};

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
var _stopEvent = function stopEvent(evt) {
  _stopPropagation(evt);
  _preventDefault(evt);
};

/**
 * Emitter 类 - JavaScript 事件代理对象
 * ========================================================================
 * @constructor
 */
var Emitter = /*#__PURE__*/function () {
  /**
   * Emitter 构造函数
   * ========================================================================
   * @constructor
   * @param {HTMLElement|String} el - （必须）DOM 元素或其选择器
   * @returns {Emitter} - Emitter 对象
   */
  function Emitter(el) {
    _classCallCheck(this, Emitter);
    if (isElement(el)) {
      this.$el = el;
    } else {
      if (isString(el)) {
        this.$el = document.querySelector(el);
      }
    }
    return this;
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
  _createClass(Emitter, [{
    key: "getListeners",
    value: function getListeners(type) {
      return _getListeners(this.$el, type);
    }

    /**
     * 获取事件触发时的 pageX 值
     * ========================================================================
     * @method getPageX
     * @see getPageX
     * @param {Event} evt - （必须）Event 对象
     * @return {Number} - 返回事件触发时的 pageX 值
     */
  }, {
    key: "getPageX",
    value: function getPageX(evt) {
      return _getPageX(evt);
    }

    /**
     * 获取事件触发时的 pageY 值
     * ========================================================================
     * @method getPageY
     * @see getPageY
     * @param {Event} evt - （必须）Event 对象
     * @return {Number} - 返回事件触发时的 pageY 值
     */
  }, {
    key: "getPageY",
    value: function getPageY(evt) {
      return _getPageY(evt);
    }

    /**
     * 获取事件触发时的 pageX 和 pageY 数组数据
     * ========================================================================
     * @method getPageXY
     * @see getPageXY
     * @param {Event} evt - （必须）Event 对象
     * @return {Array} - 返回事件触发时的数组数据：[pageX, pageY]
     */
  }, {
    key: "getPageXY",
    value: function getPageXY(evt) {
      return _getPageXY(evt);
    }

    /**
     * 返回触发事件的 charCode
     * ========================================================================
     * @method getCharCode
     * @see getCharCode
     * @param {Event} evt - （必须）Event 对象
     * @return {Number} - 返回事件的 charCode
     */
  }, {
    key: "getCharCode",
    value: function getCharCode(evt) {
      return _getCharCode(evt);
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
  }, {
    key: "purge",
    value: function purge(type) {
      var recurse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      purgeElement(this.$el, type, recurse);
      return this;
    }

    /**
     * 销毁所有已绑定的代理事件
     * ========================================================================
     * @method destroy
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "destroy",
    value: function destroy() {
      var $el = this.$el;
      this.purge(null, true);
      if ($el && $el._listeners) {
        $el._listeners = [];
      }
      return this;
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
  }, {
    key: "off",
    value: function off(type, handler) {
      _off(this.$el, type, handler);
      return this;
    }

    /**
     * 绑定代理事件
     * ========================================================================
     * @method on
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {String} type - （必须）事件类型
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
     * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "on",
    value: function on(selector, type, handler, data, context) {
      var once = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      _on(this.$el, selector, type, handler, data, this, once);
      return this;
    }

    /**
     * 绑定仅触发一次的代理事件
     * ========================================================================
     * @method once
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {String} type - （必须）事件类型
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
     * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "once",
    value: function once(selector, type, handler, data, context) {
      _once(this.$el, selector, type, handler, data, context);
      return this;
    }

    /**
     * 阻止事件的默认行为
     * ========================================================================
     * @method preventDefault
     * @param {Event} evt - （必须）Event 对象
     * @returns {Emitter}  - Emitter 对象
     * @see preventDefault
     */
  }, {
    key: "preventDefault",
    value: function preventDefault(evt) {
      _preventDefault(evt);
      return this;
    }

    /**
     * 终止事件在传播过程的捕获或冒泡的事件流
     * ========================================================================
     * @method stopPropagation
     * @param {Event} evt - （必须）Event 对象
     * @returns {Emitter}  - Emitter 对象
     * @see stopPropagation
     */
  }, {
    key: "stopPropagation",
    value: function stopPropagation(evt) {
      _stopPropagation(evt);
      return this;
    }

    /**
     * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
     * ========================================================================
     * @method stopEvent
     * @param {Event} evt - （必须）Event 对象
     * @returns {Emitter}  - Emitter 对象
     * @see stopEvent
     */
  }, {
    key: "stopEvent",
    value: function stopEvent(evt) {
      _stopEvent(evt);
      return this;
    }
  }]);
  return Emitter;
}();
/* eslint-disable no-unused-vars */
var delegate = function delegate(el) {
  return new Emitter(el);
};
/* eslint-enable no-unused-vars */
return delegate;
}));

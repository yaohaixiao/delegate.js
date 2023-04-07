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
var _this = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof2(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var CAPTURE_EVENTS = ['focusout', 'blur', 'focusin', 'focus', 'load', 'unload', 'mouseenter', 'mouseleave'];

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
  return !!(el && el.nodeName && el.tagName && el.nodeType === 1);
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
 * 判断是否为 Apple 设备的 Safari 浏览器
 * ========================================================================
 * @method isAppleSafari
 * @returns {Boolean}
 */
var isAppleSafari = function isAppleSafari() {
  var UA = navigator.userAgent;
  var platforms = /Mac|iPhone|iPod|iPad/i;
  var rejected = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  var expected = /Safari/i;
  if (rejected.test(UA)) {
    return false;
  }
  return platforms.test(UA) && expected.test(UA);
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
  } else {
    return false;
  }
};

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
 * 在某些情况下，某些浏览器（例如：Safari 浏览器）会返回实际的目标元素内部的文本节点。
 * resolveTextNode() 方法则会返回实际的目标节点，以保证浏览器行为一致。
 * ========================================================================
 * @method resolveTextNode
 * @param {HTMLElement} el - 要解析的节点
 * @return {HTMLElement} - 实际的目标 DOM 节点
 */
var resolveTextNode = function resolveTextNode(el) {
  if (el && el.nodeType === 3) {
    return el.parentNode;
  }
  return el;
};

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
var _getRelatedTarget = function getRelatedTarget(evt) {
  var target = evt.relatedTarget;
  var type = evt.type;
  if (!target) {
    if (type === 'mouseout') {
      target = evt.toElement;
    } else if (type === 'mouseover') {
      target = evt.fromElement;
    }
  }
  return resolveTextNode(target);
};

/**
 * 返回触发事件的 target DOM 元素
 * ========================================================================
 * @method getTarget
 * @param {Event} evt - Event 对象
 * @return {HTMLElement} - Event 对象的 target DOM 元素
 */
var _getTarget = function getTarget(evt) {
  var target = evt.target;
  return resolveTextNode(target);
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
  if (isString(type) && type) {
    listeners = listeners.filter(function (listener) {
      return listener.type === type;
    });
  }
  return listeners;
};

/**
 * 返回已绑定的事件类型的数组（去除名称重复的事件）
 * ========================================================================
 * @method getTypes
 * @returns {Array}
 */
var _getTypes = function getTypes(el) {
  var listeners = _getListeners(el);
  var types = [];
  listeners.forEach(function (listener) {
    types.push(listener.type);
  });
  return _toConsumableArray(new Set(types));
};

/**
 * 判断是否已经（指定类型的）绑定事件
 * ========================================================================
 * @method hasEvent
 * @param {HTMLElement} el - 要检测是否绑定事件的 DOM 元素
 * @param {String} [type] - （可选）事件名称：
 *                           指定 type，则判断是否绑定 type 类型事件；
 *                           未指定 type，则判断是否绑定任意类型的事件；
 * @returns {Boolean}
 */
var _hasEvent = function hasEvent(el, type) {
  var types = _getTypes(el);
  var result;
  if (types.length < 1) {
    return false;
  }
  result = types.length > 0;

  /* istanbul ignore else */
  if (type && isString(type)) {
    result = types.indexOf(type) > -1;
  }
  return result;
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
  var $body = document.documentElement || document.body;
  var scrollXY = [0, 0];
  if ($body && ($body.scrollTop || $body.scrollLeft)) {
    scrollXY = [$body.scrollTop, $body.scrollLeft];
  }
  return scrollXY;
};

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollTop
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop
 * @return {Number} - 返回 getScrollTop 值
 */
var getScrollTop = function getScrollTop() {
  return getScroll()[0];
};

/**
 * 获取 scrollTop 值
 * ========================================================================
 * @method getScrollLeft
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollLeft
 * @return {Number} - 返回 scrollLeft 值
 */
var getScrollLeft = function getScrollLeft() {
  return getScroll()[1];
};

/**
 * 获取事件触发时的 pageX 值
 * ========================================================================
 * @method getPageX
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageX
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageX 值
 */
var _getPageX = function getPageX(evt) {
  var x = evt.pageX;

  /* istanbul ignore else */
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
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/pageY
 * @param {Event} evt - （必须）Event 对象
 * @return {Number} - 返回事件触发时的 pageY 值
 */
var _getPageY = function getPageY(evt) {
  var y = evt.pageY;

  /* istanbul ignore else */
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
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/charCode
 * @param {Event} evt - Event 对象
 * @return {Number} - 返回事件的 charCode
 */
var _getCharCode = function getCharCode(evt) {
  var code = evt.keyCode || evt.charCode;
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
    25: 9 // The SHIFT-TAB (Safari provides a different key code in
    // this case, even though the shiftKey modifier is set)
  };

  // webkit key normalization
  if (isAppleSafari() && code in webkitKeymap) {
    code = webkitKeymap[code];
  }
  return code;
};

/**
 * 创建自定义事件（CustomerEvent）
 * ========================================================================
 * @method createEvent
 * @param {String} type - （必须）事件类型（名称）
 * @param {Object} [detail] - （可选）传递给自定义事件的数据，默认为 null
 * @param {Boolean} [bubbles] - （可选）是否支持冒泡，默认为 true
 * @param {Boolean} [cancelable] - （可选）是否可以取消，默认为 true
 * @returns {CustomEvent} - CustomerEvent 实例
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const event = createEvent('log', {
 *   name: 'Yao',
 *   hi() {
 *     console.log('hi！！！')
 *   }
 * })
 *
 * const logHandler = function(evt) {
 *   console.log('detail', evt.detail)
 *   console.log('type', evt.type)
 * }
 *
 * $nav.addEventListener('log', logHandler)
 *
 * $nav.dispatchEvent(event)
 */
var _createEvent = function createEvent(type) {
  var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return new CustomEvent(type, {
    detail: detail,
    bubbles: bubbles,
    cancelable: cancelable
  });
};

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
  var recurse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var $element = isString(el) ? document.querySelector(el) : el;
  var $children = $element.childNodes;
  var listeners = _getListeners($element, type);
  listeners.forEach(function (listener) {
    _off($element, listener.type, listener.fn);
  });
  if ((recurse || type === true || arguments.length === 1) && $element && $children) {
    $children.forEach(function ($child) {
      if (isElement($child)) {
        purgeElement($child, type, recurse);
      }
    });
  }
};

/**
 * 销毁所有已绑定的代理事件
 * ========================================================================
 * @method destroy
 * @param {HTMLElement} el - 需要解除所有事件绑定的 DOM 元素
 * @returns {Emitter} - Emitter 对象
 */
var _destroy = function destroy(el) {
  var types = _getTypes(el);
  types.forEach(function (type) {
    purgeElement(el, type, true);
  });
  return _this;
};

/**
 * 删除 DOM 元素缓存的 listener 数据
 * ========================================================================
 * @method _delete
 * @param {HTMLElement} el - 要删除 listener 的 DOM 元素
 * @param {String} type - 事件类型（名称）
 * @param {Function} [fn] - 事件处理器回调函数
 */
var _delete = function _delete(el, type, fn) {
  var listeners = el._listeners;
  var index = -1;
  if (listeners.length < 1) {
    return false;
  }

  // 移除缓存的 _listeners 数据
  listeners.forEach(function (listener, i) {
    if (type === listener.type) {
      index = i;
      if (fn === listener.fn) {
        index = i;
      }
    }
  });

  /* istanbul ignore else */
  if (index > -1) {
    listeners.splice(index, 1);
  }
};

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
  var capture = CAPTURE_EVENTS.indexOf(type) > -1;

  // 如果不设置 fn 参数，默认清除 options 元素上绑定的所有事件处理器
  if (!isFunction(fn)) {
    return purgeElement(el, type);
  }

  /* istanbul ignore else */
  if (fn._delegateListener) {
    fn = fn._delegateListener;
    delete fn._delegateListener;
  }

  // 移除缓存的 _listeners 数据
  _delete(el, type, fn);
  el.removeEventListener(type, fn, capture);
};

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
  var once = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  // CAPTURE_EVENTS 中的特殊事件，采用事件捕获模型
  var capture = CAPTURE_EVENTS.indexOf(type) > -1;
  var listener = function listener(evt) {
    var target = _getTarget(evt);
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
      fn.call(overrideContext, evt, data);
    }
  };
  if (!el._listeners) {
    el._listeners = [];
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
  });
  fn._delegateListener = listener;
  el.addEventListener(type, listener, capture);
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
var _focusin = function focusin(el, selector, fn, data, context) {
  var once = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var FOCUSIN = isIE() ? 'focusin' : 'focus';
  return _on(el, selector, FOCUSIN, fn, data, context, once);
};

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
var _focusout = function focusout(el, selector, fn, data, context) {
  var once = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var FOCUSOUT = isIE() ? 'focusout' : 'blur';
  _on(el, selector, FOCUSOUT, fn, data, context, once);
};

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
var _trigger = function trigger(el, type, selector) {
  var $child;
  if (!type || !selector) {
    return false;
  }
  $child = el.querySelector(selector);
  if (!$child) {
    return false;
  }
  $child.dispatchEvent(_createEvent(type));
};

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
var _preventDefault = function preventDefault(evt) {
  evt.preventDefault();
};

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
var _stopPropagation = function stopPropagation(evt) {
  evt.stopPropagation();
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
 * 阻止监听同一事件的其他事件监听器被调用，并且阻止默认行为和事件冒泡。
 * ========================================================================
 * @method stopImmediate
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation
 * @param {Event} evt - （必须）Event 对象
 *
 * @example
 * <div id="nav" class="nav">
 *   <a id="service" class="anchor" href="https://www.yaohaixiao.com/serivce">Service</a>
 *   <a id="help" class="anchor" href="https://www.yaohaixiao.com/help">Help</a>
 * </div>
 *
 * const $nav = document.querySelector('#nav')
 * const $service = document.querySelector('#service')
 * const logHandler = function(evt) {
 *   console.log(evt.target)
 * }
 * const styleHandler = function(evt) {
 *   $nav.classList.add('checked')
 * }
 * const serviceHandler = function(evt) {
 *   alert(evt.target)
 *   stopImmediate(evt)
 * }
 * const removeHandler = function(evt) {
 *   const $target = evt.target
 *
 *   $target.parentNode.removeChild($target)
 * }
 *
 * on($nav, 'click', logHandler)
 * on($nav, 'click', styleHandler)
 * on($service, 'click', serviceHandler)
 * on($service, 'click', removeHandler)
 *
 * $nav.click()
 * // => 触发 logHandler 和 styleHandler
 *
 * $service.click()
 * // => 仅触发 serviceHandler，不会触发 removeHandler
 * // => 并且不会跳转页面，也不会冒泡到 $nav，不会触发 logHandler 和 styleHandler
 */
var _stopImmediate = function stopImmediate(evt) {
  _stopEvent(evt);
  evt.stopImmediatePropagation();
};

/**
 * Emitter 类 - JavaScript 事件代理对象
 * ========================================================================
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
     * 返回已绑定的事件类型的数组（去除名称重复的事件）
     * ========================================================================
     * @method getTypes
     * @since 1.5.0
     * @returns {Array}
     */
  }, {
    key: "getTypes",
    value: function getTypes() {
      return _getTypes(this.$el);
    }

    /**
     * 判断是否已经（指定类型的）绑定事件
     * ========================================================================
     * @method hasEvent
     * @since 1.4.0
     * @param {String} [type] - （可选）事件名称：
     *                           指定 type，则判断是否绑定 type 类型事件；
     *                           未指定 type，则判断是否绑定任意类型的事件；
     * @returns {Boolean}
     */
  }, {
    key: "hasEvent",
    value: function hasEvent(type) {
      return _hasEvent(this.$el, type);
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
     * @since 1.1.0
     * @see https://developer.mozilla.org/en-US/docs/web/api/mouseevent/relatedtarget
     * @param {Event} evt - Event 对象
     * @return {HTMLElement} - Event 对象的 relatedTarget DOM 元素
     */
  }, {
    key: "getRelatedTarget",
    value: function getRelatedTarget(evt) {
      return _getRelatedTarget(evt);
    }

    /**
     * 返回触发事件的 target DOM 元素
     * ========================================================================
     * @method getTarget
     * @since 1.1.0
     * @param {Event} evt - Event 对象
     * @return {HTMLElement} - Event 对象的 target DOM 元素
     */
  }, {
    key: "getTarget",
    value: function getTarget(evt) {
      return _getTarget(evt);
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
      _destroy(this.$el);
      return this;
    }

    /**
     * 创建自定义事件（CustomerEvent）
     * ========================================================================
     * @method createEvent
     * @since 1.8.0
     * @see createEvent
     * @param {String} type - （必须）事件类型（名称）
     * @param {Object} [detail] - （可选）传递给自定义事件的数据，默认为 null
     * @param {Boolean} [bubbles] - （可选）是否支持冒泡，默认为 true
     * @param {Boolean} [cancelable] - （可选）是否可以取消，默认为 true
     * @returns {CustomEvent} - CustomerEvent 实例
     */
  }, {
    key: "createEvent",
    value: function createEvent(type) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var bubbles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var cancelable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return _createEvent(type, detail, bubbles, cancelable);
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
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向：
     * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象；
     * 如未指定 context，则事件处理器回调函数的 this 上下文指向为 Emitter 对象；
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "on",
    value: function on(selector, type, handler, data, context) {
      var once = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      _on(this.$el, selector, type, handler, data, context || this, once);
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
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "once",
    value: function once(selector, type, handler, data, context) {
      _once(this.$el, selector, type, handler, data, context);
      return this;
    }

    /**
     * 绑定 click 代理事件
     * ========================================================================
     * @method click
     * @since 1.4.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/click_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "click",
    value: function click(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'click', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 dbclick 代理事件
     * ========================================================================
     * @method dbclick
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/dblclick_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "dbclick",
    value: function dbclick(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'dbclick', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mouseenter 代理事件
     * ========================================================================
     * @method mouseenter
     * @since 1.4.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mouseenter",
    value: function mouseenter(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mouseenter', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mouseleave 代理事件
     * ========================================================================
     * @method mouseleave
     * @since 1.4.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mouseleave",
    value: function mouseleave(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mouseleave', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mousedown 代理事件
     * ========================================================================
     * @method mousedown
     * @since 1.7.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mousedown",
    value: function mousedown(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mousedown', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mouseup 代理事件
     * ========================================================================
     * @method mouseup
     * @since 1.7.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mouseup",
    value: function mouseup(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mouseup', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mouseover 代理事件
     * ========================================================================
     * @method mouseover
     * @since 1.7.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mouseover",
    value: function mouseover(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mouseover', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mousemove 代理事件
     * ========================================================================
     * @method mousemove
     * @since 1.7.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mousemove",
    value: function mousemove(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mousemove', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 mouseout 代理事件
     * ========================================================================
     * @method mouseout
     * @since 1.7.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "mouseout",
    value: function mouseout(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'mouseout', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 drag 代理事件
     * ========================================================================
     * @method drag
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drag_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "drag",
    value: function drag(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'drag', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 dragend 代理事件
     * ========================================================================
     * @method dragend
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragend_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "dragend",
    value: function dragend(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'dragend', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 dragenter 代理事件
     * ========================================================================
     * @method dragenter
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragenter_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "dragenter",
    value: function dragenter(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'dragenter', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 dragleave 代理事件
     * ========================================================================
     * @method dragleave
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragleave_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "dragleave",
    value: function dragleave(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'dragleave', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 dragover 代理事件
     * ========================================================================
     * @method dragover
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragover_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "dragover",
    value: function dragover(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'dragover', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 dragstart 代理事件
     * ========================================================================
     * @method dragstart
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dragstart_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "dragstart",
    value: function dragstart(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'dragstart', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 drop 代理事件
     * ========================================================================
     * @method drop
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/drop_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "drop",
    value: function drop(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'drop', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 wheel 代理事件
     * ========================================================================
     * @method wheel
     * @since 1.7.0
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "wheel",
    value: function wheel(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'wheel', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 contextmenu 代理事件
     * ========================================================================
     * @method contextmenu
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/contextmenu_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "contextmenu",
    value: function contextmenu(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'contextmenu', handler, data, context, once);
      return this;
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
  }, {
    key: "focusin",
    value: function focusin(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _focusin(this.$el, selector, handler, data, context, once);
      return this;
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
  }, {
    key: "focusout",
    value: function focusout(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _focusout(this.$el, selector, handler, data, context, once);
      return this;
    }

    /**
     * 绑定 change 代理事件
     * ========================================================================
     * @method change
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/change_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "change",
    value: function change(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'change', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 input 代理事件
     * ========================================================================
     * @method input
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/input_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "input",
    value: function input(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'input', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 compositionstart 代理事件
     * ========================================================================
     * @method compositionstart
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionstart_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "compositionstart",
    value: function compositionstart(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'compositionstart', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 compositionupdate 代理事件
     * ========================================================================
     * @method compositionupdate
     * @since 1.7.0
     * @see  https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionupdate_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "compositionupdate",
    value: function compositionupdate(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'compositionupdate', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 compositionend 代理事件
     * ========================================================================
     * @method compositionend
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/compositionend_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "compositionend",
    value: function compositionend(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'compositionend', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 paste 代理事件
     * ========================================================================
     * @method paste
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/paste_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "paste",
    value: function paste(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'paste', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 copy 代理事件
     * ========================================================================
     * @method copy
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/copy_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "copy",
    value: function copy(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'copy', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 cut 代理事件
     * ========================================================================
     * @method cut
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/cut_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "cut",
    value: function cut(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'cut', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 keydown 代理事件
     * ========================================================================
     * @method keydown
     * @since 1.7.0
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "keydown",
    value: function keydown(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'keydown', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 keyup 代理事件
     * ========================================================================
     * @method keyup
     * @since 1.7.0
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "keyup",
    value: function keyup(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'keyup', handler, data, context, once);
      return this;
    }

    /**
     * 绑定 error 代理事件
     * ========================================================================
     * @method error
     * @since 1.7.0
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/error_event
     * @param {String} selector - （必须）事件代理目标 DOM 元素的选择器
     * @param {Function} handler - （必须） 事件处理器回调函数
     * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
     * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向
     * @param {Boolean} [once] - （可选）是否仅触发一次
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "error",
    value: function error(selector, handler, data, context) {
      var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      _on(this.$el, selector, 'error', handler, data, context, once);
      return this;
    }

    /**
     * 触发代理自定义事件
     * ========================================================================
     * @method trigger
     * @since 1.6.0
     * @param {String} type - （必须）事件类型
     * @param {String} selector - （必须）选择器
     * @returns {Emitter} - Emitter 对象
     */
  }, {
    key: "trigger",
    value: function trigger(type, selector) {
      _trigger(this.$el, type, selector);
      return this;
    }

    /**
     * 阻止事件的默认行为
     * ========================================================================
     * @method preventDefault
     * @see preventDefault
     * @param {Event} evt - （必须）Event 对象
     * @returns {Emitter}  - Emitter 对象
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
     * @see stopPropagation
     * @param {Event} evt - （必须）Event 对象
     * @returns {Emitter}  - Emitter 对象
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
     * @see stopEvent
     * @param {Event} evt - （必须）Event 对象
     * @returns {Emitter}  - Emitter 对象
     */
  }, {
    key: "stopEvent",
    value: function stopEvent(evt) {
      _stopEvent(evt);
      return this;
    }

    /**
     * 阻止监听同一事件的其他事件监听器被调用，并且阻止默认行为和事件冒泡。
     * ========================================================================
     * @method stopImmediate
     * @since 1.8.0
     * @see stopImmediate
     * @param {Event} evt - （必须）Event 对象
     */
  }, {
    key: "stopImmediate",
    value: function stopImmediate(evt) {
      _stopImmediate(evt);
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

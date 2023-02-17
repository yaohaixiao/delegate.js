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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof2(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof2(obj) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof2(obj); }
/**
 * 返回检测数据调用 toString() 方法后的字符串，用以判断数据类型。
 * ========================================================================
 * @method _typeof
 * @param val
 * @returns {String}
 * @private
 */
var _typeof = function _typeof(val) {
  return Object.prototype.toString.apply(val);
};

/**
 * 判断是否为 String 类型值
 * ========================================================================
 * @param {String} val - 待检测的字符串
 * @returns {Boolean}
 */
var isString = function isString(val) {
  return typeof val === 'string';
};

/**
 * 检测是否为 HTMLElement 元素节点
 * ========================================================================
 * @param {*} el - 要测试的数据
 * @returns {Boolean}
 */
var isElement = function isElement(el) {
  return el && el.nodeName && el.tagName && el.nodeType === 1;
};

/**
 * 检测测试数据是否为 Object 类型
 * ========================================================================
 * @method isFunction
 * @param {*} val - 要检测的数据
 * @returns {Boolean} 'val' 是 Function 类型返回 true，否则返回 false
 */
var isObject = function isObject(val) {
  return (_typeof2(val) === 'object' || _typeof(val) === '[object Object]') && !isNull(val);
};

/**
 * 检测测试数据是否为 null
 * ========================================================================
 * @param val
 * @returns {boolean}
 */
var isNull = function isNull(val) {
  return val === null;
};

/**
 * 获取元素的父节点
 * =============================================================
 * @param {HTMLElement} el
 * @returns {*}
 */
var getParentOrHost = function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
};

/**
 * 获取 el 节点下匹配 selector 选择器的 HTMLElement
 * =============================================================
 * @param {HTMLElement} el
 * @param {String} selector
 * @returns {Boolean|NodeList}
 */
var matches = function matches(el, selector) {
  if (!selector) {
    return false;
  }
  selector[0] === '>' && (selector = selector.substring(1));
  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }
  return false;
};

/**
 * 获取 el 元素父元素最近的包含 selector 选择器的元素
 * =============================================================
 * @param {HTMLElement} el
 * @param {String} selector
 * @param {HTMLElement} [ctx]
 * @param {HTMLElement|Boolean} [includeCTX]
 * @returns {null|*}
 */
var closest = function closest(el, selector, ctx, includeCTX) {
  if (!el) {
    return null;
  }
  ctx = ctx || document;
  do {
    if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
      return el;
    }
    if (el === ctx) {
      break;
    }
    /* jshint boss:true */
  } while (el = getParentOrHost(el));
};

/**
 * 取消事件绑定
 * ========================================================================
 * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
var _off = function off(el, type, fn) {
  var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var MOUSE_EVENTS = ['mouseenter', 'mouseleave'];
  if (fn._delegateListener) {
    fn = fn._delegateListener;
    delete fn._delegateListener;
  }
  if (MOUSE_EVENTS.includes(type)) {
    capture = true;
  }
  el.removeEventListener(type, fn, capture);
};

/**
 * 绑定代理事件
 * ========================================================================
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Object} [data] - 传递给事件处理器需要使用的数据
 * @param {Object|Boolean} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
var _on = function on(el, selector, type, fn, data, context) {
  var once = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var capture = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var MOUSE_EVENTS = ['mouseenter', 'mouseleave'];
  var listener = function listener(evt) {
    var target = evt.target;
    // 通过 Element.matches 方法获得点击的目标元素
    var delegateTarget = closest(target, selector);
    var overrideContext = el;
    evt.delegateTarget = delegateTarget;
    if (context) {
      if (context === true) {
        overrideContext = data;
      } else {
        overrideContext = context;
      }
    }
    if (delegateTarget) {
      if (once === true) {
        _off(el, type, listener);
      }
      fn.call(overrideContext, evt, data);
    }
  };
  if (MOUSE_EVENTS.includes(type)) {
    capture = true;
  }
  fn._delegateListener = fn;
  el.addEventListener(type, listener, capture);
};

/**
 * 绑定只触发一次的事件
 * ========================================================================
 * @method delegateOnce
 * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
 * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
 * @param {String} type - 事件类型
 * @param {Function} fn - 绑定事件的回调函数
 * @param {Object} data - 绑定事件的回调函数
 * @param {Object|Boolean} [context] - callback 回调函数的 this 上下文（默认值：el）
 * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
 */
var _once = function once(el, selector, type, fn, data, context) {
  var capture = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  _on(el, selector, type, fn, data, context, true, capture);
};

/**
 * A polyfill for Object.assign()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill
 */
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
var Emitter = /*#__PURE__*/function () {
  function Emitter(el) {
    _classCallCheck(this, Emitter);
    this._attrs = {
      selector: '',
      type: '',
      handler: null,
      data: null,
      context: null,
      once: false,
      capture: false
    };
    if (isElement(el)) {
      this.$el = el;
    } else {
      if (isString(el)) {
        this.$el = document.querySelector(el);
      }
    }
    return this;
  }
  _createClass(Emitter, [{
    key: "attr",
    value: function attr() {
      var attrs = this._attrs;
      var args = arguments;
      var prop = args[0];
      switch (args.length) {
        // 1 个参数
        case 1:
          if (isString(prop)) {
            return attrs[prop];
          } else {
            if (isObject(prop)) {
              Object.assign(attrs, prop);
            }
          }
          break;
        // 2 个参数
        case 2:
          // 扩展 _attrs 的某个值
          if (isString(prop)) {
            attrs[args] = args[1];
          }
          break;
        // 不传参数，返回整个 _attrs 属性
        default:
          return attrs;
      }
      return this;
    }
  }, {
    key: "off",
    value: function off() {
      var _this$attr = this.attr(),
        type = _this$attr.type,
        handler = _this$attr.handler,
        capture = _this$attr.capture;
      _off(this.$el, type, handler, capture);
      this.attr({
        selector: '',
        type: '',
        handler: null,
        data: null,
        context: null,
        once: false,
        capture: false
      });
      return this;
    }
  }, {
    key: "on",
    value: function on(selector, type, handler, data, context) {
      var once = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var capture = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      this.attr({
        selector: selector,
        type: type,
        handler: handler,
        data: data,
        context: context,
        once: once,
        capture: capture
      });
      _on(this.$el, selector, type, handler, data, this, once, capture);
      return this;
    }
  }, {
    key: "once",
    value: function once(selector, type, handler, data, context) {
      var capture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      this.attr({
        selector: selector,
        type: type,
        handler: handler,
        data: data,
        context: context,
        once: true,
        capture: capture
      });
      _once(this.$el, selector, type, handler, this, true, capture);
      return this;
    }
  }, {
    key: "preventDefault",
    value: function preventDefault(evt) {
      evt.preventDefault();
      return this;
    }
  }, {
    key: "stopPropagation",
    value: function stopPropagation(evt) {
      evt.stopPropagation();
      return this;
    }
  }, {
    key: "stopEvent",
    value: function stopEvent(evt) {
      this.preventDefault(evt);
      this.stopPropagation(evt);
      return this;
    }
  }]);
  return Emitter;
}();
var delegate = function delegate(el) {
  return new Emitter(el);
};
return delegate;
}));

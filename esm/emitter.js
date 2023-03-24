import createEvent from './createEvent'
import off from './off'
import on from './on'
import once from './once'
import focusin from './focusin'
import focusout from './focusout'
import isElement from './isElement'
import isString from './isString'
import getListeners from './getListeners'
import getTypes from './getTypes'
import hasEvent from './hasEvent'
import getPageX from './getPageX'
import getPageY from './getPageY'
import getPageXY from './getPageXY'
import getCharCode from './getCharCode'
import getRelatedTarget from './getRelatedTarget'
import getTarget from './getTarget'
import purgeElement from './purgeElement'
import destroy from './destroy'
import preventDefault from './preventDefault'
import stopPropagation from './stopPropagation'
import stopEvent from './stopEvent'
import stopImmediate from './stopImmediate'
import trigger from './trigger'

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
   * @since 1.5.0
   * @returns {Array}
   */
  getTypes() {
    return getTypes(this.$el)
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
  hasEvent(type) {
    return hasEvent(this.$el, type)
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
   * @since 1.1.0
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
   * @since 1.1.0
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
   * @param {String} type  - （必须）事件类型
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
    destroy(this.$el)

    return this
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
  createEvent(type, detail = null, bubbles = true, cancelable = true) {
    return createEvent(type, detail, bubbles, cancelable)
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
   * @since 1.4.0
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
   * @since 1.7.0
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
   * @since 1.4.0
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
   * @since 1.4.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.4.0
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
   * @since 1.4.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
   * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/paste_event
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.7.0
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
   * @since 1.6.0
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

  /**
   * 阻止监听同一事件的其他事件监听器被调用，并且阻止默认行为和事件冒泡。
   * ========================================================================
   * @method stopImmediate
   * @since 1.8.0
   * @see stopImmediate
   * @param {Event} evt - （必须）Event 对象
   */
  stopImmediate(evt) {
    stopImmediate(evt)

    return this
  }
}

export default Emitter

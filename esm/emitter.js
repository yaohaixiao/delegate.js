import off from './off'
import on from './on'
import once from './once'
import focusin from './focusin'
import focusout from './focusout'
import isElement from './isElement'
import isString from './isString'
import getListeners from './getListeners'
import getPageX from './getPageX'
import getPageY from './getPageY'
import getPageXY from './getPageXY'
import getCharCode from './getCharCode'
import getRelatedTarget from './getRelatedTarget'
import getTarget from './getTarget'
import purgeElement from './purgeElement'
import preventDefault from './preventDefault'
import stopPropagation from './stopPropagation'
import stopEvent from './stopEvent'

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
   * 绑定 mouseenter 代理事件
   * ========================================================================
   * @method mouseenter
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
   * 绑定 mouseenter 代理事件
   * ========================================================================
   * @method mouseenter
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
   * 绑定 focusin 或者 focus 代理事件
   * ========================================================================
   * @method focusin
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

export default Emitter

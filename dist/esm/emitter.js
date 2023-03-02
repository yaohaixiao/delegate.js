import off from './off'
import on from './on'
import once from './once'
import isElement from './isElement'
import isString from './isString'
import getListeners from './getListeners'
import getPageX from './getPageX'
import getPageY from './getPageY'
import getPageXY from './getPageXY'
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
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
   * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
   * @param {Boolean} [once] - （可选）是否仅触发一次
   * @param {Boolean} [capture] - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
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
   * @param {Object} [data] - （可选）传递给事件处理器回调函数的数据对象
   * @param {Object|Boolean} [context] - （可选）事件处理器回调函数的 this 上下文指向，
   * 当设置为 true 时，则事件处理器回调函数的 this 上下文指向为 data 对象
   * @param {Boolean} [capture] - （可选）是否采用事件冒泡模型：false - 冒泡，true - 捕获
   * @returns {Emitter} - Emitter 对象
   */
  once(selector, type, handler, data, context, capture = false) {
    once(this.$el, selector, type, handler, this, true, capture)

    return this
  }

  /**
   * 阻止事件的默认行为
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

export default Emitter

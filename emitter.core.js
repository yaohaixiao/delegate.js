import off from './off'
import on from './on'
import once from './once'
import isElement from './utils/isElement'
import isString from './utils/isString'
import purgeElement from './purgeElement'
import destroy from './destroy'
import trigger from './trigger'
import createEvent from './createEvent'

/**
 * Emitter 类 - JavaScript 事件代理对象
 * ========================================================================
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
   * 取消 type 类型的代理事件绑定
   * ========================================================================
   * 如果没有设置 handler，则销毁 this.$options 绑定的所有符合 type 事件类型的事件绑定
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
}

export default Emitter

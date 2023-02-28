import off from './off'
import on from './on'
import once from './once'
import isElement from './isElement'
import isString from './isString'
import getListeners from './getListeners'
import purgeElement from './purgeElement'
import preventDefault from './preventDefault'
import stopPropagation from './stopPropagation'
import stopEvent from './stopEvent'
import './polyfill'

/**
 * Emitter 类 - JavaScript 事件代理对象
 * ========================================================================
 * @constructor
 */
class Emitter {
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

  getListeners(type) {
    return getListeners(this.$el, type)
  }

  purge(type, recurse = false) {
    purgeElement(this.$el, type, recurse)

    return this
  }

  destroy(type) {
    const $el = this.$el

    this.purge(type, true)

    if ($el && $el._listeners) {
      $el._listeners = []
    }

    return this
  }

  off(type, handler, capture) {
    off(this.$el, type, handler, capture)

    return this
  }

  on(selector, type, handler, data, context, once = false, capture = false) {
    on(this.$el, selector, type, handler, data, this, once, capture)

    return this
  }

  once(selector, type, handler, data, context, capture = false) {
    once(this.$el, selector, type, handler, this, true, capture)

    return this
  }
}

/**
 * @method preventDefault
 * @static
 * @param {Event} evt
 * @returns {*}
 */
Emitter.preventDefault = (evt) => {
  preventDefault(evt)
}

/**
 * @method stopPropagation
 * @static
 * @param {Event} evt
 * @returns {*}
 */
Emitter.stopPropagation = (evt) => {
  stopPropagation(evt)
}

/**
 * @method stopEvent
 * @static
 * @param {Event} evt
 * @returns {*}
 */
Emitter.stopEvent = (evt) => {
  stopEvent(evt)
}

export default Emitter

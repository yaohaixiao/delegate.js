import off from './off'
import on from './on'
import once from './once'
import './polyfill'

class Emitter {
  constructor(el) {
    this._attrs = {
      selector: '',
      type: '',
      handler: null,
      data: null,
      context: null,
      once: false,
      capture: false
    }

    if (isElement(el)) {
      this.$el = el
    } else {
      if (isString(el)) {
        this.$el = document.querySelector(el)
      }
    }

    return this
  }

  attr() {
    const attrs = this._attrs
    const args = arguments
    const prop = args[0]

    switch (args.length) {
      // 1 个参数
      case 1:
        if (isString(prop)) {
          return attrs[prop]
        } else {
          if (isObject(prop)) {
            Object.assign(attrs, prop)
          }
        }

        break
      // 2 个参数
      case 2:
        // 扩展 _attrs 的某个值
        if (isString(prop)) {
          attrs[args] = args[1]
        }

        break
      // 不传参数，返回整个 _attrs 属性
      default:
        return attrs
    }

    return this
  }

  off() {
    const { type, handler, capture } = this.attr()

    off(this.$el, type, handler, capture)
    this.attr({
      selector: '',
      type: '',
      handler: null,
      data: null,
      context: null,
      once: false,
      capture: false
    })

    return this
  }

  on(selector, type, handler, data, context, once = false, capture = false) {
    this.attr({
      selector,
      type,
      handler,
      data,
      context,
      once,
      capture
    })

    on(this.$el, selector, type, handler, data, this, once, capture)

    return this
  }

  once(selector, type, handler, data, context, capture = false) {
    this.attr({
      selector,
      type,
      handler,
      data,
      context,
      once: true,
      capture
    })

    once(this.$el, selector, type, handler, this, true, capture)

    return this
  }

  preventDefault(evt) {
    evt.preventDefault()

    return this
  }

  stopPropagation(evt) {
    evt.stopPropagation()

    return this
  }

  stopEvent(evt) {
    this.preventDefault(evt)
    this.stopPropagation(evt)

    return this
  }
}

export default Emitter

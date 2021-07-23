import closest from './closest'
import on from './on'
import once from './once'
import off from './off'
import stop from './stop'
import stopPropagation from './stopPropagation'
import preventDefault from './preventDefault'

class Delegate {
  constructor (el) {
    this._attrs = {
      type: '',
      selector: '',
      handler: null,
      useCapture: false,
      once: false
    }

    if (el.tagName && el.nodeType === 1) {
      this.$el = el
    } else {
      if (typeof el === 'string') {
        this.$el = document.querySelector(el)
      }
    }

    return this
  }

  attr () {
    const attrs = this._attrs
    const args = arguments
    const prop = args[0]

    switch (args.length){
      // 1 个参数
      case 1:
        const type = Object.prototype.toString.apply(prop).toLowerCase()

        switch (type) {
          // 参数是字符串，则返回 _attrs 中对应的属性值
          case '[object string]':
            return attrs[prop]
          // 参数是对象，则扩展 _attrs 属性的多个值
          case '[object object]':
            Object.assign(attrs, prop)
            break
        }

        break
      // 2 个参数
      case 2:
        // 扩展 _attrs 的某个值
        if(typeof prop === 'string') {
          attrs[args] = args[1]
        }

        break
      // 不传参数，返回整个 _attrs 属性
      default:
        return attrs
    }

    return this
  }

  destroy () {
    const attrs = this.attr()

    off(this.$el, attrs.type, attrs.handler, attrs.useCapture)

    return this
  }

  off (el, type, handler, useCapture) {
    off(el, type, handler, useCapture)
    return this
  }

  on (type, selector, handler, useCapture, once) {
    this.attr({
      type: type,
      selector: selector,
      handler: handler,
      useCapture: useCapture,
      once: once,
    })

    on(this.$el, type, selector, handler, useCapture, once, this)

    return this
  }

  once (type, selector, handler, useCapture) {
    this.attr({
      type: type,
      selector: selector,
      handler: handler,
      useCapture: useCapture,
      once: true
    })

    once(this.$el, type, selector, handler, useCapture, this)

    return this
  }

  preventDefault (evt) {
    preventDefault(evt)

    return this
  }

  stop (evt) {
    stop(evt)

    return this
  }

  stopPropagation (evt) {
    stopPropagation(evt)

    return this
  }
}

const delegate = (el) => {
  return new Delegate(el)
}

export default delegate

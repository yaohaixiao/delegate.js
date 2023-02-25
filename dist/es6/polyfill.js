import isFunction from './isFunction'
import hasOwn from './hasOwn'

/**
 * A polyfill for Object.assign()
 * ========================================================================
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#polyfill
 */
if (!isFunction(Object.assign)) {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target) {
      'use strict'
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object')
      }

      const to = Object(target)

      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]

        if (nextSource !== null && nextSource !== undefined) {
          for (let nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (hasOwn(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}

/**
 * @jest-environment jsdom
 */
import getCharCode from '../getCharCode'

describe('getCharCode() 方法', () => {
  Object.defineProperty(
    window.navigator,
    'userAgent',
    ((value) => ({
      get() {
        return value
      },

      set(v) {
        value = v
      }
    }))(window.navigator.userAgent)
  )

  // Set up our document body
  document.body.innerHTML =
    '<input id="input" name="input" type="text" class="input" />'

  let charCode = ''
  const $input = document.querySelector('input')
  const showEventLog = function (evt) {
    charCode = getCharCode(evt)
  }

  $input.addEventListener('keyup', showEventLog, false)

  describe('常用的公共按键：', () => {
    it('getCharCode() 方法获取字母 "a" 键返回：65', () => {
      let event = new KeyboardEvent('keyup', { keyCode: 65 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(65)

      event = new KeyboardEvent('keyup', { charCode: 97 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(97)
    })

    it('getCharCode() 方法获取数字键 "0" 键返回：96', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 96 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(96)
    })

    it('getCharCode() 方法获取功能键 "F1" 键返回：112', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 112 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(112)
    })

    it('getCharCode() 方法获取功能键 "Esc" 键返回：27', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 27 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(27)
    })

    it('getCharCode() 方法获取功能键 "BackSpace" 键返回：8', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 8 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(8)
    })

    it('getCharCode() 方法获取功能键 "Enter" 键返回：13', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 13 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(13)
    })
  })

  describe('Apple 设备 Safari 中特殊按键：', () => {
    const safari =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'

    navigator.userAgent = safari

    it('getCharCode() 方法获取字母 "up" 键返回：38', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 63232 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(38)
    })

    it('getCharCode() 方法获取字母 "down" 键返回：40', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 63233 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(40)
    })

    it('getCharCode() 方法获取字母 "left" 键返回：37', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 63234 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(37)
    })

    it('getCharCode() 方法获取字母 "right" 键返回：39', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 63235 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(39)
    })

    it('getCharCode() 方法获取字母 "page up" 键返回：33', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 63276 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(33)
    })

    it('getCharCode() 方法获取字母 "page down" 键返回：34', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 63277 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(34)
    })

    it('getCharCode() 方法获取字母 "shift tab" 键返回：9', () => {
      const event = new KeyboardEvent('keyup', { keyCode: 25 })

      $input.dispatchEvent(event)

      expect(charCode).toEqual(9)
    })
  })
})

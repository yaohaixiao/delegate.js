/**
 * @jest-environment jsdom
 */
import getScroll from 'esm/getScroll'
describe('getScroll() 方法', () => {
  Object.defineProperty(
    document,
    'documentElement',
    ((value) => ({
      get() {
        return value
      },

      set(v) {
        value = v
      }
    }))(document.documentElement)
  )

  const documentElement = document.documentElement

  describe('通过 document.body 获取：', () => {
    it('document.body.scrollTop !== 0 || document.body.scrollLeft !== 0', () => {
      let scrollXY = []

      document.documentElement = null

      document.body.scrollTop = 0
      document.body.scrollLeft = 10
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(0)
      expect(scrollXY[1]).toEqual(10)

      document.body.scrollTop = 10
      document.body.scrollLeft = 0
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(10)
      expect(scrollXY[1]).toEqual(0)

      document.body.scrollTop = 10
      document.body.scrollLeft = 10
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(10)
      expect(scrollXY[1]).toEqual(10)
    })

    it('document.body.scrollTop === 0 && document.body.scrollLeft === 0', () => {
      let scrollXY = []

      document.documentElement = null

      document.body.scrollTop = 0
      document.body.scrollLeft = 0
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(0)
      expect(scrollXY[1]).toEqual(0)
    })
  })

  describe('通过 document.documentElement 获取：', () => {
    it('document.documentElement.scrollTop !== 0 || document.documentElement.scrollLeft !== 0', () => {
      let scrollXY = []

      document.documentElement = documentElement

      document.documentElement.scrollTop = 0
      document.documentElement.scrollLeft = 10
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(0)
      expect(scrollXY[1]).toEqual(10)

      document.documentElement.scrollTop = 10
      document.documentElement.scrollLeft = 0
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(10)
      expect(scrollXY[1]).toEqual(0)

      document.documentElement.scrollTop = 10
      document.documentElement.scrollLeft = 10
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(10)
      expect(scrollXY[1]).toEqual(10)
    })

    it('document.documentElement.scrollTop === 0 && document.documentElement.scrollLeft === 0', () => {
      let scrollXY = []

      document.documentElement = documentElement

      document.documentElement.scrollTop = 0
      document.documentElement.scrollLeft = 0
      scrollXY = getScroll()

      expect(scrollXY[0]).toEqual(0)
      expect(scrollXY[1]).toEqual(0)
    })
  })
})

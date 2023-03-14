/**
 * @jest-environment jsdom
 */
import isAppleSafari from 'esm/isAppleSafari'

describe('isAppleSafari() 方法', () => {
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

  const ie11 =
    'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
  const edge =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.69'
  const chrome =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
  const firefox =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0'
  const opera =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 OPR/96.0.0.0'
  const safari =
    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'
  const appleSafari =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15'

  it(`探测 usageAgent='${ie11}'，则 isAppleSafari() 返回：false`, () => {
    navigator.userAgent = ie11
    expect(isAppleSafari()).toBe(false)
  })

  it(`探测 usageAgent='${edge}'，则 isAppleSafari() 返回：false`, () => {
    navigator.userAgent = edge
    expect(isAppleSafari()).toBe(false)
  })

  it(`探测 usageAgent='${chrome}'，则 isAppleSafari() 返回：false`, () => {
    navigator.userAgent = chrome
    expect(isAppleSafari()).toBe(false)
  })

  it(`探测 usageAgent='${firefox}'，则 isAppleSafari() 返回：false`, () => {
    navigator.userAgent = firefox
    expect(isAppleSafari()).toBe(false)
  })

  it(`探测 usageAgent='${opera}'，则 isAppleSafari() 返回：false`, () => {
    navigator.userAgent = opera
    expect(isAppleSafari()).toBe(false)
  })

  it(`探测 usageAgent='${safari}'，则 isAppleSafari() 返回：false`, () => {
    navigator.userAgent = safari
    expect(isAppleSafari()).toBe(false)
  })

  it(`探测 usageAgent='${appleSafari}'，则 isAppleSafari() 返回：true`, () => {
    navigator.userAgent = appleSafari
    expect(isAppleSafari()).toBe(true)
  })
})

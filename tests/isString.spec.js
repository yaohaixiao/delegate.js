import isString from '../utils/isString'

describe('isString() 方法', () => {
  it("isString('ok'), 返回：true", () => {
    expect(isString('ok')).toBe(true)
  })

  it("isString(''), 返回：true", () => {
    expect(isString('')).toBe(true)
  })

  it('isString(String(1)), 返回：true', () => {
    expect(isString(String(1))).toBe(true)
  })

  it('isString(String), 返回：false', () => {
    expect(isString(String)).toBe(false)
  })

  it('isString([]), 返回：false', () => {
    expect(isString([])).toBe(false)
  })

  it('isString(null), 返回：false', () => {
    expect(isString(null)).toBe(false)
  })

  it('isString({}), 返回：false', () => {
    expect(isString({})).toBe(false)
  })

  it('isString(1), 返回：false', () => {
    expect(isString(1)).toBe(false)
  })

  it('isString(()=>{}), 返回：false', () => {
    expect(isString(() => {})).toBe(false)
  })
})
